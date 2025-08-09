import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-dominio',
  imports: [FormsModule, ReactiveFormsModule, Select, InputTextModule, Button,],
  templateUrl: './dominio.component.html',
  styleUrl: './dominio.component.scss'
})
export class DominioComponent {
  private readonly fb = inject(FormBuilder);

  public readonly form = this.fb.nonNullable.group({
    descricao: ['', Validators.required],
    tipo: new FormControl<number | undefined>(undefined, [Validators.required]),
  });

  public readonly tipos = signal([
    {
      id: 1,
      nome: 'Tipo de despesa'
    }, {
      id: 2,
      nome: 'Tipo de receita'
    }
  ]);

  public readonly loading = signal(true);

  public inserir(): void {

  }

}
