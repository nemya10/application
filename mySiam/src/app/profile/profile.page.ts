import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
name: string = ""
email: string = ""
val = "";

  constructor(private afAuth: AngularFireAuth,   private router: Router) { 
    this.val = "profile";
    this.afAuth.authState.subscribe(data => {
      console.log(data.uid);
      console.log(data.email);
      this.email=data.email;
    }
    )
  }

  ngOnInit() {
  }
  toProfile() {
    this.val ='profile'
    this.router.navigate(['../profile']);
  }//
  toCalendrier() {
    this.val ='calendrier'
    this.router.navigate(['../calendrier']);
  }//
  toHome() {
    this.val ='compensation'
    this.router.navigate(['../compensation']);
  }//

}
