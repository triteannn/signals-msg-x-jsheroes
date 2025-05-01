import {
  ChangeDetectionStrategy,
  Component,
  effect,
  signal,
  untracked,
} from '@angular/core';

@Component({
  selector: 'app-doanddonts-effect-loop-issue',
  imports: [],
  template: `
    <div>
      <h1>Effect Loop Issue</h1>
      <button (click)="updateCount()">Add to Count</button>
      <div>{{ count() }}</div>
      <div>Double: {{ double() }}</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EffectLoopComponent {
  count = signal<number>(0);
  double = signal<number>(0);

  constructor() {
    effect(() => {
      // const newDouble = this.count() * 2 + this.double();
      const newDouble = this.count() * 2;
      untracked(() => {
        console.log(
          '[Type Okay] Effect Triggered',
          this.count(),
          this.double()
        );
      });
      this.double.set(newDouble);
    });

    // effect(() => {
    //   const newDouble = this.count() * 2;
    //   console.log(
    //     '[Type Problem] Effect Triggered',
    //     this.count(),
    //     this.double(), // read still happens
    //     newDouble
    //   );
    //   this.double.set(newDouble);
    // });

    // effect(() => {
    //   const newDouble = this.count() * 2 + this.double();
    //   untracked(() => {
    //     // untracked is for reads
    //     console.log(
    //       '[Type Infinite] Effect Triggered',
    //       this.count(),
    //       this.double()
    //     );
    //     this.double.set(newDouble);
    //   });
    // });
  }

  protected updateCount() {
    this.count.update((x) => x + 1);
  }
}
