import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard'


var firebaseConfig = {
  apiKey: "AIzaSyDTuoIQ3UpKTgAm_9oLqhhpORSoy8zXbQU",
  authDomain: "transit-ionic.firebaseapp.com",
  databaseURL: "https://transit-ionic.firebaseio.com",
  projectId: "transit-ionic",
  storageBucket: "transit-ionic.appspot.com",
  messagingSenderId: "775364800696",
  appId: "1:775364800696:web:a59c231eadd13f0811c44d",
  measurementId: "G-829CB1G00B"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireAuthModule
  ],
  providers: [
    StatusBar,
    AuthService,
    AuthGuard,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
