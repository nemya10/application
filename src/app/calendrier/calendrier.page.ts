import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.page.html',
  styleUrls: ['./calendrier.page.scss'],
})
export class CalendrierPage implements OnInit {
event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false,
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
  private loadingCtrl: LoadingController,
  ) { 
    this.loadEvent();

  }
  ngOnInit() {
    this.resetEvent();
  }
  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false,
      eventColor:""
    };
  }
  showHideForm() {
    this.showAddEvent = !this.showAddEvent;
  }
  showHideFormEdit() {
    this.showEditEvent = !this.showEditEvent;
  }
  
  // Create the right event format and reload source
  /* addEvent() {
    let eventCopy = {
      title: this.event.title,
      startTime:  new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
    }
 
    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;
      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }
    this.eventSource.push(eventCopy);
    this.showHideForm();
    this.toast('ok', 'success');

    this.myCal.loadEvents();
   
    this.resetEvent();

  } */
  addEvent() {
    this.afDB.list('Events/'+ this.useriud).push({
      title: this.event.title,
      startTime:  this.event.startTime,
      endTime: this.event.endTime,
      allDay: this.event.allDay,
      desc: this.event.desc,

    });
    this.showHideForm();
    this.resetEvent();
  }
  // editEvent(eventS) {
  //   this.afDB.list('Events/'+ this.useriud).update(eventS.,{
  //     title: this.event.title,
  //     startTime:  this.event.startTime,
  //     endTime: this.event.endTime,
  //     allDay: this.event.allDay,
  //     desc: this.event.desc,

  //   });
  //   this.showHideFormEdit();
  //   this.resetEvent();
  // }
  async loadEvent() {
    const loading = await this.loadingCtrl.create({
      message: 'Chargement....',
      spinner: 'crescent',
      showBackdrop: true,
      duration: 2000
    });
    loading.present();
    this.numberNonJeune=0;
    this.numberRecupere=0;
    this.numberNonJeuneNourrir=0;
    this.afAuth.authState.subscribe(data => {
this.useriud=data.uid;
console.log('Events/'+ this.useriud);
    this.afDB.list('Events/'+ data.uid).snapshotChanges(['child_added']).subscribe(actions => {
      this.eventSource = [];
      actions.forEach(action => {
        console.log('action:' + action.payload.exportVal().title);
        console.log('boolean: '+ action.payload.exportVal().title == 'Jour récupéré');

        if(action.payload.exportVal().title == 'jour non jeûné'){ 

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
          console.log('numberNon: '+  this.numberNonJeune);
          console.log('numberNonNour: '+  this.numberNonJeuneNourrir);

        this.eventSource.push({
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
    });
  })
this.auth.numberNonJeune=this.numberNonJeune;
this.auth.numberNonJeuneNourrir=this.numberNonJeuneNourrir*7;
this.auth.numberRecupere=this.numberRecupere;
console.log('calendnumberNonnnnnnn: '+  this.auth.numberNonJeune);
      console.log('calendnumberNonNourrrrrrrr: '+  this.auth.numberNonJeuneNourrir*7);
      console.log('calendnumberRecup: '+  this.auth.numberRecupere);

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
 console.log("heyyyyv " + event.title);
 
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