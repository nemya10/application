// my-modal.page.ts
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {
ModalController,
NavParams
} from '@ionic/angular';

@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.page.html',
  styleUrls: ['./my-modal.page.scss'],
})
export class MyModalPage implements OnInit {

  currentStatus: string = "0";
  modalTitle: string;
  modelId: number;
  event = {
    id:'',
      title: '',
      desc: '',
      startTime: new Date().toDateString(),
      endTime: new Date().toDateString(),
      allDay: true,
      eventColor:""
    };
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    public afDB: AngularFireDatabase
  ) { }

  ngOnInit() {
    console.table(this.navParams);
    this.modelId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

  addEvent(desc) {
    console.log("alooooooooooo" + desc);
    console.log("alooooooooooo" + this.modalTitle);
      this.afDB.list('Events/'+ this.modelId).push({
        title: 'Jour non jeûné',
        startTime:  this.modalTitle,
        endTime:this.modalTitle,
        allDay: true,
        desc: desc,

      });
      this.resetEvent();
      this.closeModal();
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

  showChoixMaladie(){
   this.currentStatus ='1';
  }
  showChoixGrossesse(){
     this.currentStatus ='2';
  }
}
