import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import * as UserActions from '../actions/user.actions';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class UserEffects {

    // loadCurrent$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(UserActions.loadCurrent),
    //         mergeMap(() =>
    //             this.userService.getCurrentUser().pipe(
    //                 map(user => {
    //                     return UserActions.loadSuccess({ user });
    //                 }),
    //                 catchError(error => of(UserActions.loadFailure({ error }))))
    //         ),
    //     );
    // });

    @Effect()
    loadCurrent$ = this.actions$.pipe(
        ofType(UserActions.load),
        mergeMap(({uid}) =>
            this.userService.get(uid).pipe(
                map(user => {
                    return UserActions.loadSuccess({ user });
                }),
                catchError(error => of(UserActions.loadFailure({ error }))))
        ),
    );

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private userService: UserService,
        private router: Router,
    ) { }
}
