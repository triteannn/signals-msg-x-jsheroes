import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-effects-example-third',
  imports: [],
  template: `
    <div>
      <h1>Effects Basic Example (Third)</h1>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EffectBasicExampleThirdComponent {
  constructor() {
    const count = signal<number>(2); // first is 2
    const doubleCount = computed(() => count() * 2);
    effect(() => {
      console.log('[Type 4] Effect Triggered', doubleCount());
    });
    // count.set(4); // second is 4
    // Expect to see on the computed value 4 then 8, but effect are asynchronously => just 8
    setTimeout(() => {
      count.set(4);
    });
  }
}
