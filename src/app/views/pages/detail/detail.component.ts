import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from 'src/app/app.reducers';
import { Store, select } from '@ngrx/store';
import { loadOne } from 'src/app/core/actions/item.actions';
import { selectItem, selectLoadingStatus } from 'src/app/core/selectors/item.selectors';
import { Observable } from 'rxjs';
import { ItemService } from 'src/app/core/services/item/item.service';
import { map, tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { FavoriteService } from 'src/app/core/services/favorite/favorite.service';
import { selectUserId } from 'src/app/core/auth/selectors/auth.selectors';
import { Favorite, Book, Character, House } from 'src/app/core/models';

declare var $: any;
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  item$: Observable<any>;
  keys$: Observable<string[]>;
  uid: string;
  favorites = new Map<string, Favorite>();
  favorites$: Observable<Favorite[]>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private spinner: NgxSpinnerService,
    private favoriteService: FavoriteService,
  ) { }

  ngOnInit(): void {

    this.spinner.show();
    this.store.select(selectLoadingStatus).subscribe(status => {
      if (status) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
    const resource = this.route.snapshot.paramMap.get('type');
    const id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(loadOne({ resource, id }));
    this.item$ = this.store.select(selectItem);
    this.keys$ = this.item$.pipe(map(item => Object.keys(item)));

    this.store.select(selectUserId).pipe(tap(uid => {
      this.uid = uid;
      this.favorites$ = this.favoriteService.get(uid);
      this.favorites$.pipe(tap(fav => {
        fav.forEach(f => {
          this.favorites.set(f.url, f);
        });
      })).subscribe();
      this.spinner.hide();
    })).subscribe();
  }

  getId(url: string) {
    const splitUrl: string[] = url.split('/');
    return splitUrl.pop();
  }

  camelCaseToSentence(text: string) {
    const result = text.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  isString(obj) {
    return typeof obj === 'string';
  }


  toggleFavorite(url) {
    if (this.favorites.has(url)) {
      this.favoriteService.delete(this.favorites.get(url).id);
      this.favorites.delete(url);
    } else {
      this.favoriteService.add({ url, uid: this.uid }).then(doc => {
        this.favorites.set(url, { url, uid: this.uid, id: doc.id });
      });
    }
  }

  isFavorite(item: Book | Character | House) {
    return this.favorites.has(item.url);
  }

  formatString(text: string) {
    const limit = 35;
    if (text.length < limit) {
      return text;
    } else {
      return text.substring(0, limit) + ' ...';
    }
  }
}
