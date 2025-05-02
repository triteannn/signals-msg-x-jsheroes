import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  LinkedSignalExampleMainComponent,
  ProductItem,
} from './linked-signal-example-main.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-linked-signal-example-entry',
  imports: [LinkedSignalExampleMainComponent, MatButton],
  template: `
    <div>
      <h1>Linked Signal Example</h1>
      <div class="flex-row w-full gap-4">
        <button mat-stroked-button (click)="onExternalUpdate()">
          Trigger External Update
        </button>
      </div>
      <div>
        <app-linked-signal-example-main [products]="products()" />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkedSignalExampleEntryComponent {
  protected products = signal<ProductItem[]>([
    {
      id: '1',
      name: 'OnePlus 13 Pro',
      quantity: 13,
    },
    {
      id: '2',
      name: 'Honor Magic 6 Pro',
      quantity: 24,
    },
    {
      id: '3',
      name: 'Nothing Phone',
      quantity: 42,
    },
    {
      id: '4',
      name: 'Iphone 16 Pro Max',
      quantity: 6,
    },
    {
      id: '5',
      name: 'Iphone 15 Pro',
      quantity: 7,
    },
  ]);

  protected onExternalUpdate() {
    // nuke iphone
    this.products.update((items) =>
      items.filter((x) => !x.name.includes('Iphone'))
    );
  }
}
