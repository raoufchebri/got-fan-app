import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/core/services/item/item.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Book } from 'src/app/core/models/book.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { selectQueryCollection, selectFilter, selectItemState } from 'src/app/core/selectors/item.selectors';
import { Character } from 'src/app/core/models/character.model';

import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { House } from 'src/app/core/models/house.model';
import { Query } from 'src/app/core/models/query.model';
import { selectUserId } from 'src/app/core/auth/selectors/auth.selectors';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  books$: Observable<Book[]>;
  characters$: Observable<Character[]>;

  items$ = new BehaviorSubject([]);
  finished = false;
  lastKey = '';
  page = 1;
  pageSize = 10;
  data$: Observable<any[]>;
  queries: Query[];
  filter: string;
  recentlyViewed$ = new BehaviorSubject([]);
  constructor(
    private store: Store<AppState>,
    private spinner: NgxSpinnerService,
    private itemService: ItemService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.initQuery();
    this.store.select(selectFilter).subscribe(filter => this.filter = filter);
    this.getRecentlyViewed();
  }

  private getRecentlyViewed() {
    this.store.select(selectUserId).pipe(tap(uid => {
      this.itemService.getRecentlyViewed(uid)
        .pipe(tap(views => {
          if(views.length > 0) {
            for (let i = 0; i < 3; i++) {
              const view = views[i];
              const splitUrl = view.url.split('/');
              const id = splitUrl.pop();
              const resource = splitUrl.pop();
              this.itemService.getById(resource, id).pipe(tap(item => {
                const currentItems = this.recentlyViewed$.getValue();
                this.recentlyViewed$.next(_.concat(currentItems, item));
                this.spinner.hide();
              })).subscribe();
            }
          }
          else {
            this.spinner.hide();
          }
        })).subscribe();
    })).subscribe();
  }

  initQuery() {
    this.store.select(selectItemState).subscribe(item => {
      const { isNewQuery } = item;
      if (isNewQuery) {
        this.items$ = new BehaviorSubject([]);
        this.page = 1;
        this.finished = false;
      }
    });
    this.store.select(selectQueryCollection)
      .subscribe(queries => {
        if (queries) {
          this.queries = queries;
          this.getItems();
        }
      });
  }

  onScroll() {
    console.log('scrolled');
    this.getItems();
  }

  getItems() {
    this.recentlyViewed$ = null;
    if (this.finished) { return; }
    this.spinner.show();
    this.queries = this.queries.map(query => ({ ...query, page: this.page }));
    this.itemService.get(this.queries)
      .pipe(tap(newItems => {
        if (newItems && newItems.length > 0) {
          const currentItems = this.items$.getValue();

          if (this.lastKey === _.last(newItems).url || newItems.length < this.pageSize) {
            this.finished = true;
          }
          this.lastKey = _.last(newItems).url;
          this.items$.next(_.concat(currentItems, newItems));
          this.spinner.hide();
          this.page++;
        }
      })).subscribe();
  }

  getRouterLink(element: Book | Character | House) {
    const stack = element.url.split('/');
    const id = stack.pop();
    const type = stack.pop();

    return ['/detail', type, id];
  }

  canShow(element: Book | Character | House) {
    if (this.filter === null) { return true; }
    console.log(this.filter, element);
    return element.name.toLowerCase().includes(this.filter.toLowerCase());
  }
}
