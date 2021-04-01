import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = ""
  password: string = ""
  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }
  register() {
    this.router.navigate(['/register']);
  }// end of register
  forgot() {
    this.router.navigate(['/forgetpass']);
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
  async login() {
    
    if (this.email && this.password) {
      const res = await this.auth.login(this.email, this.password);
    } else {
      this.toast('Please enter your email and password', 'danger');
    }
  }// end login

  async facebookLogin() {
    this.facebookSignIn();
  }
  async googleLogin() {
    this.googleSignIn();
  }
  facebookSignIn() {
    this.auth.signInWithFacebook()
    .then((result: any) => {
      if (result.additionalUserInfo) {
        // to get all the sign in provider's information
        console.log(result.additionalUserInfo.message);
        this.router.navigate(['/home']);

      }
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      // const token = result.credential.accessToken;
      // The signed-in user info is in result.user;
    }).catch((error) => {
      // Handle Errors here.
      console.log(error);
    });
  }
  googleSignIn() {
    this.auth.signInWithGooglePlus()
    .then((result: any) => {
      if (result.additionalUserInfo) {
        // to get all the sign in provider's information
        console.log(result.additionalUserInfo.message);
        this.router.navigate(['/home/compensation']);

      }
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      // const token = result.credential.accessToken;
      // The signed-in user info is in result.user;
    }).catch((error) => {
      // Handle Errors here.
      console.log(error);
    });
  }
}
