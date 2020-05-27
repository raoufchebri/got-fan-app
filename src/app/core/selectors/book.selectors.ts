import { createSelector } from '@ngrx/store';
import * as fromBook from '../reducers/book.reducers';
import { AppState } from '../../app.reducers';

export const selectPost = (state: AppState) => state.book;
export const selectBookCollection = createSelector(
    selectPost,
    (state: fromBook.State) => state.books
);
