import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  signal,
} from '@angular/core';

export type ProductItem = { id: string; name: string; quantity: number };

@Component({
  selector: 'app-linked-signal-example-main',
  imports: [],
  template: `
    <div>
      <div>
        <h2>Products</h2>
        @for (product of products(); track product.id) {
          <div>
            <h3>NAME: {{ product.name }}</h3>
            <div>DEFAULT QUANTITY: {{ product.quantity }}</div>
            <button (click)="onProductSelected(product.id)">Select This</button>
          </div>
        }
      </div>
      <div>
        <h2>Selected Product</h2>
        @let selected = selectedProduct();
        @if (selected) {
          <h3>NAME: {{ selected.name }}</h3>
          <div>Quantity: {{ selectedQuantity() }}</div>
          <button (click)="updateSelectedQuantity()">Decrease</button>
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
  selectedQuantity = linkedSignal({
    source: () => ({ selectedProductId: this.selectedProductId }),
    computation: (source) => {
      return (
        this.products().find((x) => x.id === source.selectedProductId())
          ?.quantity ?? 1
      );
    },
  });

  protected updateSelectedQuantity() {
    this.selectedQuantity.update((x) => x - 1);
  }

  protected onProductSelected(id: string) {
    this.selectedProductId.set(id);
  }
}
