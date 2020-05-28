import { Component, OnInit } from '@angular/core';
import { QueryService } from 'src/app/core/services/query/query.service';
import { Observable, combineLatest } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { Book } from 'src/app/core/models/book.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { selectQueryCollection, selectResponseCollection, selectFilter, selectQuery } from 'src/app/core/selectors/query.selectors';
import { Character } from 'src/app/core/models/characater.model';
import * as queryActions from 'src/app/core/actions/query.actions';

import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';
import { CharacterService } from 'src/app/core/services/characters/character.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { House } from 'src/app/core/models/house.model';
import { Query } from 'src/app/core/models/query.model';

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
  constructor(
    private characterService: CharacterService,
    private store: Store<AppState>,
    private spinner: NgxSpinnerService,
    private itemService: QueryService) { }

  ngOnInit(): void {
    this.initQuery();
    this.store.select(selectFilter).subscribe(filter => this.filter = filter);
  }

  initQuery() {
    this.store.select(selectQuery).subscribe(item => {
      const {isNewQuery} = item;
      if (isNewQuery) {
            this.items$ = new BehaviorSubject([]);
            this.page = 1;
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
    this.store.dispatch(queryActions.loadNextPage());
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
          const filter = this.queries[0].filters.name;
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
