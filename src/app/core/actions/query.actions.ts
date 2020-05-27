import { createAction, props } from '@ngrx/store';
import { Query } from '../models/query.model';
import { Character } from '../models/characater.model';
import { Book } from '../models/book.model';
import { House } from '../models/house.model';

export const loadCollection = createAction('[Search Bar] Load Item Collection', props<{queries: Query[]}>());
export const loadOne = createAction('[Detail] Load Item', props<{resource: string, id: string}>());
export const loadOneSuccess = createAction('[Detail] Load Item Success', props<{response: Book | Character | House}>());
export const loadSuccess = createAction('[Search Bar] Load Items Success', props<{response: Book[] | Character[] | House[]}>());
export const loadFailure = createAction('[Search Bar] Load Items Failure', props<{error: string}>());
