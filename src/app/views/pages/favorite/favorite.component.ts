import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/core/services/item/item.service';
import { tap, map } from 'rxjs/operators';
import { FavoriteService } from 'src/app/core/services/favorite/favorite.service';
import { FormControl } from '@angular/forms';
import { selectUserId } from 'src/app/core/auth/selectors/auth.selectors';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  set = new Set<string>();
  items$ = new BehaviorSubject([]);
  constructor(
    private itemService: ItemService, 
    private favoriteService: FavoriteService,
    private store: Store<AppState>
    ) { }

  ngOnInit(): void {
    this.store.select(selectUserId).pipe(tap(uid => {
      this.favoriteService.get(uid)
      .pipe(tap(favorites => {
        favorites.forEach(fav => {
          const splitUrl = fav.url.split('/');
          const id = splitUrl.pop();
          const resource = splitUrl.pop();
          this.itemService.getById(resource, id).pipe(tap(item => {
            const currentItems = this.items$.getValue();
            this.items$.next(_.concat(currentItems, item));
          })).subscribe();
        });
      })).subscribe();
    })).subscribe();
  }

}
