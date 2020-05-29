import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login, googleLogin } from 'src/app/core/auth/actions/auth.actions';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.reducers';
import { selectAuth } from 'src/app/core/auth/selectors/auth.selectors';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { selectUserProperty } from 'src/app/core/auth/selectors/user.selectors';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  private readonly properties = {
    email: ['admin@demo.com'],
    password: ['admindemo']
  };

  error$: Observable<string>;
  isLoggedIn: Observable<boolean>;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit() {
    this.error$ = this.store.select(selectAuth).pipe(map(state => state.error));
    this.loginForm = this.formBuilder.group(this.properties);

    this.store.select(selectUserProperty).pipe(tap(user => {
      if (user) {
        this.router.navigateByUrl('/search');
      }
    })).subscribe();
  }

  login() {
    const {email, password} = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value
    };

    this.store.dispatch(login({email, password}));
  }

  googleLogin() {
    this.store.dispatch(googleLogin());
  }

}
