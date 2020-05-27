import { createAction, props } from '@ngrx/store';
import { Book } from '../models/book.model';
export const load = createAction('[Search Bar] Load Books', props<{fromReleaseDate: Date, toReleaseDate: Date}>());
export const loadSuccess = createAction('[Search Bar] Load Books Success', props<{books: Book[]}>());
export const loadFailure = createAction('[Search Bar] Load Books Failre', props<{error: string}>());
