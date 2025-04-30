import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-doanddonts-signals-conditional-issue',
  imports: [],
  template: `
    <div>
      <h1>Signals Conditional Issue</h1>
      <button (click)="toggleCount()">Toggle Show Count</button>
      <button (click)="updateCount()">Add to Count</button>
      <div>
        Show Count: {{ showCount() }} <br />
        Count: {{ count() }} <br />
        Double Count: {{ doubleCount() }} <br />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalsConditionalIssueComponent {
  showCount = signal<boolean>(false);
  count = signal<number>(2);
  doubleCount = computed(() => {
    if (this.showCount()) {
      console.log('Double Count Computed');
      return this.count() * 2;
    } else {
      return 0;
    }
  });

  constructor() {
    effect(() => {
      if (this.showCount()) {
        console.log('Showing count:', this.count());
      } else {
        console.log('Not showing count');
      }
    });
  }

  protected toggleCount() {
    this.showCount.update((x) => !x);
  }

  protected updateCount() {
    this.count.update((x) => x + 1);
  }
}
