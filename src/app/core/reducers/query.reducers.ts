import { createReducer, on, Action } from '@ngrx/store';
import * as resourceActions from '../actions/query.actions';
import { Query } from '../models/query.model';
import { Character } from '../models/characater.model';
import { House } from '../models/house.model';
import { Book } from '../models/book.model';

export interface State {
    queries: Query[];
    reponse: Book[] | Character[] | House[];
    item: Book | Character | House;
    error: string;
}

export const initialState: State = {
    queries: [{
        url: 'https://www.anapioficeandfire.com/api/books',
        filters: {
            name: null,
            fromReleaseDate: null,
            toReleaseDate: null
        },
        page: 1,
        pageSize: 10
    }],
    reponse: null,
    item: null,
    error: null
};

const resourceReducer = createReducer(
    initialState,
    on(resourceActions.loadCollection, (state, action) => ({ ...state, queries: action.queries })),
    on(resourceActions.loadSuccess, (state, action) => ({ ...state, reponse: action.response })),
    on(resourceActions.loadOneSuccess, (state, action) => ({ ...state, item: action.response })),
    on(resourceActions.loadFailure, (state, action) => ({ ...state, error: action.error })),
);

export function reducer(state: State | undefined, action: Action) {
    return resourceReducer(state, action);
}
