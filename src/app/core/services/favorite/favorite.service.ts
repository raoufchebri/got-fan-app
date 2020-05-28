import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take, map } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { Favorite } from '../../models/';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private afs: AngularFirestore) { }

  add(item: Favorite) {
    return this.afs.collection(`favorites`).add(item);
  }

  get(uid: string): Observable<Favorite[]> {
    return this.afs.collection<Favorite>(`favorites`, ref => 
    ref.where('uid', '==', uid)).snapshotChanges()
    .pipe(map(actions => actions.map(action => {
      const data = action.payload.doc.data();
      const id = action.payload.doc.id;
      return { ...data, id } as Favorite;

    })));
  }

  delete(id: string) {
    this.afs.doc(`favorites/${id}`).delete();
  }
}
