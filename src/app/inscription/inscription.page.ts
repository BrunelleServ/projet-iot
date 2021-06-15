import { ToastController } from '@ionic/angular';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-inscription',
  templateUrl: 'inscription.page.html',
  styleUrls: ['inscription.page.scss'],
})
export class InscriptionPage {
  identifiant='';
  adressemail='';
  motdepasse='';
  utilisateur=[];
  id=1;

  constructor(
    private router: Router,
    private auth: AuthService,
    public toastController: ToastController
  ) {}

  goToHome() {
    this.router.navigate(['/home']);

  }

  async goToHomeCourse() {
    let new_user = {
      username: this.identifiant,
      email: this.adressemail,
      password: this.motdepasse,
      adresse: '',
      description: ''
    }

    await this.auth.register(new_user).subscribe(
      (res) => {
        this.validatedToast();
        this.goToConnect();
      },
      (error) => {
        this.errorToast();
      }
    )
  }

  goToConnect(){
    this.router.navigate(['/connexion'])
  }

  async errorToast() {
    const toast = await this.toastController.create({
      message: 'Une erreur est survenue',
      duration: 2000,
       color: "danger",
       position: "bottom"

    });
    toast.present();
  }

  async validatedToast() {
    const toast = await this.toastController.create({
      message: 'Votre compte a bien été créé !',
      duration: 2000,
       color: "success",
       position: "bottom"

    });
    toast.present();
  }
}
