import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ItemService } from 'src/app/core/services/item/item.service';
import { Observable, combineLatest } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { Book } from 'src/app/core/models/book.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { selectQueryCollection, selectResponseCollection, selectFilter, selectItemState } from 'src/app/core/selectors/item.selectors';
import { Character } from 'src/app/core/models/character.model';
import * as queryActions from 'src/app/core/actions/item.actions';

import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';
import { CharacterService } from 'src/app/core/services/characters/character.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { House } from 'src/app/core/models/house.model';
import { Query } from 'src/app/core/models/query.model';
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

  constructor(
    private characterService: CharacterService,
    private store: Store<AppState>,
    private spinner: NgxSpinnerService,
    private itemService: ItemService,
    private favoriteService: FavoriteService,
  ) { }

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
