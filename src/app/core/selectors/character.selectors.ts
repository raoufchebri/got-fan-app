import { createSelector } from '@ngrx/store';
import * as fromCharacter from '../reducers/character.reducers';
import { AppState } from '../../app.reducers';

export const selectPost = (state: AppState) => state.character;
export const selectCharacterCollection = createSelector(
    selectPost,
    (state: fromCharacter.State) => state.characters
);
