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
  
  alertHeader: string;
  AuthMessage: string;
  fbErrorMessage: Array<string> = [
    'There is no user record corresponding to this identifier. The user may have been deleted.', //no user found login
    'The password is invalid or the user does not have a password.', //incorrect password login
    'The email address is badly formatted.', //bad email shape login reg
    'The email address is already in use by another account.', //user already exists reg
    'Registration Successful' //user reg worked
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
        this.AuthMessage = "Registration Successful";
        this.alert();
        this.navroute.navigate(['/login']);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
        this.AuthMessage = err.message;
        this.alert();

      });    
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Login Success');
        this.navroute.navigate(['/home']);
        
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
        this.AuthMessage = err.message;
        this.alert();
      });
  }

  logout() {
    this.firebaseAuth
      .signOut();
      console.log("User has logged out");
  }

  alert(){ //setting alert details
    if(this.AuthMessage != null){
      switch(this.AuthMessage){
        case this.fbErrorMessage[0]:
          this.AuthMessage = 'User not found';
          this.alertHeader = 'Login Failed'
          break;
        case this.fbErrorMessage[1]:
          this.AuthMessage = 'Incorrect Password';
          this.alertHeader = 'Login Failed'
          break;
        case this.fbErrorMessage[2]:
          this.AuthMessage = 'Please enter a valid email address';
          this.alertHeader = 'Login Failed'
          break;
        case this.fbErrorMessage[3]:
          this.AuthMessage = 'User already exists'
          this.alertHeader = 'Registration Failed'
          break;
        case this.fbErrorMessage[4]:
          this.AuthMessage = 'Registration Successful'
          this.alertHeader = 'Registration'
          break;
        default:
          this.AuthMessage = 'Credentials Invalid';
          this.alertHeader = 'Authentication Error'
          break;
      }//end switch  
      this.presentAlert();
    }
  }//end alert check

  async presentAlert() { //display alert
    const alert = await this.alertController.create({
      header: this.alertHeader,
      message: this.AuthMessage,
      buttons: ['Ok']
    });

    await alert.present();
  }//end alert
}