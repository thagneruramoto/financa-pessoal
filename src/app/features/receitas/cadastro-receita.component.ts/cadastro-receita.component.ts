import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
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

@Component({
  selector: 'app-receitas',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, InputTextModule, SelectModule, MessageModule, ButtonModule, InputNumberModule],
  templateUrl: './cadastro-receita.component.html',
  styleUrl: './cadastro-receita.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CadastroReceitaComponent {
  private readonly receitaService = inject(ReceitaService);
  private readonly messagesService = inject(MessageService);

  public readonly form = inject(FormBuilder).group({
    descricao: ['', Validators.required],
    valor: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    tipo: ['', Validators.required]
  });

  public readonly loading = signal(true);
  public readonly tipos = toSignal(this.receitaService.getTipoDespesa().pipe(finalize(() => this.loading.set(false))));

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
}
