import { createEffect, ofType, Actions } from '@ngrx/effects';
import * as characterActions from '../actions/character.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { CharacterService } from '../services/characters/character.service';

@Injectable()
export class CharacterEffects {

    loadItems$ = createEffect(() => {
        return this.actions$.pipe(
                ofType(characterActions.load),
                mergeMap(({gender, culture, isAlive}) =>
                    this.characterService.getByFilter(gender, culture, isAlive).pipe(
                        map(characters => characterActions.loadSuccess({ characters })),
                        catchError(error => of(characterActions.loadFailure({ error }))))
                    ),
        );
    });

    constructor(
        private actions$: Actions,
        private characterService: CharacterService
    ) { }
}
