import {
  ChangeDetectionStrategy,
  Component,
  effect,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-effects-example-first',
  imports: [],
  template: `
    <div>
      <h1>Effects Basic Example (First)</h1>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EffectBasicExampleFirstComponent {
  widget = signal<{ id: string; name: string } | null>({
    id: '1',
    name: 'The Widget',
  });

  constructor() {
    effect(() => {
      // Needs to be declared in the constructor
      console.log('[Type 1] Effect Triggered', this.widget());
    });

    // they run at least once
    effect(() => {
      console.log('[Type 2] Effect Triggered with no signal dependency');
    });
  }
}
