import * as authActions from '../actions/auth.actions';
import { createReducer, on, Action } from '@ngrx/store';

export interface State {
    uid: string;
    error: string;
    isLoggedIn: boolean;
}

export const initialState: State = {
    uid: undefined,
    error: undefined,
    isLoggedIn: false,
};

const authReducer = createReducer(
    initialState,
    on(authActions.loginSuccess, (state, { uid }) => ({
        ...state,
        uid,
        isLoggedIn: true
    })),
    on(authActions.loginFailure, (state, { error }) => ({
        ...state,
        error
    })),
    on(authActions.logoutSuccess, state => (initialState))
);

export function reducer(state: State | undefined, action: Action) {
    return authReducer(state, action);
}
