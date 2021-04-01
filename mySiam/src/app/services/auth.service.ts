import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../model/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
//import { data } from 'jquery';
import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import { AngularFireDatabase } from '@angular/fire/database';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Injectable()

export class AuthService {
  user$: Observable<User>;
  user: User;
  eventSourceR = [];
  eventSourceJ = [];
  numberNonJeune: number = 0;
  numberRecupere: number = 0;
  numberNonJeuneNourrir: number = 0;
  useriud = ''


  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
    public platform: Platform,
    public afDB: AngularFireDatabase ) {


    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )
  }// end of constructor


  async login(email, pass) {
    const loading = await this.loadingCtrl.create({
      message: 'En cours....',
      spinner: 'crescent',
      showBackdrop: true
    });
    loading.present();
    const data = await this.afAuth.signInWithEmailAndPassword(email, pass).then((data) => {
      /*  if (!data.user.emailVerified) {
         loading.dismiss();
         this.toast('Please verified your account', 'danger');
         this.logout();
       } else { */
      loading.dismiss();
      this.toast('Bienvenu chez MySiam', 'success');
      this.router.navigate(['/home']);

      /*  } */
    }).catch((err) => {
      loading.dismiss();
      this.toast(err.message, 'danger');
    })
  }// end of login

  logout() {
    this.router.navigate(['/login']);
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
  getCurrentUser() {
    return this.afAuth.currentUser;
  }
  editEvent(eventS) {
    console.log('id edit ' + eventS.id);
    console.log('title edit ' + eventS.title);
    console.log('desc edit ' + eventS.desc);

    this.afDB.list('Events/' + this.useriud).update(eventS.id, {
      title: eventS.title,
      desc: eventS.desc,

    });
  }
  async toast(message, status) {
    const toast = await this.toastr.create({
      message: message,
      position: 'top',
      color: status,
      duration: 2000
    });
    toast.present();
  }// end of toast
  async register(name, email, password) {
    const loading = await this.loadingCtrl.create({
      message: 'loading..',
      spinner: 'crescent',
      showBackdrop: true
    });
    loading.present();
    this.afAuth.createUserWithEmailAndPassword(email, password).then((data) => {
      this.afs.collection('user').doc(data.user.uid).set({
        'userId': data.user.uid,
        'name': name,
        'email': email,
        'createAt': Date.now()
      });
      data.user.sendEmailVerification();
      loading.dismiss();
      this.toast('Inscription a été effectué avec succès.', 'success');
      this.router.navigate(['/login']);
    }).then(() => {
      loading.dismiss();
    }).catch((error) => {
      loading.dismiss();
      this.toast(error.message, 'danger');
    })


  }
  signInWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    // const scopes = ['user_birthday'];
    console.log("signInWithFacebook");

    return this.socialSignIn(provider.providerId);
  }

  signInWithGooglePlus() {
    const provider = new firebase.auth.GoogleAuthProvider();
    // const scopes = ['user_birthday'];
    console.log("signInWithFacebook");

    return this.socialSignIn(provider.providerId);
  }
  socialSignIn(providerName: string, scopes?: Array<string>): Promise<any> {
    const provider = new firebase.auth.OAuthProvider(providerName);
    console.log("socialSignIn");

    // add any permission scope you need
    if (scopes) {
      console.log("loool");

      scopes.forEach(scope => {
        provider.addScope(scope);
      });
    }
    console.log("lool2");

    if (this.platform.is('desktop')) {
      //  this.afAuth.signInWithPopup(provider);
      //  this.router.navigate(['/home']);
      //  return;
      console.log("desltop");

      return this.afAuth.signInWithPopup(provider);
    } else {
      // web but not desktop, for example mobile PWA
      // this.afAuth.signInWithRedirect(provider);
      // this.router.navigate(['/home']);
      // return ;
      console.log("desltopother");

      return this.afAuth.signInWithRedirect(provider);
    }
  }

  async loadEvent() {
    this.afAuth.authState.subscribe(data => {
      this.useriud = data.uid;
      console.log('Events/' + this.useriud);
      this.afDB.list('Events/' + data.uid).snapshotChanges(['child_added']).subscribe(actions => {
        this.eventSourceJ = [];
        this.eventSourceR = [];
        actions.forEach(action => {
          console.log('action:' + action.payload.exportVal().title);
          console.log('boolean: ' + action.payload.exportVal().title == 'Jour récupéré');
          console.log('direct: ' + action.payload.exportVal().startTime);
          console.log('dat new: ' + new Date(action.payload.exportVal().startTime));
          if (action.payload.exportVal().title == 'Jour non jeûné') {
            if (action.payload.exportVal().desc == 'Maladie (courte durée)') {
              this.numberNonJeuneNourrir++;
            }
            else if (action.payload.exportVal().desc == 'Maladie (longue durée donc irrattrapable)') {
              this.numberNonJeuneNourrir++;
            }
            else if (action.payload.exportVal().desc == 'Grossesse') {
              this.numberNonJeune++;
            }
            else if (action.payload.exportVal().desc == 'Allaitement') {
              this.numberNonJeuneNourrir++;
              this.numberNonJeune++;
            }
            else if (action.payload.exportVal().desc == 'Période de menstrue') {
              this.numberNonJeune++;
            }
            else if (action.payload.exportVal().desc == 'Voyage') {
              this.numberNonJeune++;
            }
            //  console.log('numberNonnnnnnn: '+  this.numberNonJeune);
            //  console.log('numberNonNourrrrrrrr: '+  this.numberNonJeuneNourrir);
            console.log('iddddddddddddd: ' + action.key);

            this.eventSourceJ.push({
              id: action.key,
              title: action.payload.exportVal().title,
              startTime: action.payload.exportVal().startTime,
              endTime: new Date(action.payload.exportVal().endTime).toISOString,
              desc: action.payload.exportVal().desc,
              allDay: action.payload.exportVal().allDay,
              eventColor: 'red'
            });
          } else {
            console.log('idddddddddddddR: ' + action.key);
            this.numberRecupere++;
            this.eventSourceR.push({
              id: action.key,
              title: action.payload.exportVal().title,
              startTime: action.payload.exportVal().startTime,
              endTime: new Date(action.payload.exportVal().endTime),
              desc: action.payload.exportVal().desc,
              allDay: action.payload.exportVal().allDay,
              eventColor: 'green'
            });

          }

        });
        console.log('eventSourceR: ' + this.eventSourceR.keys);
        console.log('eventSourceJ: ' + this.eventSourceJ.keys);

        console.log('numberNonnnnnnn: ' + this.numberNonJeune);
        console.log('numberNonNourrrrrrrr: ' + this.numberNonJeuneNourrir * 7);
        console.log('numberRecup: ' + this.numberRecupere);
      });
    })
    //this.numberNonJeuneNourrir = this.numberNonJeuneNourrir*7;
    //console.log('numberNonNourrrrrrrrfiin: '+  this.numberNonJeuneNourrir);
 }
}
