import { MockUser } from '@shared/resource-mock.utils';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { NormalUserActions } from './normal-user.actions';

export const NormalUsersStateFeatureName = 'normal-users';

export interface NormalUsersState extends EntityState<MockUser> {
  error: string | null;
  loading: boolean;
}

export const NormalUsersStateAdapter: EntityAdapter<MockUser> =
  createEntityAdapter<MockUser>({
    selectId: (item) => item.id,
  });

export const NormalUsersInitialState: NormalUsersState =
  NormalUsersStateAdapter.getInitialState({
    error: null,
    loading: false,
  });

export const normalUsersStateReducer = createReducer(
  NormalUsersInitialState,
  on(NormalUserActions.retrieveNormalUsers, (state): NormalUsersState => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(
    NormalUserActions.retrieveNormalUsersSuccess,
    (state, { users }): NormalUsersState => {
      return NormalUsersStateAdapter.setMany(users, {
        ...state,
        loading: false,
      });
    }
  ),
  on(
    NormalUserActions.userActionFailure,
    (state, { error }): NormalUsersState => {
      return {
        ...state,
        loading: false,
        error: error,
      };
    }
  )
);
