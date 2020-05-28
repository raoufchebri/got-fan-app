import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { State as AuthState } from '../reducers/auth.reducers';

export const selectAuth = (state: AppState) => state.auth;
export const selectUserId = createSelector(
    selectAuth,
    (state: AuthState) => state.uid
);
export const isLoggedIn = createSelector(
    selectAuth,
    (state: AuthState) => state.isLoggedIn
);
