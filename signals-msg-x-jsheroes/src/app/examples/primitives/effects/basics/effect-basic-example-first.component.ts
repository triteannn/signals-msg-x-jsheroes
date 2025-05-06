import {
  ChangeDetectionStrategy,
  Component,
  effect,
  signal,
} from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-effects-example-first',
  imports: [MatButton],
  template: `
    <div>
      <h1>Effects Basic Example (First)</h1>
      <div class="flex-row gap-4">
        <button mat-stroked-button (click)="updateCount()">Add to Count</button>
      </div>
      <div class="p-4">Count: {{ count() }}</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EffectBasicExampleFirstComponent {
  count = signal<number>(0);

  constructor() {
    effect(() => {
      // Needs to be declared in the constructor
      console.log('[Type 1] Effect Triggered', this.count());
    });

    // they run at least once
    effect(() => {
      console.log('[Type 2] Effect Triggered with no signal dependency');
    });
  }

  protected updateCount() {
    this.count.update((x) => x + 1);
  }
}
