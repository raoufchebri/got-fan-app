import { createAction, props } from '@ngrx/store';
import { Character } from '../models/character.model';
export const load = createAction('[Search Bar] Load Characters', props<{gender: string, culture: string, isAlive: boolean}>());
export const loadSuccess = createAction('[Search Bar] Load Characters Success', props<{characters: Character[]}>());
export const loadFailure = createAction('[Search Bar] Load Characters Failre', props<{error: string}>());
