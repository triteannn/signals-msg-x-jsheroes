import {
  ChangeDetectionStrategy,
  Component,
  effect,
  signal,
  untracked,
} from '@angular/core';

@Component({
  selector: 'app-effect-bad-example',
  template: `
    <div>
      <h1>Effect Bad Example</h1>
      <div>
        Count: {{ count() }} <br />
        Double Count: {{ doubleCount() }}
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EffectBadExampleComponent {
  count = signal(1);
  doubleCount = signal(0); // just use a computed signal

  constructor() {
    effect(() => {
      console.log('Effect Triggered Bad Example');
      const value = this.count();
      // Execute an arbitrary function in a non-reactive (non-tracking) context
      // TLDR: when you don't want a dependency to be created
      untracked(() => {
        this.doubleCount.set(value * 2);
      });
    });
  }
}
