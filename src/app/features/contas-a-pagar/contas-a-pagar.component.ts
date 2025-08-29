import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject, OnInit, signal } from '@angular/core';
import { KanbanComponent } from "../../shared/components/kanban/kanban.component";
import { ColunaKanban } from '../../shared/models/coluna-kanban.model';
import { Button } from "primeng/button";
import { Dialog } from "primeng/dialog";
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumber } from 'primeng/inputnumber';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContasAPagarService } from '../../core/services/contas-a-pagar.service';
import { ContaAPagar } from '../../shared/models/conta-a-pagar.model';
import { InputText } from 'primeng/inputtext';
import { ItemKanban } from '../../shared/models/coluna-item.model';
import { ColunaTransicao } from '../../shared/models/coluna-transicao.model';

const PENDENTE = 'pendente';
const ATRASADO = 'atrasado';
const PAGO = 'pago';

@Component({
  selector: 'app-contas-a-pagar',
  imports: [FormsModule, ReactiveFormsModule, KanbanComponent, Button, Dialog, DatePickerModule, InputNumber, InputText],
  templateUrl: './contas-a-pagar.component.html',
  styleUrl: './contas-a-pagar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContasAPagarComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly contasAPagarService = inject(ContasAPagarService);
  private readonly cdr = inject(ChangeDetectorRef);

  public readonly addContaAPagar = signal(false);

  public readonly contasAPagar = signal<ContaAPagar[]>([]);

  public readonly colunasContasAPagar: ColunaKanban[] = [
    { id: PENDENTE, titulo: 'Pendente', itens: [], onExcluirItem: (item) => this.excluirItem(item) },
    { id: ATRASADO, titulo: 'Atrasado', itens: [] },
    { id: PAGO, titulo: 'Pago', itens: [] },
  ]

  public constructor() {
    effect(() => {
      this.colunasContasAPagar.find(col => col.id === PENDENTE)!.itens = this.contasAPagar().filter(conta => conta.status === PENDENTE || !conta.status).map(conta => ({ id: conta.id, titulo: conta.descricao }));
      this.colunasContasAPagar.find(col => col.id === ATRASADO)!.itens = this.contasAPagar().filter(conta => conta.status === ATRASADO).map(conta => ({ id: conta.id, titulo: conta.descricao }));
      this.colunasContasAPagar.find(col => col.id === PAGO)!.itens = this.contasAPagar().filter(conta => conta.status === PAGO).map(conta => ({ id: conta.id, titulo: conta.descricao }));
      this.cdr.markForCheck();
    })
  }

  public ngOnInit(): void {
    this.contasAPagarService.listar().subscribe((contas) => {
      this.contasAPagar.set(contas);
      console.log('map', this.contasAPagar().map(conta => ({ id: conta.id, titulo: conta.descricao })));

    });

  }

  public form = this.fb.group({
    descricao: ['', Validators.required],
    valor: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    dataVencimento: ['', Validators.required]
  });

  public inserirContaAPagar(): void {
    this.contasAPagarService.inserir(this.form.value as unknown as ContaAPagar).subscribe(
      (conta) => {
        this.addContaAPagar.set(false);
        this.contasAPagar.update(contas => [...contas, conta]);
      }
    );
  }

  public onTrocaDeStatus(item: ColunaTransicao): void {
    const conta = this.contasAPagar().find(conta => conta.id === item.item.id)!;
    this.contasAPagarService.atualizar({ ...conta, status: item.para }).subscribe(() => { });
  }

  private excluirItem(item: ItemKanban): void {
    this.contasAPagarService.excluir(item.id).subscribe(() => {
      this.contasAPagar.update(contas => contas.filter(conta => conta.id !== item.id));
    })
  }
}
