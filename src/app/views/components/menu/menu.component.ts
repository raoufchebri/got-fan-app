import { Component, OnInit } from '@angular/core';
import { logout } from 'src/app/core/auth/actions/auth.actions';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { selectUserProperty } from 'src/app/core/auth/selectors/user.selectors';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/auth/models/user';
import { UserService } from 'src/app/core/auth/services/user.service';

declare var $: any;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  user$: Observable<User>;
  constructor(private store: Store<AppState>, private userService: UserService) { }

  ngOnInit(): void {
    this.user$ = this.userService.getCurrentUser();
  }

  logout() {
    this.store.dispatch(logout());
  }

  toggle() {
    $('.ui.sidebar').sidebar('toggle');
  }

}
