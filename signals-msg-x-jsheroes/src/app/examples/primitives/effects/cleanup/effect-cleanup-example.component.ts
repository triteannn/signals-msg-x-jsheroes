import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EffectRef,
  signal,
} from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-effects-example-cleanup',
  imports: [MatButton],
  template: `
    <div>
      <h1>Effects Basic Example (Second)</h1>
      <button mat-stroked-button (click)="updateCount()">Add to Count</button>
      <button mat-stroked-button (click)="onManualDestroy()">
        Manual Destroy
      </button>
      <div>{{ count() }}</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EffectCleanupExampleComponent {
  count = signal<number>(0);
  protected effectRef1!: EffectRef;
  protected effectRef2!: EffectRef;

  constructor() {
    this.effectRef1 = effect(() => {
      // this effect will clean up when the component gets destroyed
      console.log('[Type 1] Effect Triggered', this.count());
    });

    this.effectRef2 = effect(
      (onCleanup) => {
        // this effect will be destroyed manually
        console.log('[Type 2] Effect Triggered', this.count());

        //  This onCleanup function lets you register a callback that is invoked before the next run of the effect begins, or when the effect is destroyed
        onCleanup(() => {
          console.log('[Type 2] Effect Destroyed', this.count());
        });
      },
      {
        manualCleanup: true, // disable the default cleanup behavior
      }
    );
  }

  protected updateCount() {
    this.count.update((x) => x + 1);
  }

  protected onManualDestroy() {
    this.effectRef2.destroy();
  }
}
