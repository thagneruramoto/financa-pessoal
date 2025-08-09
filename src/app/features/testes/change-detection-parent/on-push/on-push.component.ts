import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-on-push',
  imports: [],
  templateUrl: './on-push.component.html',
  styleUrl: './on-push.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnPushComponent {
  @Input() count: number = 0;
  countInterno = signal(0);
  ngOnChanges() {
    console.log('ONPUSH ngOnChanges - value =', this.count);
    this.count++;
  }

  incrementar() {
    this.countInterno.set(this.countInterno() + 1);

    setTimeout(() => {
      this.countInterno.set(this.countInterno() + 1);
    }, 1000);
  }
}
