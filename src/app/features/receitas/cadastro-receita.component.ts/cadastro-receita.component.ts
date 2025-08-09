import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ReceitaService } from '../../../core/services/receita.service';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { toSignal } from '@angular/core/rxjs-interop';
import { Despesa } from '../../../shared/models/despesa.model';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { DominioService } from '../../../core/service/dominio.service';
import { TipoReceita } from '../../../shared/models/tipo-receita.model';

@Component({
  selector: 'app-receitas',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, InputTextModule, SelectModule, MessageModule, ButtonModule, InputNumberModule, DialogModule],
  templateUrl: './cadastro-receita.component.html',
  styleUrl: './cadastro-receita.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CadastroReceitaComponent implements OnInit {

  private readonly receitaService = inject(ReceitaService);
  private readonly messagesService = inject(MessageService);
  private readonly dominioService = inject(DominioService)

  public readonly form = inject(FormBuilder).group({
    descricao: ['', Validators.required],
    valor: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    tipo: ['', Validators.required]
  });

  public readonly loading = signal(true);
  public readonly tipos = signal<TipoReceita[]>([]);
  public readonly visibleDialog = signal(false);

  public ngOnInit(): void {
    this.receitaService.getTipoDespesa().pipe(finalize(() => this.loading.set(false))).subscribe(tipos => this.tipos.set(tipos));
  }

  public salvarNewTipo(receita: string): void {
    this.dominioService.inserirTipoReceita({ nome: receita }).subscribe((tipoReceita) => {
      this.visibleDialog.set(false);
      this.tipos.update(current => [...current, tipoReceita]);
    })
  }

  public inserir() {

    const despesa = this.form.value as unknown as Despesa;
    this.receitaService.inserir(despesa).subscribe(
      () => {

        this.form.reset();
        this.form.markAsPristine();
        this.form.markAsUntouched();

        this.messagesService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Receita inserida com sucesso'
        });
      }
    );

  }

  showDialog() {
    this.visibleDialog.set(true);
  }
}
