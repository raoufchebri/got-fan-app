import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private afs: AngularFirestore) { }

  search(query: string) {
    const queryToLowerCase = query.toLowerCase();
    const names$: Observable<any[]> = this.afs.collection(`items`
      , ref => ref.where('name', '>=', queryToLowerCase).where('name', '<=', queryToLowerCase + '\uf8ff')
    ).valueChanges();
    const meta$: Observable<any[]> = this.afs.collection(`items`
      , ref => ref.where('meta', '>=', queryToLowerCase).where('meta', '<=', queryToLowerCase + '\uf8ff')
    ).valueChanges();
    // tslint:disable-next-line: deprecation
    return combineLatest(names$, meta$, (names, meta) => names.concat(meta))
  }

  getCultures() {
    return this.afs.collection<{ name: string }>(`cultures`, ref =>
      ref.orderBy('name')).valueChanges()
      .pipe(map(cultures => cultures.map(culture => culture.name)));
  }
  getRegions() {
    return this.afs.collection<{ name: string }>(`regions`, ref =>
      ref.orderBy('name')).valueChanges()
      .pipe(map(cultures => cultures.map(culture => culture.name)));
  }
}
