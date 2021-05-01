import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ModalController } from '@ionic/angular';
import { MyModalPage } from '../modals/my-modal/my-modal.page';
import { CalendarComponent } from 'ionic2-calendar';

@Component({
  selector: 'app-compensation',
  templateUrl: './compensation.page.html',
  styleUrls: ['./compensation.page.scss'],
})
export class CompensationPage implements OnInit {
  dataReturned: any;
  currentStatus: string = "0";
  numberNonJeune: number =0;
  numberRecupere: number=0;
  numberNonJeuneNourrir: number=0;
  test: number=0;
  eventSourceR = [];
  eventSourceJ = [];
  eventSourceJV = [];
  eventSourceV = [];
  nombreJoursJ = 0;
  nombreJoursJV = 0;
  nombreJoursV = 0;
  // eventSourceJ = [];
  yesEvent: boolean;
  todayDate : Date = new Date();

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
    ,public modalController: ModalController) {
   }

  ngOnInit() {
    console.log("heyyy" + this.yesEvent);

    this.yesEvent=false;
    this.loadEvent();


  }
  ionViewWillEnter(){
    this.yesEvent=false;
    this.loadEvent();
    this.currentStatus ='0';
   }

  async loadEvent() {
    this.afAuth.authState.subscribe(data => {
      this.useriud = data.uid;
      console.log('Events/' + this.useriud);
        this.afDB.list('Events/' + data.uid).snapshotChanges(['child_added']).subscribe(actions => {
          this.eventSourceR = [];
          this.eventSourceJ = [];
          this.eventSourceJV = [];
          this.eventSourceV = [];
        this.numberNonJeune=0;
        this.numberRecupere=0;
        this.numberNonJeuneNourrir=0;
        this.nombreJoursJ = 0;
        this.nombreJoursJV = 0;
        this.nombreJoursV = 0;
        actions.forEach(action => {
          const date = new Date(action.payload.exportVal().endTime);
const day = date.getDay();
const month = date.getMonth;
const date1 = new Date().toISOString();
const day1 = date.getDay();
const month1 = date.getMonth;


if( day == day1 && month == month1 && !this.yesEvent ){
  console.log("true laaa");

  this.yesEvent = true ;
}
          if (action.payload.exportVal().title == 'Jour non jeûné') {
            if (action.payload.exportVal().desc == 'Maladie (courte durée)') {
              this.numberNonJeuneNourrir++;
        this.nombreJoursV ++;
              this.eventSourceV.push({
                id: action.key,
                title: action.payload.exportVal().title,
                startTime: action.payload.exportVal().startTime,
                endTime: new Date(action.payload.exportVal().endTime).toISOString,
                desc: action.payload.exportVal().desc,
                allDay: action.payload.exportVal().allDay,
                eventColor: 'red'
              });
            }
            else if (action.payload.exportVal().desc == 'Maladie (longue durée donc irrattrapable)') {
              this.numberNonJeuneNourrir++;
        this.nombreJoursV ++;
              this.eventSourceV.push({
                id: action.key,
                title: action.payload.exportVal().title,
                startTime: action.payload.exportVal().startTime,
                endTime: new Date(action.payload.exportVal().endTime).toISOString,
                desc: action.payload.exportVal().desc,
                allDay: action.payload.exportVal().allDay,
                eventColor: 'red'
              });
            }
            else if (action.payload.exportVal().desc == 'Grossesse') {
              this.numberNonJeune++;
              this.nombreJoursJ ++;
              this.eventSourceJ.push({
                id: action.key,
                title: action.payload.exportVal().title,
                startTime: action.payload.exportVal().startTime,
                endTime: new Date(action.payload.exportVal().endTime).toISOString,
                desc: action.payload.exportVal().desc,
                allDay: action.payload.exportVal().allDay,
                eventColor: 'red'
              });
            }
            else if (action.payload.exportVal().desc == 'Allaitement') {
              this.numberNonJeuneNourrir++;
              this.numberNonJeune++;
        this.nombreJoursJV ++;
              this.eventSourceJV.push({
                id: action.key,
                title: action.payload.exportVal().title,
                startTime: action.payload.exportVal().startTime,
                endTime: new Date(action.payload.exportVal().endTime).toISOString,
                desc: action.payload.exportVal().desc,
                allDay: action.payload.exportVal().allDay,
                eventColor: 'red'
              });
            }
            else if (action.payload.exportVal().desc == 'période de menstrue') {
              this.numberNonJeune++;
              this.nombreJoursJ ++;
              this.eventSourceJ.push({
                id: action.key,
                title: action.payload.exportVal().title,
                startTime: action.payload.exportVal().startTime,
                endTime: new Date(action.payload.exportVal().endTime).toISOString,
                desc: action.payload.exportVal().desc,
                allDay: action.payload.exportVal().allDay,
                eventColor: 'red'
              });
            }
            else if (action.payload.exportVal().desc == 'Voyage') {
              this.numberNonJeune++;
              this.nombreJoursJ ++;
              this.eventSourceJ.push({
                id: action.key,
                title: action.payload.exportVal().title,
                startTime: action.payload.exportVal().startTime,
                endTime: new Date(action.payload.exportVal().endTime).toISOString,
                desc: action.payload.exportVal().desc,
                allDay: action.payload.exportVal().allDay,
                eventColor: 'red'
              });
            }
            //  console.log('numberNonnnnnnn: '+  this.numberNonJeune);
            //  console.log('numberNonNourrrrrrrr: '+  this.numberNonJeuneNourrir);

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
        this.numberNonJeuneNourrir =this.numberNonJeuneNourrir*7;
      });
    })
    console.log("alafin laaa" + this.yesEvent);

 }

async openModal() {

  if(this.yesEvent == true){
    console.log("aloooooggggoo" + this.yesEvent);

    const alert = await this.alertCtrl.create({
      header: 'impossible',
      subHeader: "Jour déja non jeuné ou récupéré ",
      buttons: ['OK']
    });
    alert.present();

    return;
  }
    const modal = await this.modalController.create({
      component: MyModalPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        "paramID": this.useriud,
        "paramTitle": new Date().toISOString()
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }

  editEventRecupV(eventS) {
    if(this.eventSourceV.length != 0 ){
      this.afDB.list('Events/' + this.useriud).update(this.eventSourceV[0].id, {
        title: 'Jour récupéré',
        desc: '',
      });
      this.showHideFormEditclose();
      this.ngOnInit();
          }


  }
  editEventRecupJ(eventS) {
    if(this.eventSourceJ.length != 0 ){
      this.afDB.list('Events/' + this.useriud).update(this.eventSourceJ[0].id, {
        title: 'Jour récupéré',
        desc: '',
      });
      this.showHideFormEditclose();
      this.ngOnInit();
          }
  }
  editEventRecupJV(eventS) {
    if(this.eventSourceJV.length != 0 ){
      this.afDB.list('Events/' + this.useriud).update(this.eventSourceJV[0].id, {
        title: 'Jour récupéré',
        desc: '',
      });
      this.showHideFormEditclose();
      this.ngOnInit();
          }
  }
  editEventMotif(eventS) {
    this.afDB.list('Events/' + this.useriud).update(eventS.id, {
      title: eventS.title,
      desc: eventS.desc,
    });
     this.showHideFormEditclose();
    this.ngOnInit();

  }
  supprimerEventR(eventS) {
    this.afDB.list('Events/' + this.useriud).remove(eventS.id);
    this.ngOnInit();

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
  toCalendrier() {

  this.router.navigate(['/home/calendrier']);
  }
  showHidelist2() {
    this.currentStatus = "2";
  }

  showHidelist3() {
    this.currentStatus = "3";
  }

  async showHidelist5() {
    console.log('whyyyyyyyy' + this.numberNonJeuneNourrir);

    const alert = await this.alertCtrl.create({
      header: 'Montant à verser',
      subHeader: "Montant : " + this.numberNonJeuneNourrir  + " Euros.",
      buttons: ['OK']
    });

    alert.present();
  }
  close() {
    this.currentStatus = "0";
    this.showEditEvent = false;
  }
}
