import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Injector,
  OnInit,
  signal,
} from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-effects-example-second',
  imports: [MatButton],
  template: `
    <div>
      <h1>Effects Basic Example (Second)</h1>
      <div class="flex-row gap-4">
        <button mat-stroked-button (click)="updateCount()">Add to Count</button>
      </div>
      <div class="p-4">Count: {{ count() }}</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EffectBasicExampleSecondComponent implements OnInit {
  count = signal<number>(0);
  private readonly injector = inject(Injector);

  ngOnInit() {
    effect(
      () => {
        console.log('[Type 3] Effect Triggered in ngOnInit', this.count());
      },
      // We need the injector reference if declared outside
      { injector: this.injector }
    );
  }

  protected updateCount() {
    this.count.update((x) => x + 1);
  }
}
