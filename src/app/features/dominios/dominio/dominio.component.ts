import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { DominioService } from '../../../core/service/dominio.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { TipoDespesa } from '../../../shared/models/tipo-despesa.model';
import { TipoReceita } from '../../../shared/models/tipo-receita.model';

@Component({
  selector: 'app-dominio',
  imports: [FormsModule, ReactiveFormsModule, Select, InputTextModule, Button,],
  templateUrl: './dominio.component.html',
  styleUrl: './dominio.component.scss'
})
export class DominioComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dominioService = inject(DominioService);

  public readonly form = this.fb.nonNullable.group({
    descricao: ['', Validators.required],
    tipo: new FormControl<number | undefined>(undefined, [Validators.required]),
  });

  public readonly tipos = toSignal(this.dominioService.getDominios().pipe(finalize(() => this.loading.set(false))));
  public readonly loading = signal(true);

  public inserir(): void {
    const tipo = this.form.value.tipo;
    if (tipo === 1) {
      this.inserirTipoDespesa();
    }
    if (tipo === 2) {
      this.inserirTipoReceita();
    }
  }

  private inserirTipoDespesa(): void {
    const despesa: TipoDespesa = {
      id: 0,
      nome: this.form.value.descricao!
    }
    this.dominioService.inserirTipoDespesa(despesa).subscribe({
      next: () => {
        this.resetForm();
      }
    });
  }

  private inserirTipoReceita(): void {
    const receita: TipoReceita = {
      id: 0,
      nome: this.form.value.descricao!
    }
    this.dominioService.inserirTipoReceita(receita).subscribe({
      next: () => {
        this.resetForm();
      }
    });
  }

  private resetForm(): void {
    this.form.reset();
  }
}