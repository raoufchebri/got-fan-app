import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Book } from 'src/app/core/models/book.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Character } from 'src/app/core/models/character.model';

import * as _ from 'lodash';
import { House } from 'src/app/core/models/house.model';
import { FavoriteService } from 'src/app/core/services/favorite/favorite.service';
import { selectUserId } from 'src/app/core/auth/selectors/auth.selectors';
import { Favorite } from 'src/app/core/models';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, OnChanges {


  items$: any;
  favorites = new Map<string, Favorite>();
  uid: string;
  @Input() items: any[];
  favorites$: Observable<Favorite[]>;

  constructor(
    private store: Store<AppState>,
    private favoriteService: FavoriteService,
  ) { }

  ngOnInit(): void {
    this.store.select(selectUserId).pipe(tap(uid => {
      this.uid = uid;
      this.favorites$ = this.favoriteService.get(uid);
      this.favorites$.pipe(tap(fav => {
        fav.forEach(f => {
          this.favorites.set(f.url, f);
        });
      })).subscribe();
    })).subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.items$ = changes.items.currentValue;
  }

  getRouterLink(element: Book | Character | House) {
    const stack = element.url.split('/');
    const id = stack.pop();
    const type = stack.pop();

    return ['/detail', type, id];
  }

  isFavorite(url: string) {
    return this.favorites.has(url);
  }

}
