import { Component, Input, Output, EventEmitter, signal, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { DragDropModule } from 'primeng/dragdrop';
import { ColunaKanban } from '../../models/coluna-kanban.model';
import { ItemKanban } from '../../models/coluna-item.model';
import { ColunaTransicao } from '../../models/coluna-transicao.model';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CommonModule, CardModule, DragDropModule],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss'
})
export class KanbanComponent {
  colunas = input.required<ColunaKanban[]>();
  desabilitado = input(false);
  movido = output<ColunaTransicao>();

  draggedItem: ItemKanban | undefined | null;

  private fromColumnId: string | undefined | null;

  dragStart(item: ItemKanban, fromColumnId: string) {
    this.draggedItem = item;
    this.fromColumnId = fromColumnId;
  }

  dragEnd() {
    this.draggedItem = undefined;
    this.fromColumnId = undefined;
  }

  onDrop(targetColumn: ColunaKanban) {
    if (!this.draggedItem || !this.fromColumnId || this.fromColumnId === targetColumn.id) return;

    const fromColumn = this.colunas().find(col => col.id === this.fromColumnId);
    const toColumn = targetColumn;

    if (fromColumn && toColumn) {
      toColumn.itens.unshift(this.draggedItem!);
      fromColumn.itens = fromColumn.itens.filter(i => i.id !== this.draggedItem!.id);
      this.movido.emit({ item: this.draggedItem!, de: this.fromColumnId, para: targetColumn.id });
    }

    this.dragEnd();
  }

}
