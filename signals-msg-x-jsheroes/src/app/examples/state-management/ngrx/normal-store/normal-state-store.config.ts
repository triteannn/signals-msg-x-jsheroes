import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { NormalUserEffects } from './state/normal-user.effects';
import {
  NormalUsersStateFeatureName,
  normalUsersStateReducer,
} from './state/normal-user.reducers';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

export const provideNormalStoreState = (): EnvironmentProviders =>
  makeEnvironmentProviders([
    provideState(NormalUsersStateFeatureName, normalUsersStateReducer),
    provideEffects(NormalUserEffects),
  ]);
