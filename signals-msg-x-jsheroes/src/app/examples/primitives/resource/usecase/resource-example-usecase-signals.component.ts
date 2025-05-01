import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { delay, filter, materialize, shareReplay, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MockUser } from '../resource-mock.utils';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-resource-example-usecase-signals',
  template: `
    <div>
      <h1>Resource Example UseCase Signals Usage</h1>
      <button (click)="onChangePage()">Change Page</button>
      <div>
        @let errorValue = error();
        @if (errorValue) {
          <div>Error: {{ errorValue }}</div>
        }

        <div>
          @let dataValue = data();
          @if (dataValue) {
            @for (user of dataValue; track user.id) {
              <div>User: {{ user.name }}</div>
            }
          }
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class ResourceExampleUseCaseSignalsComponent {
  private readonly httpClient = inject(HttpClient);
  page = signal(1);
  filterData = signal('');
  request = toSignal(
    this.httpClient
      .get<MockUser[]>(`api/users`, {
        params: { page: this.page(), filter: this.filterData() }, // problem with this is that will not update based on the signals
      })
      .pipe(
        delay(1000),
        tap(console.log),
        materialize(),
        filter((notification) => notification.kind !== 'C'),
        shareReplay(1)
      ) // linked signal an option? => Still need to handle the async nature
  );
  data = computed(() => {
    const requestValue = this.request();
    if (requestValue?.kind === 'N') {
      console.log('data', requestValue);
      return requestValue.value;
    }
    return [];
  });
  error = computed(() => {
    const requestValue = this.request();
    if (requestValue?.kind === 'E') {
      console.log('error', requestValue);
      return requestValue.error;
    }
    return undefined;
  });

  // actual solution to this is an effect that sets the data and error signals with untracked (but is imperative)

  // constructor() {
  //   // something similar to this
  //   effect(() => {
  //     this.httpClient
  //       .get<MockUser[]>(`api/users`, {
  //         params: { page: this.page(), filter: this.filterData() }, // problem with this is that will not update based on the signals
  //       }).subscribe(value=>{
  //         this.data.set(value);
  //         // ....
  //     })
  //   });
  // }

  // other options will be to have a store that will handle the continuous stream of data

  protected onChangePage() {
    this.page.update((page) => page + 1);
  }
}
