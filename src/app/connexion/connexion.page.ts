import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-connexion',
  templateUrl: 'connexion.page.html',
  styleUrls: ['connexion.page.scss'],
})
export class ConnexionPage implements OnInit {
  utilisateurs=[
    {
      identifiant: 'Brunelle',
      mdp: 'coucou',
      id: 0,
    },
    {
      identifiant: 'Brubru',
      mdp: 'yoo',
      id: 1,
    },
  ];
  users: any;
  identifiant1='';
  mdp1='';
  id1='';
  Data;

  constructor(
    public toastController: ToastController,
    private router: Router,
    private auth: AuthService,
    private storage: Storage
  ) {}

  async ngOnInit() {
    const connect = await this.storage.get('currentUser');

    if(connect) {
      this.router.navigate(['/demarre-course'])
    }
  }

  goToHome() {
    this.router.navigate(['/home']);

  }

  async goToHomeCourse() {
    await this.auth.login(this.identifiant1, this.mdp1).subscribe(
      (res) => {
        this.validatedToast();
        this.router.navigate(['/demarre-course']);
      },
      (error) => [
        this.presentToast()
      ]
    )
  }

  async validatedToast() {
    const toast = await this.toastController.create({
      message: 'Bienvenue, vous êtes maitenant connecté !',
      duration: 2000,
       color: "success",
       position: "bottom"

    });
    toast.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Identifiant ou Mot de passe incorects',
      duration: 2000,
       color: "danger",
       position: "bottom"

    });
    toast.present();
  }

  goToInscription(){
    this.router.navigate(['/inscription'])
  }

}
