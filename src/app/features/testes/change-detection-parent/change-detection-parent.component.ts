import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OnPushComponent } from './on-push/on-push.component';
import { DefaultComponent } from './default/default.component';
import { Toast } from "primeng/toast";

@Component({
  selector: 'app-change-detection-parent',
  templateUrl: './change-detection-parent.component.html',
  styleUrl: './change-detection-parent.component.scss',
  standalone: true,
  imports: [OnPushComponent, DefaultComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParentComponent {
  count = 0;

  update() {
    this.count++;
  }
}

