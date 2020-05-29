import { Injectable } from '@angular/core';
import { of, Observable, throwError, EMPTY, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap, tap, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore/';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    const promise = this.afAuth.signInWithPopup(provider);
    promise.then(cred => {
      const uid = cred.user.uid;
      this.afs.doc(`users/${uid}`).get().pipe(tap(doc => {

        if (!doc.exists) {
          const {displayName, email, phoneNumber, photoURL, refreshToken} = cred.user;
          this.afs.doc<User>(`users/${uid}`).set({uid, displayName, email, phoneNumber, photoUrl: photoURL, refreshToken});
        }
      })).subscribe();
    });
    return from(promise).pipe(map(cred => cred.user));
  }
  
  loginWithEmailAndPassword(email: string, password: string): Observable<firebase.User> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password))
    .pipe(map(cred => cred.user));
  }
  logout() {
    this.afAuth.signOut();
    return of(localStorage.removeItem(environment.uid));
  }
}
