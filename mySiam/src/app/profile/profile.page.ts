import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
name: string = ""
email: string = ""
  constructor(
    private afAuth: AngularFireAuth,
    
  ) { 
    this.afAuth.authState.subscribe(data => {
      console.log(data.uid);
      console.log(data.email);
      this.email=data.email;

    }
    )
  }

  ngOnInit() {
  }
 

}
