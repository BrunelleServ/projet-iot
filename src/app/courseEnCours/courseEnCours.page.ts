import { ToastController } from '@ionic/angular';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { IPedometerData, Pedometer } from '@ionic-native/pedometer/ngx';
import {
  BleClient,
  numbersToDataView,
  numberToUUID,
} from '@capacitor-community/bluetooth-le';

const BLE_SERVICE = '00001801-0000-1000-8000-00805f9b34fb';
const BLE_CHARACTERISTIC = "466c1234-f593-11e8-8eb2-f2801f1b9fd1";

@Component({
  selector: 'app-courseEnCours',
  templateUrl: 'courseEnCours.page.html',
  styleUrls: ['courseEnCours.page.scss'],
})
export class CourseEnCoursPage implements OnInit {

  display1 = true;
  display2 = false;
  timeLeft: number = 60;
  interval;
  time = 0
  connect: any;
  course={temps: '', battementsPM: '000', o2L: '00,00', kilometre: '00,00', nombreDP: '0000000'};

  constructor(
    private router: Router,
    private auth: AuthService,
    private storage: Storage,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    this.connect = await this.storage.get('currentUser');

    this.startTimer();

    await BleClient.initialize();
    const ble = await this.storage.get('ble');
    await BleClient.connect(ble.id);

    await BleClient.startNotifications(
      ble.id,
      BLE_SERVICE,
      BLE_CHARACTERISTIC,
      value => {
        this.course.o2L = `${this.parseHeartRate(value)}`
        console.log('current heart rate', this.parseHeartRate(value));
      },
    );
  }

  parseHeartRate(value: DataView): number {
    const flags = value.getUint8(0);
    const rate16Bits = flags & 0x1;
    let rate: number;
    if (rate16Bits > 0) {
      rate = value.getUint16(1, true);
    } else {
      rate = value.getUint8(1);
    }
    return rate;
  }

  async disconect(id) {
    await BleClient.stopNotifications(
      id,
      BLE_SERVICE,
      BLE_CHARACTERISTIC,
    );
    await BleClient.disconnect(id);
    console.log('disconnected from device', id);
  }


  async ionViewDidEnter() {
    this.connect = await this.storage.get('currentUser');
  }



  goToStop() {
    this.display1 = false;
    this.display2 = true;
    this.pauseTimer();
  }

  async goToHomeCourse() {
    this.pauseTimer();
    let run = {
      date: new Date().toISOString(),
      id_user: this.connect.userId,
      metadata: JSON.stringify(this.course),
      liked: null
    }
    await this.auth.createRun(run).subscribe(
      (res) => {
        this.validatedToast();
        this.router.navigate(['/demarre-course']);
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
      message: 'Votre course a bien été enregistrée !',
      duration: 2000,
       color: "success",
       position: "bottom"

    });
    toast.present();
  }


  goToCourse() {
    this.display1 = true;
    this.display2 = false;
    this.startTimer();
  }


  startTimer() {
    console.log("=====>");
    this.interval = setInterval(() => {
      if (this.time === 0) {
        this.time++;
      } else {
        this.time++;
      }
      this.course.temps=this.transform( this.time)
    }, 1000);
  }
  transform(value: number): string {
    var sec_num = value;
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);


  return hours+':'+minutes+':'+seconds;
  }
  pauseTimer() {
    clearInterval(this.interval);
  }
}
