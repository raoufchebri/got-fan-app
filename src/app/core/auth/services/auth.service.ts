import { Injectable } from '@angular/core';
import { of, Observable, throwError, EMPTY, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap } from 'rxjs/operators';
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
    return from(this.afAuth.signInWithPopup(provider)).pipe(map(cred => cred.user));
  }
  loginWithEmailAndPassword() {
    return from(this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())).pipe(map(cred => cred.user));
  }
  logout() {
    this.afAuth.signOut();
    return of(localStorage.removeItem(environment.uid));
  }
}
