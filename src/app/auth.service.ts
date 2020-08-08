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
  fbErrorMessage: Array<string> = [
    'There is no user record corresponding to this identifier. The user may have been deleted.', //no user found login
    'The password is invalid or the user does not have a password.', //incorrect password login
    'The email address is badly formatted.', //bad email shape login reg
    'The email address is already in use by another account.' //user already exists reg
  ];

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
        this.alert();

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
        this.alert();
      });
  }

  logout() {
    this.firebaseAuth
      .signOut();
      console.log("logged out");
  }

  alert(){
    if(this.AuthError != null){
      switch(this.AuthError){
        case this.fbErrorMessage[0]:
          this.AuthError = 'User not found';
          break;
        case this.fbErrorMessage[1]:
          this.AuthError = 'Incorrect Password';
          break;
        case this.fbErrorMessage[2]:
          this.AuthError = 'Please enter a valid email address';
          break;
        case this.fbErrorMessage[3]:
          this.AuthError = 'User already exists'
          break;
        default:
          this.AuthError = 'Credentials Invalid';
          break;
      }//end switch  
      this.presentAlert();
    }
  }//end alert check

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Auth Failed',
      message: this.AuthError,
      buttons: ['Ok']
    });

    await alert.present();
  }//end alert
}