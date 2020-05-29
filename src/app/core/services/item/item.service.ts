import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Query } from '../../models/query.model';
import { tap, map } from 'rxjs/operators';
import { Character } from '../../models/character.model';
import { Book } from '../../models/book.model';
import { House } from '../../models/house.model';
import { AngularFirestore } from '@angular/fire/firestore';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class ItemService {
  constructor(private http: HttpClient, private afs: AngularFirestore) { }

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
        response.next(_.concat(response.getValue(), items));
      })).subscribe();
    });
    return response;
  }

  getById(resource: string, id: string) {
    const URL = `https://www.anapioficeandfire.com/api/${resource}/${id}`;
    return this.http.get<Book | Character | House>(URL).pipe(map(item => ({ ...item, resource })));
  }

  getByUrl(url: string) {
    return this.http.get<Book | Character | House>(url)
    .pipe(map(item => ({ ...item })));
  }

  addView(uid: string, url: string) {
    return this.afs.collection(`viewedItems`).add({ uid, url, date: new Date() });
  }

  getRecentlyViewed(uid: string) {
    return this.afs.collection<{ uid, url, date }>(`viewedItems`, ref =>
      ref.where('uid', '==', uid).orderBy('date', 'desc')).valueChanges();
  }

  getMostPopular() {

  }
}
