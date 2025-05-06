import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { MatButton } from '@angular/material/button';

export type ProductItem = { id: string; name: string; quantity: number };

@Component({
  selector: 'app-linked-signal-example-main',
  imports: [MatButton],
  template: `
    <div class="grid-2-col">
      <div>
        <h2>Products</h2>
        @for (product of products(); track product.id) {
          <div class="grid-2-col">
            <div>
              <h3>NAME: {{ product.name }}</h3>
              <div>DEFAULT QUANTITY: {{ product.quantity }}</div>
            </div>
            <div>
              <button
                mat-stroked-button
                (click)="onProductSelected(product.id)"
              >
                Select This
              </button>
            </div>
          </div>
        }
      </div>
      <div>
        <h2>Selected Product</h2>
        @let selected = selectedProduct();
        @if (selected) {
          <div class="grid-2-col">
            <div>
              <h3>NAME: {{ selected.name }}</h3>
              <div>Quantity: {{ selectedQuantity() }}</div>
            </div>
            <div>
              <button mat-stroked-button (click)="updateSelectedQuantity()">
                Decrease
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkedSignalExampleMainComponent {
  products = input.required<ProductItem[]>();
  selectedProductId = signal<string | null>(null);
  selectedProduct = computed(() =>
    this.products().find((x) => x.id === this.selectedProductId())
  );

  simplerSelectedQuantity = linkedSignal(
    () =>
      this.products().find((x) => x.id === this.selectedProductId())
        ?.quantity ?? 1
  );
  selectedQuantity = linkedSignal({
    source: () => ({ selectedProductId: this.selectedProductId }), // when you need the previous state for compute
    computation: (source) => {
      return (
        this.products().find((x) => x.id === source.selectedProductId())
          ?.quantity ?? 1
      );
    },
  });

  // How would have looked like without using linkedSignal?

  /**
  selectedQuantityOld = signal<number>(0);

  constructor() {
    effect(() => {
      const selectedId = this.selectedProductId();
      const products = this.products();

      const newValue = products.find((x) => x.id === selectedId)?.quantity ?? 1;
      this.selectedQuantityOld.set(newValue);
    });
  }
  **/

  protected updateSelectedQuantity() {
    this.selectedQuantity.update((x) => x - 1);
  }

  protected onProductSelected(id: string) {
    this.selectedProductId.set(id);
  }
}
