import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  delay,
  dematerialize,
  filter,
  materialize,
  Observable,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MockUser } from '../../../../shared/resource-mock.utils';
import { AsyncPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-resource-example-usecase-old',
  template: `
    <div>
      <h1>Resource Example UseCase Old Usage</h1>
      <div class="flex-row gap-4">
        <button mat-stroked-button (click)="onChangePage()">Change Page</button>
      </div>
      <div class="p-4">
        @let error = error$ | async;
        @if (error) {
          <div>Error: {{ error }}</div>
        }

        <div>
          @let data = data$ | async;
          @if (data) {
            @for (user of data; track user.id) {
              <div>User: {{ user.name }}</div>
            }
          }
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, MatButton],
})
export class ResourceExampleUseCaseOldComponent {
  private readonly httpClient = inject(HttpClient);
  page$ = new BehaviorSubject(1);
  filterData$ = new BehaviorSubject('');

  request$: Observable<any> = combineLatest([
    this.page$,
    this.filterData$,
  ]).pipe(
    switchMap(([page, filterData]) =>
      this.httpClient
        .get<MockUser[]>(`api/users`, { params: { page, filter: filterData } })
        .pipe(
          delay(1000),
          materialize(), // aggregates errors, complete and next into one object type
          filter((notification) => notification.kind !== 'C') // anything not yet completed
        )
    ),
    shareReplay(1)
  );

  data$ = this.request$.pipe(
    filter((notification) => notification.kind === 'N'),
    tap((value) => console.log('data', value)),
    dematerialize() // dematerialize the notification to get the original data,
  ) as Observable<MockUser[]>;

  error$ = this.request$.pipe(
    filter((notification) => notification.kind === 'E'),
    tap((value) => console.log('error', value)),
    switchMap((notification) => notification.error)
  );

  protected onChangePage() {
    this.page$.next(this.page$.getValue() + 1);
  }
}
