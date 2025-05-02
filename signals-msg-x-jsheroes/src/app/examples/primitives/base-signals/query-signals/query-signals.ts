import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  ElementRef,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';

@Component({
  selector: 'app-query-signals',
  imports: [MatButton, MatInput, MatFormField, MatLabel, MatIcon],
  template: `
    <h2>Query Signals Demo</h2>

    <section>
      <mat-form-field subscriptSizing="dynamic">
        <mat-label>Name</mat-label>
        <input matInput #nameInput />
      </mat-form-field>

      <button mat-stroked-button (click)="focusOnInput()">Focus Input</button>
    </section>

    <section>
      <ng-content></ng-content>
    </section>

    <section>
      @for (item of items(); track $index) {
        <div class="stat">
          <mat-icon>data_object</mat-icon>
          <p #itemElement>Item: {{ item }}</p>
        </div>
      }
      <div class="stat">
        <mat-icon>list</mat-icon>
        <p>
          Paragraph count (viewChildren):
          {{ paragraphCount() }}
        </p>
      </div>

      @if (hasProjectedButton()) {
        <div class="stat">
          <mat-icon>check</mat-icon>
          <p>
            Projected button found with label: "{{ projectedButtonText() }}"
          </p>
        </div>
      } @else {
        <div class="stat">
          <mat-icon>close</mat-icon>
          <p>No projected button found.</p>
        </div>
      }
    </section>

    <button mat-stroked-button (click)="addItem()">Add Item</button>
  `,
  styles: [
    `
      section {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        padding: 1rem;

        &:first-of-type {
          align-items: center;
        }

        &:last-of-type {
          flex-direction: column;
          justify-content: center;
          gap: 0;
        }
      }
      div.stat {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuerySignalsComponent {
  protected readonly items = signal<string[]>([]);

  // This token we know exists, so we can go ahead and tell it it's required to skip optional chaining
  protected readonly nameInputRef =
    viewChild.required<ElementRef<HTMLInputElement>>('nameInput');

  // viewChildren will give us an empty array if the token isn't found, so the return type is always truthy
  protected readonly paragraphRefs =
    viewChildren<ElementRef<HTMLParagraphElement>>('itemElement');
  protected readonly paragraphCount = computed(
    () => this.paragraphRefs().length
  );

  // Projected content inside ng-content. We won't mark it as required, due to its "external" nature.
  // This is a Material button, so the query will end up in giving us a MatButton instance instead of an ElementRef.
  // The MatButton ref has access to the elementRef anyways.
  protected readonly projectedButtonRef =
    contentChild<MatButton>('projectedButton');
  protected readonly hasProjectedButton = computed(
    () => !!this.projectedButtonRef()
  );
  protected readonly projectedButtonText = computed(
    () =>
      this.projectedButtonRef()?._elementRef.nativeElement?.innerText ||
      '(empty)'
  );

  addItem(): void {
    this.items.update((items) => [
      ...items,
      `New item no. ${items.length + 1}`,
    ]);
  }

  focusOnInput(): void {
    const input = this.nameInputRef();
    input.nativeElement.focus();
  }
}
