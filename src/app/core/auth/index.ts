import { createSelector } from '@ngrx/store';

export interface AuthState {
  userId: string;
}

export interface AppState {
  feature: AuthState;
}

export const selectUserId = (state: AppState) => state.feature;

export const selectFeatureCount = createSelector(
  selectUserId,
  (state: AuthState) => state.userId
);
