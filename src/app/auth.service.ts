import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import{ Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  authState: boolean;
  AuthError: string;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private navroute: Router,
    private alertController: AlertController
    ) {
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
        this.navroute.navigate(['/login']);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
        this.AuthError = err.message;

      });    
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
        this.navroute.navigate(['home']);
        
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
        this.AuthError = err.message;

      });
  }

  logout() {
    this.firebaseAuth
      .signOut();
      console.log("logged out");
  }
}