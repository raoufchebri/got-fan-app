import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from 'src/app/app.reducers';
import { Store, select } from '@ngrx/store';
import { loadOne } from 'src/app/core/actions/query.actions';
import { selectItem, selectLoadingStatus } from 'src/app/core/selectors/query.selectors';
import { Observable } from 'rxjs';
import { QueryService } from 'src/app/core/services/query/query.service';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  item$: Observable<any>;
  keys$: Observable<string[]>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
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

}
