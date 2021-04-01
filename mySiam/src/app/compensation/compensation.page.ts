import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-compensation',
  templateUrl: './compensation.page.html',
  styleUrls: ['./compensation.page.scss'],
})
export class CompensationPage implements OnInit {
  currentStatus: string = "0";
  numberNonJeune: number =0;
  numberRecupere: number=0;
  numberNonJeuneNourrir: number=0;
  test: number=0;
  eventSourceR = [];
  eventSourceJ = [];
  showEditEvent: boolean;
  val = "";
  useriud = ''
  event = {
      id:'',
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false,
      eventColor:""
    };
  constructor(private alertCtrl: AlertController,    private afAuth: AngularFireAuth,
    private auth: AuthService ,   private router: Router,private loadingCtrl: LoadingController,public afDB: AngularFireDatabase
    ) {
   } 

  ngOnInit() {  
    this.loadEvent();


  }
  ionViewWillEnter(){
    this.loadEvent();
  }

  async loadEvent() {
    this.numberNonJeune=0;
  this.numberRecupere=0;
  this.numberNonJeuneNourrir=0;
    this.afAuth.authState.subscribe(data => {
      this.useriud = data.uid;
      if(!this.useriud)
      {
        return
      }
      console.log('Events/' + this.useriud);
        this.afDB.list('Events/' + data.uid).snapshotChanges(['child_added']).subscribe(actions => {
        this.eventSourceJ = [];
        this.eventSourceR = [];
        
        actions.forEach(action => {
          
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
      });
    })

 }
  editEventRecup(eventS) {
    this.auth.editEventRecp(eventS);
    this.showHideFormEditclose();
    this.loadEvent();
  }
  editEventMotif(eventS) {
    this.auth.editEventMotif(eventS);
    this.showHideFormEditclose();
    this.loadEvent();

  }
  supprimerEventR(eventS) {
    this.afDB.list('Events/' + this.useriud).remove(eventS.id);
    this.loadEvent();

  }
  supprimerEventJ(eventS) {
    this.afDB.list('Events/' + this.useriud).remove(eventS.id);
    this.showHideFormEditclose();
    this.ngOnInit();


  }
  showHideFormEditclose() { 
    this.showEditEvent = !this.showEditEvent;
  }
  showHideFormEdit(eventS) { 
    this.showEditEvent = !this.showEditEvent;
    this.event.id = eventS.id;
    this.event.title = eventS.title;
    this.event.startTime =  eventS.startTime;
    this.event.desc = eventS.desc;
  }

  showHidelist1() { 
    this.currentStatus = "1";
  }

  showHidelist2() {
    this.currentStatus = "2";
  }

  showHidelist3() {
    this.currentStatus = "3";
  }

  async showHidelist5() {
    this.numberNonJeuneNourrir =  this.numberNonJeuneNourrir*7;
    const alert = await this.alertCtrl.create({
      header: 'Montant à verser',
      subHeader: "Montant : " + this.numberNonJeuneNourrir*7 + " Euros.",
      buttons: ['OK']
    });
    
    alert.present();
  }
  close() {
    this.currentStatus = "0";
    this.showEditEvent = false;
  }
}
