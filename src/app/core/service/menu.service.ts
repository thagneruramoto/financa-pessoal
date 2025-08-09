import { Injectable, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private readonly menus = signal<MenuItem[]>([
    {
      label: 'Dominios',
      items: [
        {
          label: 'Cadastrar',
          routerLink: ['/dominios']
        }
      ]
    },
    {
      label: 'Despesas', items: [
        {
          label: 'Cadastrar',
          routerLink: ['/cadastro-despesa']
        },
        {
          label: 'Listar',
          routerLink: ['/despesas']
        },
      ]
    },
    {
      label: 'Receitas', items: [
        {
          label: 'Cadastrar',
          routerLink: ['/cadastro-receita']
        }
      ]
    },
  ]);

  public readonly menu = this.menus.asReadonly();
}
