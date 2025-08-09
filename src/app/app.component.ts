import { Component, signal } from '@angular/core';
import { ParentComponent } from "./features/testes/change-detection-parent/change-detection-parent.component";
import { QuandroKanbanComponent } from "./features/testes/quandro-kanban/quandro-kanban.component";
import { CadastroDespesaComponent } from "./features/despesas/cadastro-despesa/cadastro-despesa.component";
import { ToastModule } from 'primeng/toast';
import { DrawerModule } from 'primeng/drawer';
import { ToolbarModule } from 'primeng/toolbar';
import { Button } from "primeng/button";
import { Router, RouterModule } from '@angular/router';



@Component({
  selector: 'app-root',
  imports: [CadastroDespesaComponent, ToastModule, DrawerModule, ToolbarModule, Button, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FinancaPessoal';

  public readonly drawerAberto = signal(false);
}
