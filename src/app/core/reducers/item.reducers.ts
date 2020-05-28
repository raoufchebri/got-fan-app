import { createReducer, on, Action } from '@ngrx/store';
import * as resourceActions from '../actions/item.actions';
import { Query } from '../models/query.model';
import { Character } from '../models/character.model';
import { House } from '../models/house.model';
import { Book } from '../models/book.model';

export interface State {
    queries: Query[];
    reponse: Book[] | Character[] | House[];
    item: Book | Character | House;
    error: string;
    isLoading: boolean;
    filter: string;
    isNewQuery: boolean;
}

export const initialState: State = {
    queries: null,
    reponse: null,
    item: null,
    error: null,
    isLoading: false,
    filter: null,
    isNewQuery: false,
};

const resourceReducer = createReducer(
    initialState,
    on(resourceActions.loadCollection, (state, action) => ({ ...state, queries: action.queries, isLoading: true, isNewQuery: true })),
    on(resourceActions.loadNextPage, (state) => ({ ...state, isNewQuery: false })),
    on(resourceActions.loadOne, (state) => ({ ...state, isLoading: true })),
    on(resourceActions.loadSuccess, (state, action) => ({ ...state, reponse: action.response, isLoading: false })),
    on(resourceActions.loadOneSuccess, (state, action) => ({ ...state, item: action.response, isLoading: false })),
    on(resourceActions.loadFailure, (state, action) => ({ ...state, error: action.error, isLoading: false })),
    on(resourceActions.filterOut, (state, action) => ({ ...state, filter: action.filter})),
);

export function reducer(state: State | undefined, action: Action) {
    return resourceReducer(state, action);
}
