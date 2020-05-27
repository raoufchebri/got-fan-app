import { createEffect, ofType, Actions } from '@ngrx/effects';
import * as queryActions from '../actions/query.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { QueryService } from '../services/query/query.service';

@Injectable()
export class QueryEffects {

    loadItems$ = createEffect(() => {
        return this.actions$.pipe(
                ofType(queryActions.loadCollection),
                mergeMap(({queries}) =>
                    this.queryService.get(queries).pipe(
                        map(response => queryActions.loadSuccess({ response })),
                        catchError(error => of(queryActions.loadFailure({ error }))))
                    ),
        );
    });

    loadItem$ = createEffect(() => {
        return this.actions$.pipe(
                ofType(queryActions.loadOne),
                mergeMap(({resource, id}) =>
                    this.queryService.getById(resource, id).pipe(
                        map(response => queryActions.loadOneSuccess({ response })),
                        catchError(error => of(queryActions.loadFailure({ error }))))
                    ),
        );
    });

    constructor(
        private actions$: Actions,
        private queryService: QueryService
    ) { }
}
