import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Query } from '../../models/query.model';
import * as _ from 'lodash';
import { tap, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class QueryService {
  constructor(private http: HttpClient) { }

  get(queries: Query[]) {

    const response = new BehaviorSubject([]);

    queries.forEach(query => {
      const urlSplit = query.url.split('/');
      const resource = urlSplit.pop();
      let url = query.url + '?' + `page=${query.page}&pageSize=${query.pageSize}&`;
      const props = Object.keys(query.filters);
      props.forEach(prop => {
        const value = query.filters[prop];
        if (value != null) {
          url = url + `${prop}=${value}&`;
        }
      });
      const items$ = this.http.get<any[]>(url).pipe(map(items => {
        return items.map(item => {
          return { ...item, resource };
        });
      }));

      items$.pipe(tap(items => {
        console.log(items);
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
