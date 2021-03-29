import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-compensation',
  templateUrl: './compensation.page.html',
  styleUrls: ['./compensation.page.scss'],
})
export class CompensationPage implements OnInit {
  currentStatus: string = "0"
  numberNonJeune: number =0;
  numberRecupere: number=0;
  numberNonJeuneNourrir: number=0;
  constructor(  private auth: AuthService ) {
    this.auth.loadEvent();
   }

  ngOnInit() {
    this.currentStatus = "0";
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
  showHidelist4() {
    this.currentStatus = "4";
    this.numberNonJeune =  this.auth.numberNonJeune;

  }
  showHidelist5() {
    this.numberNonJeuneNourrir =  this.auth.numberNonJeuneNourrir*7;
    this.currentStatus = "5";
  }
  close() {
    this.currentStatus = "0";
  }
}
