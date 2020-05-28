import { createReducer, on, Action } from '@ngrx/store';
import * as characterActions from '../actions/character.actions';
import { Character } from '../models/character.model';

export interface State {
    characters: Character[];
}

export const initialState: State = {
    characters: undefined
}

const characterReducer = createReducer(
    initialState,
    on(characterActions.loadSuccess, (state, action) => ({ ...state, characters: action.characters })),
);

export function reducer(state: State | undefined, action: Action) {
    return characterReducer(state, action);
}
