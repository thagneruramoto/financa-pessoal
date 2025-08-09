import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DespesasService } from '../../../core/services/despesas.service';
import { TipoDespesa } from '../../../shared/models/tipo-despesa.model';
import { ButtonModule } from 'primeng/button';
import { toSignal } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { InputNumberModule } from 'primeng/inputnumber';
import { Message, MessageModule } from 'primeng/message';
import { Despesa } from '../../../shared/models/despesa.model';
import { MessageService } from 'primeng/api';
import { ParentComponent } from "../../testes/change-detection-parent/change-detection-parent.component";
import { ListaDespesaComponent } from "../lista-despesa/lista-despesa.component";




@Component({
  selector: 'app-cadastro-despesa',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, InputTextModule, SelectModule, MessageModule, ButtonModule, InputNumberModule, ParentComponent, ListaDespesaComponent],
  templateUrl: './cadastro-despesa.component.html',
  styleUrl: './cadastro-despesa.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CadastroDespesaComponent {
  private readonly desepsasService = inject(DespesasService);
  private readonly messagesService = inject(MessageService);

  public readonly form = inject(FormBuilder).group({
    descricao: ['', Validators.required],
    valor: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    tipo: ['', Validators.required]
  });

  public readonly loading = signal(true);
  public readonly tipos = toSignal(this.desepsasService.getTipoDespesa().pipe(finalize(() => this.loading.set(false))));

  public inserir() {

    const despesa = this.form.value as unknown as Despesa;
    this.desepsasService.inserir(despesa).subscribe(
      () => {

        this.form.reset();
        this.form.markAsPristine();
        this.form.markAsUntouched();

        this.messagesService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Despesa inserida com sucesso'
        });
      }
    );

  }
}
