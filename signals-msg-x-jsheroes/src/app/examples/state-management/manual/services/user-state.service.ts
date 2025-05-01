import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { MockUser } from '@shared/resource-mock.utils';
import { UserState } from '../models/user-state';
import {
  catchError,
  defer,
  delay,
  finalize,
  of,
  retry,
  Subject,
  switchMap,
  tap,
  throwError,
  timer,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';

const initialState: UserState = {
  users: [],
  isLoadingUsers: false,
  error: null,
};

@Injectable()
export class UserStateService {
  // selectors (state slices)
  users = computed(() => this._usersState().users);
  isLoadingUsers = computed(() => this._usersState().isLoadingUsers);
  error = computed(() => this._usersState().error);

  // actions
  private readonly _fetchUser$ = new Subject<void>();

  // readonly state (to only be updated through "reducers")
  private readonly _usersState = signal(initialState);

  // DI
  private readonly _httpClient = inject(HttpClient);

  constructor() {
    // handle action triggers
    this.handleUserFetching();
  }

  // public action handlers
  fetchUsers(): void {
    this._fetchUser$.next();
  }

  // reducers
  private setUsers(users: MockUser[]): void {
    this._usersState.update((currentState) => ({ ...currentState, users }));
  }

  private setIsLoading(isLoadingUsers: boolean): void {
    this._usersState.update((currentState) => ({
      ...currentState,
      isLoadingUsers,
    }));
  }

  private setError(error: unknown): void {
    this._usersState.update((currentState) => ({ ...currentState, error }));
  }

  // action triggers handlers
  private handleUserFetching(): void {
    // Randomizing between 2 Observables (1 successful, 1 emitting error). This is for showcase purposes only
    const result$ = defer(() => {
      const shouldSucceed = Math.random() < 0.5;
      return shouldSucceed
        ? // delay for this as it nexts
          this._httpClient.get<MockUser[]>(`api/users`).pipe(delay(2000))
        : // timer here to only create the throwError Observable after 2s have elapsed, as error can't be delayed
          timer(2000).pipe(
            switchMap(() =>
              throwError(() => new Error('500: Internal server error.'))
            )
          );
    });

    this._fetchUser$
      .pipe(
        tap(() => this.setIsLoading(true)),
        switchMap(() =>
          result$.pipe(
            finalize(() => this.setIsLoading(false)),
            catchError((error) => {
              this.setError(error);
              return of(error);
            })
          )
        ),
        retry()
      )
      .subscribe((users) => this.setUsers(users));
  }
}
