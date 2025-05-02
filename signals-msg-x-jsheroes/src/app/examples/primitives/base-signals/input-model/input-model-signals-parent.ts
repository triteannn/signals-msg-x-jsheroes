import { Component } from '@angular/core';
import { InputModelSignalsComponent } from './input-model-signals';

@Component({
  template: `<app-input-model-signals
      isCurrentlyOnHoliday
      [name]="name"
      [company]="company"
      [(status)]="userStatus"
    />
    @if (userStatus) {
      <p>Status in parent: {{ userStatus }}</p>
    } @else {
      <p>No status in parent</p>
    } `,
  imports: [InputModelSignalsComponent],
})
export class InputModelSignalsParentComponent {
  protected readonly name = 'Tudorel';
  protected readonly company = 'msg DE';
  protected userStatus = 'Available';
}
