import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private router: Router,
    private storage: Storage
  ) {}

  async ngOnInit() {
    const connect = await this.storage.get('currentUser');

    if(connect) {
      this.router.navigate(['/demarre-course'])
    }
  }


  goToLogin() {
    this.router.navigate(['/connexion'])
  }
  goToInscription() {
    this.router.navigate(['/inscription'])
  }
}
