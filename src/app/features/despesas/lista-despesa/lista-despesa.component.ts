import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Despesa } from '../../../shared/models/despesa.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { DespesasService } from '../../../core/services/despesas.service';
import { finalize } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-despesa',
  imports: [
    CommonModule,
    ProgressSpinnerModule
  ],
  templateUrl: './lista-despesa.component.html',
  styleUrl: './lista-despesa.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListaDespesaComponent implements OnInit {
  private readonly desepsasService = inject(DespesasService);

  public readonly loading = signal(true);
  public readonly despesas = signal<Despesa[]>([]);

  ngOnInit(): void {
    this.desepsasService.buscarTodos().pipe(finalize(() => this.loading.set(false)))
      .subscribe(despesas => this.despesas.set(despesas));
  }
}
