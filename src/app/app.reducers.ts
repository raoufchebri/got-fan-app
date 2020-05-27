import * as fromBook from './core/reducers/book.reducers';
import * as fromCharacter from './core/reducers/character.reducers';
import * as fromResource from './core/reducers/query.reducers';
import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './core/auth/reducers/auth.reducers';
import * as fromUser from './core/auth/reducers/user.reducers';

export interface AppState {
    book: fromBook.State;
    character: fromCharacter.State;
    query: fromResource.State;
    auth: fromAuth.State;
    user: fromUser.State;
}

export const reducers: ActionReducerMap<AppState> = {
    book: fromBook.reducer,
    character: fromCharacter.reducer,
    query: fromResource.reducer,
    auth: fromAuth.reducer,
    user: fromUser.reducer,
};

