import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';

export const login = createAction('[Login Page] Login', props<{ email: string; password: string}>());
export const googleLogin = createAction('[Login Page] Login with Google');
export const loginSuccess = createAction('[Login Page] Login Succeeded', props<{uid: string}>());
export const loginFailure = createAction('[Login Page] Login Failed', props<{error: string}>());
export const logout = createAction('[Header Logout] Logout');
export const logoutSuccess = createAction('[Header Logout] Logout Succeeded');
