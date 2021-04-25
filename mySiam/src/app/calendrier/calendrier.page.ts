import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MyModalPage } from '../modals/my-modal/my-modal.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.page.html',
  styleUrls: ['./calendrier.page.scss'],
})
export class CalendrierPage implements OnInit {
dataReturned: any;
event = {
  id:'',
    title: '',
    desc: '',
    startTime: new Date().toDateString(),
    endTime: new Date().toDateString(),
    allDay: true,
    eventColor:""
  };
  eventS = {
    id:'',
      title: '',
      desc: '',
      startTime: new Date().toDateString(),
      endTime: new Date().toDateString(),
      allDay: true,
      eventColor:""
    };
  useriud=''
  numberNonJeune: number;
  numberRecupere: number;
  numberNonJeuneNourrir: number;

  eventSource = [];
  viewTitle;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
  showAddEvent: boolean;
  showEditEvent: boolean;

  showAddEv: boolean;

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string,
  private toastr: ToastController,
  public afDB: AngularFireDatabase,
  private afAuth: AngularFireAuth,
  private auth: AuthService,
  private loadingCtrl: LoadingController
  ,   private router: Router ,public modalController: ModalController
  ) {
  }
  ngOnInit() {
    this.loadEvent();
    this.resetEvent();
  }
  ionViewWillEnter(){
    this.loadEvent();
  }

  async openModal() {
      const modal = await this.modalController.create({
        component: MyModalPage,
        cssClass: 'my-custom-modal-css',
        componentProps: {
          "paramID": 123,
          "paramTitle": "Test Title"
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

  resetEvent() {
    this.event = {
      id:'',
      title: '',
      desc: '',
      startTime: new Date().toDateString(),
      endTime: new Date().toDateString(),
      allDay: true,
      eventColor:""
    };
  }
  showHideForm() {
    this.showAddEvent = !this.showAddEvent;

  }

  addEvent() {
    if (this.event.desc) {
      this.afDB.list('Events/'+ this.useriud).push({
        title: 'Jour non jeûné',
        startTime:  this.event.startTime,
        endTime: this.event.endTime,
        allDay: this.event.allDay,
        desc: this.event.desc,

      });
      this.showHideForm();
      this.resetEvent();
        } else {
      this.toast('Le champ motif est vide', 'danger');
    }

  }
  async loadEvent() {
    const loading = await this.loadingCtrl.create({
      message: 'Chargement....',
      spinner: 'crescent',
      showBackdrop: true,
      duration: 2000
    });
    loading.present();
    // this.numberNonJeune=0;
    // this.numberRecupere=0;
    // this.numberNonJeuneNourrir=0;
    this.afAuth.authState.subscribe(data => {
this.useriud=data.uid;
console.log('Events/'+ this.useriud);
    this.afDB.list('Events/'+ data.uid).snapshotChanges(['child_added']).subscribe(actions => {
      this.eventSource = [];
      actions.forEach(action => {
        console.log('action:' + action.payload.exportVal().title);
        console.log('boolean: '+ action.payload.exportVal().title == 'Jour récupéré');
        console.log('idd1: '+ action.key);
        console.log('idd2: '+ action.payload.exportVal().key);
        console.log('direct: '+  action.payload.exportVal().startTime);
        console.log('dat new: '+  new Date(action.payload.exportVal().startTime));
        if(action.payload.exportVal().title == 'Jour non jeûné'){

         if(action.payload.exportVal().desc == 'Maladie (courte durée)'){
          this.numberNonJeuneNourrir ++ ;
         }
         else if(action.payload.exportVal().desc == 'Maladie (longue durée donc irrattrapable)'){
          this.numberNonJeuneNourrir ++ ;
         }
         else if(action.payload.exportVal().desc == 'Grossesse'){
          this.numberNonJeune ++ ;
         }
         else if(action.payload.exportVal().desc == 'Allaitement'){
          this.numberNonJeuneNourrir ++ ;
          this.numberNonJeune ++ ;
         }
         else if(action.payload.exportVal().desc == 'période de menstrue'){
          this.numberNonJeune ++ ;
         }
         else if(action.payload.exportVal().desc == 'Voyage'){
          this.numberNonJeune ++ ;
         }


        this.eventSource.push({
          id: action.key,
          title: action.payload.exportVal().title,
          startTime:  new Date(action.payload.exportVal().startTime),
          endTime: new Date(action.payload.exportVal().endTime),
          desc: action.payload.exportVal().desc,
          allDay: action.payload.exportVal().allDay,
          eventColor: 'red'
        });
      }else{
        this.numberRecupere ++ ;
        console.log('numberRecup: '+  this.numberRecupere);
          this.eventSource.push({
            id: action.key,
            title: action.payload.exportVal().title,
            startTime:  new Date(action.payload.exportVal().startTime),
            endTime: new Date(action.payload.exportVal().endTime),
            desc: action.payload.exportVal().desc,
            allDay: action.payload.exportVal().allDay,
            eventColor: 'green'
          });

        }
        this.myCal.loadEvents();
        loading.dismiss();

      });
//       this.auth.numberNonJeune=this.numberNonJeune;
// this.auth.numberNonJeuneNourrir=this.numberNonJeuneNourrir*7;
// this.auth.numberRecupere=this.numberRecupere;
console.log('calendnumberNonnnnnnnCALEND: '+  this.numberNonJeune);
      console.log('calendnumberNonNourrrrrrrrCALEND: '+  this.numberNonJeuneNourrir*7);
      console.log('calendnumberRecup:CALEND '+  this.numberRecupere);
    });
  })


  }
 // Change current month/week/day
 next() {
  var swiper = document.querySelector('.swiper-container')['swiper'];
  swiper.slideNext();
}

back() {
  var swiper = document.querySelector('.swiper-container')['swiper'];
  swiper.slidePrev();
}
// Change between month/week/day
changeMode(mode) {
  this.calendar.mode = mode;
}
// Focus today
today() {
  this.calendar.currentDate = new Date();
}
// Selected date reange and hence title changed
onViewTitleChanged(title) {
  this.viewTitle = title;
}
// Calendar event was clicked
async onEventSelected(event) {
  // Use Angular date pipe for conversion
 this.eventS = {
  id:'',
  title: event.title,
  desc: event.desc,
  startTime: event.titstartTimele,
  endTime: event.endTime,
  allDay: true,
  eventColor:event.eventColor
};
console.log("heyyyyv " + this.eventS.title);

  const alert = await this.alertCtrl.create({
    header: event.title,
    subHeader: "motif : " + event.desc,
    buttons: ['OK']
  });
  alert.present();
}

// Time slot was clicked
onTimeSelected(ev) {
  let selected = new Date(ev.selectedTime);
  this.event.startTime = selected.toISOString();
  selected.setHours(selected.getHours() + 1);
  this.event.endTime = (selected.toISOString());
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

}
