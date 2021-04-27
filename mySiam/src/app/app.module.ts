import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';
//Facebook
import { Facebook } from '@ionic-native/facebook/ngx';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// env
import { environment } from '../environments/environment';

//services
import { AuthService } from './services/auth.service';

import {  LOCALE_ID } from '@angular/core';

import { registerLocaleData } from '@angular/common';

import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [
    Facebook,
    AuthService,
    StatusBar,
    SplashScreen,
    {provide: LOCALE_ID, useValue: "fr-CA" },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
