import { createReducer, on, Action } from '@ngrx/store';
import * as bookActions from '../actions/book.actions';
import { Book } from '../models/book.model';

export interface State {
    books: Book[];
}

export const initialState: State = {
    books: undefined
}

const bookReducer = createReducer(
    initialState,
    on(bookActions.loadSuccess, (state, action) => ({ ...state, books: action.books })),
);

export function reducer(state: State | undefined, action: Action) {
    return bookReducer(state, action);
}
