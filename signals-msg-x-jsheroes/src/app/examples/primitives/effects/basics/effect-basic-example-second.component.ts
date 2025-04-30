import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Injector,
  OnInit,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-effects-example-second',
  imports: [],
  template: `
    <div>
      <h1>Effects Basic Example (Second)</h1>
      <button (click)="updateCount()">Add to Count</button>
      <div>{{ count() }}</div>
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
