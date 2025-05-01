import { MockUser } from '@shared/resource-mock.utils';

export type UserState = {
  users: MockUser[];
  isLoadingUsers: boolean;
  error: unknown;
};
