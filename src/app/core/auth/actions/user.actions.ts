import { User } from '../models/user';
import { props, createAction } from '@ngrx/store';

export const load = createAction('[Login Page] Load User', props<{uid: string}>());
export const loadCurrent = createAction('[Login Page] Load Current User');
export const loadSuccess = createAction('[Login Page] Load User Success', props<{user: User}>());
export const loadFailure = createAction('[Login Page] Load User Failure', props<{error: string}>());
