import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { FormControl } from '@angular/forms';
import { BookFilter, CharacterFilter, HouseFilter } from 'src/app/core/models/filters.model';
import { Query } from 'src/app/core/models/query.model';
import * as resourceActions from 'src/app/core/actions/item.actions';
import { QueryService } from 'src/app/core/services/query/query.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  filter = false;
  bookFilter = true;
  characterFilter = true;
  houseFilter = true;
  resources = ['Books', 'Characters', 'Houses'];
  resourceControl = new FormControl();
  queryControl = new FormControl();
  options$: Observable<string[]>;
  searchOptions: Observable<any[]> = of([]);

  // Book filters
  minDate = new Date('1990/01/01');
  maxDate = new Date();
  startDate = new FormControl(this.minDate);
  endDate = new FormControl(this.maxDate);

  // Characters filters
  genders = ['All', 'Male', 'Female'];
  cultures$: Observable<string[]>;
  options = ['All', 'Yes', 'No'];
  genderControl = new FormControl('All');
  cultureControl = new FormControl();
  isAliveControl = new FormControl('All');

  // House filters
  regionControl = new FormControl();
  wordsControl = new FormControl('All');
  titlesControl = new FormControl('All');
  seatsControl = new FormControl('All');
  diedoutControl = new FormControl('All');
  ancesteralWeaponsControl = new FormControl('All');
  regions$: Observable<string[]>;
  words = ['All'];
  warning = false;
  pageSize = 10;

  constructor(
    private store: Store<AppState>,
    private queryService: QueryService,
    private router: Router
    // private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.cultures$ = this.queryService.getCultures();
    this.regions$ = this.queryService.getRegions();
  }

  onSearch() {
    const resource = this.resourceControl.value;
    const query = '';
    // Books Filters
    const bookFilters: BookFilter = {
      name: query === '' ? null : query,
      fromReleaseDate: this.startDate.value.toISOString().substring(0, 10),
      toReleaseDate: this.endDate.value.toISOString().substring(0, 10),
    };

    const bookQuery: Query = {
      url: 'https://www.anapioficeandfire.com/api/books',
      filters: bookFilters,
      page: 1,
      pageSize: this.pageSize,
      resource: 'books'
    };

    // Characters Filters
    const isAliveValue = this.isAliveControl.value;
    const characterFilter: CharacterFilter = {
      name: query === '' ? null : query,
      gender: this.genderControl.value === 'All' ? null : this.genderControl.value,
      culture: this.cultureControl.value === 'All' ? null : this.cultureControl.value,
      isAlive: isAliveValue === 'Yes' ? true : isAliveValue === 'No' ? false : null,
    };

    const characterQuery: Query = {
      url: 'https://www.anapioficeandfire.com/api/characters',
      filters: characterFilter,
      page: 1,
      pageSize: this.pageSize,
      resource: 'characters'
    };

    // House Filters
    const houseFilter: HouseFilter = {
      name: query === '' ? null : query,
      region: this.regionControl.value === 'All' ? null : this.regionControl.value,
      hasWords: this.wordsControl.value === 'Yes' ? true : this.wordsControl.value === 'No' ? false : null,
      hasTitles: this.titlesControl.value === 'Yes' ? true : this.titlesControl.value === 'No' ? false : null,
      hasSeats: this.seatsControl.value === 'Yes' ? true : this.seatsControl.value === 'No' ? false : null,
      hasDiedOut: this.diedoutControl.value === 'Yes' ? true : this.diedoutControl.value === 'No' ? false : null,
      hasAncestralWeapons: this.ancesteralWeaponsControl.value === 'Yes' ? true
        : this.ancesteralWeaponsControl.value === 'No' ? false : null,
    };
    const houseQuery: Query = {
      url: 'https://www.anapioficeandfire.com/api/houses',
      filters: houseFilter,
      page: 1,
      pageSize: this.pageSize,
      resource: 'houses'
    };

    const queries: Query[] = resource === 'Books' ? [bookQuery]
      : resource === 'Characters' ? [characterQuery] : [houseQuery];
    this.store.dispatch(resourceActions.loadCollection({ queries }));
  }

  toggleFilter() {
    this.filter = !this.filter;
  }

  onFilter() {
    const query = this.queryControl.value;
    if (query.length > 1) {
      this.searchOptions = this.queryService.search(query)
        .pipe(map(data => {
          return data.map(item => ({ text: item.name, url: item.url }));
          // .concat(data.map(item => ({text: item.meta, url: item.url})));
        }));
    }
  }

  onAutocomplete(url) {
    const stack = url.split('/');
    const id = stack.pop();
    const type = stack.pop();
    console.log(url);
    this.router.navigateByUrl(`/detail/${type}/${id}`);
  }
}
