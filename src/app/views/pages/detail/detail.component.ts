import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { loadOne } from 'src/app/core/actions/query.actions';
import { selectItem } from 'src/app/core/selectors/query.selectors';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  item$: Observable<any>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit(): void {
    const resource = this.route.snapshot.paramMap.get('type');
    const id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(loadOne({ resource, id }));
    this.item$ = this.store.select(selectItem);
  }

}
