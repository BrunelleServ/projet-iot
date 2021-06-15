import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
ModalController,
NavParams
} from '@ionic/angular';

@Component({
  selector: 'app-my-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  comments;
  courses;
  loaded = false;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private auth: AuthService
  ) { }

  async ngOnInit() {
    if (typeof this.courses.metadata === 'string' || this.courses.metadata instanceof String) {
      this.courses.metadata = JSON.parse(this.courses.metadata);
    }

    this.comments = await this.auth.getCommentId(this.courses.id).toPromise();
    this.loaded = true;

    console.table(this.courses.metadata);


  }


  async ionViewDidEnter() {
    if (typeof this.courses.metadata === 'string' || this.courses.metadata instanceof String) {
      this.courses.metadata = JSON.parse(this.courses.metadata);
    }
    this.comments = await this.auth.getCommentId(this.courses.id).toPromise();
    this.loaded = true;

    console.table(this.courses.metadata);
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

}
