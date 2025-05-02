import {
  NormalUsersState,
  NormalUsersStateFeatureName,
} from './normal-user.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MockUser } from '@shared/resource-mock.utils';

const selectNormalUsersFeatureState = () =>
  createFeatureSelector<NormalUsersState>(NormalUsersStateFeatureName);

export const selectNormalUserList = () =>
  createSelector(selectNormalUsersFeatureState(), (state) => {
    return (state.ids.map((id) => state.entities[id]) as MockUser[]) || [];
  });

export const selectNormalUserStateLoading = () =>
  createSelector(selectNormalUsersFeatureState(), (state) => {
    return state.loading;
  });

export const selectNormalUserStateError = () =>
  createSelector(selectNormalUsersFeatureState(), (state) => {
    return state.error;
  });
