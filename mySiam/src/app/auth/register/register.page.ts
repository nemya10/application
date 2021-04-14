import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name: string = ""
  pname: string = ""
  email: string = ""
  password: string = ""
  cpassword: string = ""
  passwordMatch: boolean;
  constructor(
    private auth: AuthService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController
  ) { }

  ngOnInit() {
  }
      async register() {
        if (this.email && this.password && this.name) {
          const res = await this.auth.register(this.name,this.email, this.password);
        } else {
          this.toast('please fill the form', 'danger');
        }
      }// end login
      async toast(message,status) {
        const toast =await this.toastr.create({
          message:message,
          position : 'top',
          color: status,
          duration: 2000
        });
        toast.present();
      }// end of toast

checkPassword(){
if(this.password == this.cpassword){
  this.passwordMatch = true ;
}else{
  this.passwordMatch = false ;
}
}



    }







  /*   async register() {
      const { username, password, cpassword } = this
      if(password !== cpassword) {
        this.presentAlert("Error","Passwords don't match")
        return console.error("Passwords don't match")
      }

      try {
        const res = await this.afAuth.createUserWithEmailAndPassword(username + '@aymen.com', password)
        this.presentAlert("Success", "You are registered!")

      } catch(error) {
        console.dir(error)
        this.presentAlert("error", error.message)

      }
    } */
  /*   async presentAlert(title: string, content: string) {
      const alert = await this.alertController.create({
        header: title,
        message: content,
        buttons: ['OK']
      })

      await alert.present()
    } */

