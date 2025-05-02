import {
  Component,
  input,
  model,
  computed,
  booleanAttribute,
} from '@angular/core';
import { MatInput, MatFormField, MatLabel } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-input-model-signals',
  template: `
    <h2>Input & Model Signals</h2>

    <mat-form-field>
      <mat-label>Status (model)</mat-label>
      <input
        matInput
        [value]="status()"
        (input)="status.set($any($event.target).value)"
      />
    </mat-form-field>

    <p class="flex items-center gap-2">
      <mat-icon>person</mat-icon>Hello, {{ name() }}!
    </p>
    @if (company()) {
      <p class="flex items-center gap-2">
        <mat-icon>apartment</mat-icon>Company: {{ company() }}
      </p>
    }
    <p class="flex items-center gap-2">
      <mat-icon>psychology_alt</mat-icon>Status: {{ status() }}
    </p>
    <p class="flex items-center gap-2">
      <mat-icon>flight</mat-icon>On holiday:
      <mat-checkbox disabled [checked]="isCurrentlyOnHoliday()" />
    </p>

    @if (isStatusEmpty()) {
      <p class="flex items-center gap-2">
        <mat-icon>warning</mat-icon>Please enter a status.
      </p>
    }

    <button mat-stroked-button type="button" (click)="resetStatus()">
      Reset Status
    </button>
  `,
  styles: `
    .flex.items-center.gap-2 {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    mat-form-field {
      width: 200px;
    }
    section {
      margin-bottom: 1rem;
    }
  `,
  imports: [
    MatInput,
    MatFormField,
    MatLabel,
    MatButtonModule,
    MatCheckbox,
    MatIcon,
  ],
})
export class InputModelSignalsComponent {
  // Regular input signal (required)
  name = input.required<string>();

  // Regular input signal (optional)
  company = input<string>();

  isCurrentlyOnHoliday = input(false, { transform: booleanAttribute });

  // Model signal (two-way binding)
  status = model.required<string>();

  protected readonly statusLength = computed(() => this.status().length);

  protected readonly isStatusEmpty = computed(
    () => this.status().trim() === ''
  );

  resetStatus(): void {
    this.status.set('');
  }
}
