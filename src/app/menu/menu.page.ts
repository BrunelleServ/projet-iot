import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss'],
})
export class MenuPage implements OnInit{

  utilisateur=
    {
      nom: 'Brunelle Servat',
      adresse: '13 Rue des Tulipiers, 13080 France',
      description: 'Salut je m\'appelle Brunelle, j\'ai 19ans et j\'aime le sport! Je cours tout les matins et je mange équilibré'
    }
  user: any;
  loaded = false


  constructor(
    private router: Router,
    private auth: AuthService,
    private storage: Storage
  ) {}

  async ngOnInit() {
    const connect = await this.storage.get('currentUser');

    this.user = await this.auth.getMe(connect.userId).toPromise();
    console.log(this.user)
    this.loaded = true;
  }


  async ionViewDidEnter() {
    const connect = await this.storage.get('currentUser');

    this.user = await this.auth.getMe(connect.userId).toPromise();
    console.log(this.user)
    this.loaded = true;
  }

  goToHomeCourse() {
    this.router.navigate(['/demarre-course'])
  }

  goToHome() {
   this.auth.logout();
  }

  goToModif() {
    this.router.navigate(['/modification-profil'])
  }

  goToHistoric() {
    this.router.navigate(['/courses-enregistrees']);

  }

}
