import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
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
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, OnChanges {


  items$: any;
  @Input() items: any[];

  constructor(
    private characterService: CharacterService,
    private store: Store<AppState>,
    private spinner: NgxSpinnerService,
    private itemService: QueryService) { }

  ngOnInit(): void {
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
}
