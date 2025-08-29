import { Routes } from '@angular/router';
import { CadastroDespesaComponent } from './features/despesas/cadastro-despesa/cadastro-despesa.component';
import { KanbanComponent } from './shared/components/kanban/kanban.component';
import { QuandroKanbanComponent } from './features/testes/quandro-kanban/quandro-kanban.component';
import { ListaDespesaComponent } from './features/despesas/lista-despesa/lista-despesa.component';
import { CadastroReceitaComponent } from './features/receitas/cadastro-receita.component.ts/cadastro-receita.component';
import { DominioComponent } from './features/dominios/dominio/dominio.component';
import { ContasAPagarComponent } from './features/contas-a-pagar/contas-a-pagar.component';

export const routes: Routes = [
    {
        path: '', component: CadastroDespesaComponent
    },
    {
        path: 'cadastro-despesa', component: CadastroDespesaComponent
    },
    {
        path: 'despesas', component: ListaDespesaComponent
    },
    {
        path: 'cadastro-receita', component: CadastroReceitaComponent
    },
    {
        path: 'contas-a-pagar', component: ContasAPagarComponent
    },
    {
        path: 'dominios', component: DominioComponent
    },
    {
        path: 'kanban', component: QuandroKanbanComponent
    },
    {
        path: '**', redirectTo: ''
    }
];
