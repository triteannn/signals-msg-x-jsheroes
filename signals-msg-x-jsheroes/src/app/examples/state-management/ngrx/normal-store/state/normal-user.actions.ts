import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { MockUser } from '@shared/resource-mock.utils';

export const NormalUserActions = createActionGroup({
  source: 'NormalUser',
  events: {
    RetrieveNormalUsers: emptyProps(),
    RetrieveNormalUsersSuccess: props<{ users: MockUser[] }>(),
    UserActionFailure: props<{ error: string }>(),
  },
});
