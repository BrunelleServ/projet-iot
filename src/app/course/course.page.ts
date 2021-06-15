import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { ModalComPage } from './../modalCom/modalCom.page';
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-course',
  templateUrl: 'course.page.html',
  styleUrls: ['course.page.scss'],
})
export class CoursePage implements OnInit {
  dataReturned: any;
  dataReturned2: any;
  connect;
  courses = [{date: '22/04/21', temps: '15:00', kilometre: '4,01', battementsPM: '160', o2l: '', nombreDP: '5800', commentaires: ['1er commentaire', '2e commentaire', '3e commentaire', '4e commentaire', '5e commentaire', '6e commentaire', '7e commentaire', '8e commentaire',], poucebool: true, id: 4
  },
  {
    date: '20/04/21', temps: '10:00', kilometre: '3,03', battementsPM: '160', o2l: '', nombreDP: '5000', commentaires: ['1er commentaire', '2e commentaire', '3e commentaire', '4e commentaire', '5e commentaire', '6e commentaire', '7e commentaire', '8e commentaire',], poucebool: true, id: 3
  },
  {
    date: '18/04/21', temps: '05:00', kilometre: '1,50', battementsPM: '165', o2l: '', nombreDP: '3000', commentaires: ['1er commentaire', '2e commentaire', '3e commentaire', '4e commentaire', '5e commentaire', '6e commentaire', '7e commentaire', '8e commentaire',], poucebool: true, id: 2
  },
  {
    date: '16/04/21', temps: '07:00', kilometre: '1,50', battementsPM: '170', o2l: '', nombreDP: '4000', commentaires: ['1er commentaire', '2e commentaire', '3e commentaire', '4e commentaire', '5e commentaire', '6e commentaire', '7e commentaire', '8e commentaire',], poucebool: false, id: 1
  },
  {
    date: '14/04/21', temps: '09:00', kilometre: '2,50', battementsPM: '180', o2l: '', nombreDP: '4500', commentaires: ['1er commentaire', '2e commentaire', '3e commentaire', '4e commentaire', '5e commentaire', '6e commentaire', '7e commentaire', '8e commentaire',], poucebool: false, id: 0
  }];

  runs;
  loaded = false;

  constructor(
    public modalController: ModalController,
    private router: Router,
    private auth: AuthService,
    private storage: Storage,
    private toastController: ToastController
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
  };
  }

  async ngOnInit() {
    this.connect = await this.storage.get('currentUser');
    this.runs = await this.auth.getMyRun(this.connect.userId).toPromise();

    console.log('oui')
    this.loaded = true;
  }

  async ionViewDidEnter() {
    this.connect = await this.storage.get('currentUser');
    this.runs = await this.auth.getMyRun(this.connect.userId).toPromise();

    console.log('oui')
    this.loaded = true;
  }

  async openModal(run) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        courses: run
      }
    });
  return await modal.present();
  }

  async liker(id, i) {
    await this.auth.liker(id).subscribe(
      async (res) => {
        this.validatedToast();
        this.runs[i].liked = null
      },
      (error) => {
        this.errorToast();
      }
    )
  }


  async unliker(id, i) {
    await this.auth.unliker(id).subscribe(
      (res) => {
        this.validatedToast2();
        this.runs[i].liked = 1;
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
      message: 'Vous avez aimé cette course !',
      duration: 2000,
       color: "success",
       position: "bottom"

    });
    toast.present();
  }

  async validatedToast2() {
    const toast = await this.toastController.create({
      message: 'Votre n\'aimez plus cette course !',
      duration: 2000,
       color: "warning",
       position: "bottom"

    });
    toast.present();
  }



  async openModalCom(id) {
    const modalCom = await this.modalController.create({
      component: ModalComPage,
      componentProps: {
        id: id
      }
    });
    return await modalCom.present();
  }

  goToHomeCourse() {
    this.router.navigate(['/demarre-course'])
  }

  // changePouce(id){
  //   for(let i=0; i < this.courses.length; i++) {
  //     if (this.courses[i].id==id){
  //       if (this.courses[i].poucebool= true){
  //         this.courses[i].poucebool= false
  //       }
  //       else(this.courses[i].poucebool=false)
  //       this.courses[i].poucebool=true
  //     }
  //   }
  // }
}
