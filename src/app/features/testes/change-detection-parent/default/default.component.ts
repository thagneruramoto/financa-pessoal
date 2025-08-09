import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DefaultComponent {
  @Input() count: number = 0;
  countInterno = 0;
  ngOnChanges() {
    console.log('DEFAULT: ngOnChanges - value =', this.count);
  }

  incrementar() {
    this.countInterno++;

    setTimeout(() => {
      this.countInterno++;
    }, 1000);
  }
} 
