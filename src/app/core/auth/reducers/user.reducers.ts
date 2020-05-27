import { User } from '../models/user';
import * as userActions from '../actions/user.actions';
import * as authActions from '../actions/auth.actions';
import { createReducer, Action, on } from '@ngrx/store';

export interface State {
    user: User;
}

export const initialState: State = {
    user: undefined
}

const userReducer = createReducer(
    initialState,
    on(userActions.loadSuccess, (state, { user }) => (
        {
            ...state,
            user
        })),
    on(authActions.logoutSuccess, (state) => (initialState)),
);

export function reducer(state: State | undefined, action: Action) {
    return userReducer(state, action);
}
