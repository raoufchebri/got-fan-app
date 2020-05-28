import { createEffect, ofType, Actions } from '@ngrx/effects';
import * as itemActions from '../actions/item.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ItemService } from '../services/item/item.service';

@Injectable()
export class ItemEffects {

    loadItems$ = createEffect(() => {
        return this.actions$.pipe(
                ofType(itemActions.loadCollection),
                mergeMap(({queries}) =>
                    this.queryService.get(queries).pipe(
                        map(response => itemActions.loadSuccess({ response })),
                        catchError(error => of(itemActions.loadFailure({ error }))))
                    ),
        );
    });

    loadItem$ = createEffect(() => {
        return this.actions$.pipe(
                ofType(itemActions.loadOne),
                mergeMap(({resource, id}) =>
                    this.queryService.getById(resource, id).pipe(
                        map(response => itemActions.loadOneSuccess({ response })),
                        catchError(error => of(itemActions.loadFailure({ error }))))
                    ),
        );
    });

    constructor(
        private actions$: Actions,
        private queryService: ItemService
    ) { }
}
