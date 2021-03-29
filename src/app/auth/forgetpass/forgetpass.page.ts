import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.page.html',
  styleUrls: ['./forgetpass.page.scss'],
})
export class ForgetpassPage implements OnInit {
  email : string ; 
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController
  ) { }

  ngOnInit() {
  }
  async toast(message,status)
  {
    const toast =await this.toastr.create({
      message:message,
      position : 'top',
      color: status,
      duration: 2000
    });
    toast.present();
  }// end of toast

  async resetPassword()
  {
   if(this.email)
   {
    const loading= await this.loadingCtrl.create({
      message: 'En cours..',
      spinner: 'crescent',
      showBackdrop: true
    }
    );
    loading.present();
    this.afAuth.sendPasswordResetEmail(this.email).then(()=> {
      loading.dismiss();
      this.toast('Veuillez vérifier votre boîte de réception!','success')

      this.router.navigate(['/login']);
    }).catch((error)=> {
      if(error.message == "There is no user record corresponding to this identifier. The user may have been deleted."){
        this.toast("Adresse mail incorrect",'danger') ; 
    }
      loading.dismiss();
    })
    }else{
      this.toast('Veuillez Saisir votre adresse e-mail','danger');
    }
  }// end of reset password


}
