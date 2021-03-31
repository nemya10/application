import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
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
  showEditEvent: boolean;

  event = {
      id:'',
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false,
      eventColor:""
    };
  constructor(private alertCtrl: AlertController,private auth: AuthService ) {
    this.auth.loadEvent();
   }

  ngOnInit() {
    this.currentStatus = "0";
  }
  editEvent(eventS) {
    this.auth.editEvent(eventS)
    this.showHideFormEditclose();
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
    console.log(this.currentStatus);
  }

  showHidelist2() {
    this.currentStatus = "2";
  }

  showHidelist3() {
    this.currentStatus = "3";
  }

  async showHidelist4() {
    this.numberNonJeune =  this.auth.numberNonJeune;
    const alert = await this.alertCtrl.create({
      header: 'Reste à jeûner',
      subHeader: "Jours : " + this.auth.numberNonJeune + " Jours.",
      buttons: ['OK']
    });
    alert.present();
  }

  async showHidelist5() {
    this.numberNonJeuneNourrir =  this.auth.numberNonJeuneNourrir*7;
    const alert = await this.alertCtrl.create({
      header: 'Montant à verser',
      subHeader: "Montant : " + this.auth.numberNonJeuneNourrir*7 + " Euros.",
      buttons: ['OK']
    });
    alert.present();
  }

  close() {
    this.currentStatus = "0";
  }
}
