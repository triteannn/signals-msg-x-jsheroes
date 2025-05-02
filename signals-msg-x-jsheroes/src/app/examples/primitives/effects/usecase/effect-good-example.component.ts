import {
  ChangeDetectionStrategy,
  Component,
  effect,
  signal,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-effect-good-example',
  template: `
    <div>
      <h1>Effect Good Example</h1>
      <button mat-stroked-button (click)="onUpdateInput()">Update Input</button>
      <div class="p-4">
        <div>ID: {{ myFormGroup.value.id }}</div>
        <div>Name: {{ myFormGroup.value.name }}</div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButton],
})
export class EffectGoodExampleComponent {
  someInput = signal<{ id: string; name: string } | null>(null);
  myFormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
  });

  constructor() {
    // Synchronization from Reactive Context to Non-Reactive Context
    // TLDR: use case as a bridge
    effect(() => {
      const value = this.someInput();
      // or fetch some data from the backend and then update
      this.updateForm(value);
    });

    // what about toObservable? Under the hood, this is still an effect
    toObservable(this.someInput).subscribe((value) => {
      this.updateForm(value);
    });
  }

  protected onUpdateInput() {
    this.someInput.set({
      id: '1',
      name: 'The Widget',
    });
  }

  private updateForm(payload: { id: string; name: string } | null): void {
    if (payload) {
      this.myFormGroup.patchValue({ ...payload });
    }
  }
}
