import { MockUser } from '@shared/resource-mock.utils';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { inject } from '@angular/core';
import { UserClientService } from '../../shared/services/user-client.service';
import { distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

export type SignalUsersState = {
  users: MockUser[];
  error: string | null;
  loading: boolean;
};

const signalUsersInitialState: SignalUsersState = {
  users: [],
  error: null,
  loading: false,
};

export const SignalUserStore = signalStore(
  { providedIn: 'root' },
  withState(signalUsersInitialState),
  withMethods((store, client = inject(UserClientService)) => ({
    retrieveAll: rxMethod<void>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, { loading: true })),
        switchMap(() => {
          return client.retrieveAll().pipe(
            tapResponse({
              next: (users) => patchState(store, { users, loading: false }),
              error: (err) => {
                patchState(store, { loading: false });
                console.error(err);
              },
            })
          );
        })
      )
    ),
  }))
);
