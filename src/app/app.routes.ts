import { Routes } from '@angular/router';
import { CadastroDespesaComponent } from './features/despesas/cadastro-despesa/cadastro-despesa.component';
import { KanbanComponent } from './shared/components/kanban/kanban.component';
import { QuandroKanbanComponent } from './features/testes/quandro-kanban/quandro-kanban.component';

export const routes: Routes = [
    {
        path: '', component: CadastroDespesaComponent
    },
    {
        path: 'despesas', component: CadastroDespesaComponent
    },
    {
        path: 'receitas', component: CadastroDespesaComponent
    },
    {
        path: 'kanban', component: QuandroKanbanComponent
    },
    {
        path: '**', redirectTo: ''
    }
];
