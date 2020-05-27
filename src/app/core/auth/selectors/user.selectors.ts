import { State  as UserState } from '../reducers/user.reducers';
import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';

export const selectUser = (state: AppState) => state.user;
export const selectUserProperty = createSelector(
    selectUser,
    (state: UserState) => state.user
);
