import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-menu',
  imports: [MenuModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
  public readonly menu = input.required<MenuItem[]>();
  public readonly onItemClick = output<void>();

  public fecharDrawer(): void {
    console.log('fechar drawer');

    this.onItemClick.emit();
  }
}
