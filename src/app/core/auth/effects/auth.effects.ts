
import { Injectable } from '@angular/core';
import { Effect, Actions, createEffect, ofType } from '@ngrx/effects';
import { of, Observable, defer } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import * as AuthActions from '../actions/auth.actions';
import * as UserActions from '../actions/user.actions';
import { environment } from 'src/environments/environment';
import { Action, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AppState } from 'src/app/app.reducers';
@Injectable()
export class AuthEffects {
    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.login),
            mergeMap(({email, password}) => this.authService.loginWithEmailAndPassword(email, password)
                .pipe(
                    map(user => {
                        return AuthActions.loginSuccess({ uid: user.uid });
                    }),
                    catchError(error => of(AuthActions.loginFailure({ error }))))
            ),
        );
    });
    googleLogin$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.googleLogin),
            mergeMap(() => this.authService.googleLogin()
                .pipe(
                    map(user => {
                        return AuthActions.loginSuccess({ uid: user.uid });
                    }),
                    catchError(error => of(AuthActions.loginFailure({ error }))))
            ),
        );
    });
    @Effect({ dispatch: false })
    loginSuccess$ = this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({uid}) => {
            localStorage.setItem(environment.uid, uid);
            this.store.dispatch(UserActions.load({uid}));
        }),
    );
    logout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.logout),
            mergeMap(() =>
                this.authService.logout().pipe(
                    map(data => {
                        this.router.navigateByUrl('/login');
                        return AuthActions.logoutSuccess();
                    }))
            ),
        );
    });
    @Effect()
    init$: Observable<Action> = defer(() => {
        const userId = localStorage.getItem(environment.uid);
        let observableResult = of({ type: 'NO_ACTION' });
        if (userId) {
            observableResult = of(AuthActions.loginSuccess({ uid: userId }));
        }
        return observableResult;
    });
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
        private store: Store<AppState>
    ) { }
}