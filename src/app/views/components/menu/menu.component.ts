import { Component, OnInit } from '@angular/core';
import { logout } from 'src/app/core/auth/actions/auth.actions';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/auth/models/user';
import { UserService } from 'src/app/core/auth/services/user.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  user$: Observable<User>;
  constructor(private store: Store<AppState>, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user$ = this.userService.getCurrentUser();
    this.user$.pipe(tap(user => {
      if (user) {
        this.router.navigateByUrl('/search');
      }
    })).subscribe();
  }

  logout() {
    this.store.dispatch(logout());
  }

  toggle() {
    $('.ui.sidebar').sidebar('toggle');
  }

}
