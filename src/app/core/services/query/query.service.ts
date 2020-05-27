import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Query } from '../../models/query.model';
import * as _ from 'lodash';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class QueryService {
  constructor(private http: HttpClient) { }

  get(queries: Query[]) {

    const response = new BehaviorSubject([]);

    queries.forEach(query => {
      let url = query.url + '?' + `page=${query.page}&pageSize=${query.pageSize}&`;
      const props = Object.keys(query.filters);
      props.forEach(prop => {
        const value = query.filters[prop];
        if (value != null) {
          url = url + `${prop}=${value}&`;
        }
      });
      this.http.get(url).pipe(tap(items => {
        response.next(_.concat(response.getValue(), items));
      })).subscribe();
    });
    return response;
  }

  getById(resource: string, id: string) {
    const URL = `https://www.anapioficeandfire.com/api/${resource}/${id}`;
    console.log(URL);
    return this.http.get(URL);
  }
}
