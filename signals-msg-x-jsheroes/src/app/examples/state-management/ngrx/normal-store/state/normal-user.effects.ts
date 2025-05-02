import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NormalUserActions } from './normal-user.actions';
import { catchError, exhaustMap, map } from 'rxjs';
import { UserClientService } from '../../shared/services/user-client.service';

@Injectable()
export class NormalUserEffects {
  private readonly client = inject(UserClientService);
  private readonly actions$ = inject(Actions);

  retrieveNormalUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NormalUserActions.retrieveNormalUsers),
      exhaustMap(() =>
        this.client.retrieveAll().pipe(
          map((users) =>
            NormalUserActions.retrieveNormalUsersSuccess({
              users,
            })
          ),
          catchError((error: HttpErrorResponse) => [
            NormalUserActions.userActionFailure({
              error: error.message,
            }),
          ])
        )
      )
    )
  );
}
