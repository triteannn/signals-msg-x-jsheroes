import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { NormalUserActions } from './normal-user.actions';
import {
  selectNormalUserList,
  selectNormalUserStateError,
  selectNormalUserStateLoading,
} from './normal-user.selectors';
import { Observable } from 'rxjs';
import { MockUser } from '@shared/resource-mock.utils';

@Injectable({ providedIn: 'root' })
export class NormalUserFacadeService {
  private readonly store = inject(Store);

  public getAllNormalUsersStream(): Observable<MockUser[]> {
    return this.store.select(selectNormalUserList());
  }

  public getIsLoadingStream(): Observable<boolean> {
    return this.store.select(selectNormalUserStateLoading());
  }

  public getErrorStream(): Observable<string | null> {
    return this.store.select(selectNormalUserStateError());
  }

  public sendRetrieveALl(): void {
    this.store.dispatch(NormalUserActions.retrieveNormalUsers());
  }
}
