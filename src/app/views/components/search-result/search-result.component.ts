import { Component, OnInit } from '@angular/core';
import { QueryService } from 'src/app/core/services/query/query.service';
import { Observable, combineLatest } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { Book } from 'src/app/core/models/book.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { selectQueryCollection, selectResponseCollection } from 'src/app/core/selectors/query.selectors';
import { Character } from 'src/app/core/models/characater.model';
import * as queryActions from 'src/app/core/actions/query.actions';

import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';
import { CharacterService } from 'src/app/core/services/characters/character.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { House } from 'src/app/core/models/house.model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  books$: Observable<Book[]>;
  characters$: Observable<Character[]>;

  items = new BehaviorSubject([]);
  finished = false;
  lastKey = '';
  page = 1;
  data$: Observable<any[]>;
  constructor(
    private characterService: CharacterService,
    private store: Store<AppState>,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    this.getItems();

    // this.store.select(selectQueryCollection).pipe(tap(queries => {
    //   this.store.dispatch(queryActions.load({ queries }));
    // })).subscribe();

    this.data$ = this.store.select(selectResponseCollection);
  }

  onScroll() {
    console.log('scrolled');
    this.getItems();
  }

  getItems() {
    // if (this.finished) { return }
    // this.spinner.show();
    // this.store.select(selectQueryCollection).pipe(tap(queries => {
    //   if (queries) {
    //     let newQueries = []
    //     for (let query of queries) {
    //       newQueries.push({... query, page: query.page + 1})
    //     }
    //     console.log(queries)
    //     this.store.dispatch(queryActions.load({queries: newQueries}));
    //   }
    // })).subscribe();
    // this.store.select(selectResponseCollection)
    //   // this.characterService.getByFilter('','', true, this.page)
    //   .pipe(tap(items => {
    //     if (items && items.length > 0) {
    //       const newItems = items;
    //       const currentItems = this.items.getValue();

    //       if (this.lastKey === _.last(newItems).url) {
    //         this.finished = true;
    //       }

    //       this.lastKey = _.last(items).url;
    //       this.items.next(_.concat(currentItems, newItems));
    //       this.spinner.hide();
    //     }
    //   })).subscribe();
  }

  getRouterLink(element: Book | Character | House) {
    const stack = element.url.split('/');
    const id = stack.pop();
    const type = stack.pop();

    return ['/detail', type, id];
  }

}
