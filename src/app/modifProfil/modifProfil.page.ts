import { ToastController } from '@ionic/angular';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-modifProfil',
  templateUrl: 'modifProfil.page.html',
  styleUrls: ['modifProfil.page.scss'],
})
export class ModifProfilPage implements OnInit {
  utilisateur=
    {
      nom: 'Brunelle Servat',
      email: 'brunelle13@hotmail.fr',
      motDePasse: 'brunelle',
      adresse: '13 Rue des Tulipiers, 13080 France',
      description: 'Salut je m\'appelle Brunelle, j\'ai 19ans et j\'aime le sport! Je cours tout les matins et je mange équilibré',
      id: 0
    }
    user: any;
    loaded = false;
    connect: any;

  constructor(
    private router: Router,
    private auth: AuthService,
    private storage: Storage,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    this.connect = await this.storage.get('currentUser');

    this.user = await this.auth.getMe(this.connect.userId).toPromise();
    console.log(this.user)
    this.loaded = true;
  }

  async ionViewDidEnter() {
    this.connect = await this.storage.get('currentUser');

    this.user = await this.auth.getMe(this.connect.userId).toPromise();
    console.log(this.user)
    this.loaded = true;
  }

  goToMenu() {
    this.router.navigate(['/menu'])
  }

  async goToMenuModif() {
    await this.auth.updateByIf(this.user, this.connect.userId).subscribe(
      (res) => {
        this.validatedToast();
        this.router.navigate(['/menu'])
      },
      (error) => {
        this.errorToast();
      }
    )
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
      message: 'Votre profil a bien été modifié !',
      duration: 2000,
       color: "success",
       position: "bottom"

    });
    toast.present();
  }

  goToHomeCourse() {
    this.router.navigate(['/demarre-course'])
  }
}
