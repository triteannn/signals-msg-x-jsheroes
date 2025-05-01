import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MockUser } from '../resource-mock.utils';
import { rxResource } from '@angular/core/rxjs-interop';
import { delay } from 'rxjs';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-resource-example-usecase-resource',
  template: `
    <div>
      <h1>Resource Example UseCase Resource Usage</h1>
      <button mat-stroked-button (click)="onChangePage()">Change Page</button>
      <div>
        @let errorValue = data.error();
        @if (errorValue) {
          <div>Error: {{ errorValue }}</div>
        }
        <div>{{ data.status() }}</div>

        <div>
          @if (data.hasValue()) {
            @let dataValue = data.value();
            @for (user of dataValue; track user.id) {
              <div>User: {{ user.name }}</div>
            }
          }
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButton],
})
export class ResourceExampleUseCaseResourceComponent {
  private readonly httpClient = inject(HttpClient);
  page = signal(1);
  filterData = signal('');
  data = rxResource({
    request: () => ({ page: this.page(), filter: this.filterData() }),
    loader: ({ request }) => {
      return this.httpClient
        .get<MockUser[]>(`api/users`, {
          params: { page: request.page, filter: request.filter },
        })
        .pipe(delay(1000));
    },
    defaultValue: [],
  });

  protected onChangePage() {
    this.page.update((page) => page + 1);
  }
}
