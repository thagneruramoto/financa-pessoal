import { Component } from '@angular/core';
import { KanbanComponent } from "../../../shared/components/kanban/kanban.component";
import { ColunaKanban } from '../../../shared/models/coluna-kanban.model';

@Component({
  selector: 'app-quandro-kanban',
  imports: [KanbanComponent],
  templateUrl: './quandro-kanban.component.html',
  styleUrl: './quandro-kanban.component.scss'
})
export class QuandroKanbanComponent {
  colunasKanban: ColunaKanban[] = [
    { id: 'todo', titulo: 'To Do', itens: [{ id: '1', titulo: 'Item 1' }, { id: '2', titulo: 'Item 2' }] },
    { id: 'doing', titulo: 'Doing', itens: [{ id: '3', titulo: 'Item 3' }, { id: '4', titulo: 'Item 4' }] },
    { id: 'done', titulo: 'Done', itens: [] },
  ];
}
