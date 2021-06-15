import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
ModalController,
NavParams
} from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal-com',
  templateUrl: './modalCom.page.html',
  styleUrls: ['./modalCom.page.scss'],
})
export class ModalComPage implements OnInit {

  commentaire=''
  connect;
  id;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private auth: AuthService,
    private storage: Storage,
    private toastController: ToastController
  ) { }

  async ngOnInit() {
    this.connect = await this.storage.get('currentUser');
  }

  async ionViewDidEnter() {
    this.connect = await this.storage.get('currentUser');
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
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
      message: 'Votre commentaire a bien été posté !',
      duration: 2000,
       color: "success",
       position: "bottom"

    });
    toast.present();
  }



  async valider(){
    let run = {
      date: new Date().toISOString(),
      id_user: this.connect.userId,
      id_run: this.id,
      message: this.commentaire
    }
    await this.auth.createComment(run).subscribe(
      (res) => {
        this.validatedToast();
        this.closeModal();
      },
      (error) => {
        this.errorToast();
      }
    )
  }

}
