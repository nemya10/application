import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
name: string = ""
email: string = ""
val = "";

  constructor(private afAuth: AngularFireAuth, private auth: AuthService,  private router: Router) { 
    this.val = "profile";
    this.afAuth.authState.subscribe(data => {
      console.log(data.uid);
      console.log(data.email);
      this.email=data.email;
    }
    )

console.log(this.auth.getUser());
    
    // this.name=this.auth.getUser().name;
  }

  ngOnInit() {
  }
  toProfile() {
    this.val ='profile'
    this.router.navigate(['../profile']);
  }//
  toCalendrier() {
  
    this.router.navigate(['/home/calendrier']);
    }
 
  toHome() {
    this.val ='compensation'
    this.router.navigate(['../compensation']);
  }//

}
