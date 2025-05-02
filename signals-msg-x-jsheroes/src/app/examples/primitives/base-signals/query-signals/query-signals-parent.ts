import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QuerySignalsComponent } from './query-signals';
import { MatButton } from '@angular/material/button';

@Component({
  template: `<app-query-signals>
    <button #projectedButton mat-stroked-button disabled type="button">
      Projected button
    </button>
  </app-query-signals>`,
  imports: [QuerySignalsComponent, MatButton],
})
export class QuerySignalsParentComponent {}
