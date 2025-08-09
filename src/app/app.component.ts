import { Component, inject, signal } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { DrawerModule } from 'primeng/drawer';
import { ToolbarModule } from 'primeng/toolbar';
import { Button } from "primeng/button";
import { RouterModule } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { MenuService } from './core/service/menu.service';

@Component({
  selector: 'app-root',
  imports: [ToastModule, DrawerModule, ToolbarModule, Button, RouterModule, MenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FinancaPessoal';

  public readonly drawerAberto = signal(false);
  public readonly menu = inject(MenuService).menu();
}
