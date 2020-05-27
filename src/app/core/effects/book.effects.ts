import { createEffect, ofType, Actions } from '@ngrx/effects';
import * as bookActions from '../actions/book.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { BookService } from '../services/books/book.service';

@Injectable()
export class BookEffects {

    loadItems$ = createEffect(() => {
        return this.actions$.pipe(
                ofType(bookActions.load),
                mergeMap(({fromReleaseDate, toReleaseDate}) =>
                    this.bookService.getByFilter(fromReleaseDate, toReleaseDate).pipe(
                        map(books => bookActions.loadSuccess({ books })),
                        catchError(error => of(bookActions.loadFailure({ error }))))
                    ),
        );
    });

    constructor(
        private actions$: Actions,
        private bookService: BookService
    ) { }
}
