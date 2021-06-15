import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import {
  BleClient,
  numbersToDataView,
  numberToUUID,
} from '@capacitor-community/bluetooth-le';
import { ToastController } from '@ionic/angular';

const BLE_SERVICE = '00001801-0000-1000-8000-00805f9b34fb';
const BLE_CHARACTERISTIC = "466c1234-f593-11e8-8eb2-f2801f1b9fd1";

@Component({
  selector: 'app-bluet',
  templateUrl: 'bluet.page.html',
  styleUrls: ['bluet.page.scss'],
})
export class Bluet implements OnInit{

  utilisateur=
    {
      nom: 'Brunelle Servat',
      adresse: '13 Rue des Tulipiers, 13080 France',
      description: 'Salut je m\'appelle Brunelle, j\'ai 19ans et j\'aime le sport! Je cours tout les matins et je mange équilibré'
    }
  user: any;
  loaded = false
  devices = [];
  isLoading = false;
  step2 = false;
  deviceIdSelected: any;
  isLoadingg = false;
  displayValue = false;
  readValue;
  writeValue;
  readDisplay = false;
  writeDisplay = false;
  ble: any;
  isConnected =false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private storage: Storage,
    public toastController: ToastController,
  ) {}

  async ngOnInit() {
    const connect = await this.storage.get('currentUser');
    this.ble = await this.storage.get('ble');
    if(this.ble != null) {
      this.isConnected =true;
    }
    else {
      this.isConnected = false
    }
    this.main();
  }

  // Lance un scan BLE sur les appareils à proximité
  async main() {
    await BleClient.initialize();
    await BleClient.requestLEScan(name,
      result => {
        this.devices.push(result)
      },
    );
    setTimeout(async () => {
      await BleClient.stopLEScan();
      this.isLoading = true;
    }, 8000);

  }

  async disconect(id) {
    this.readDisplay = false;
    this.writeDisplay = false;
    await this.storage.remove('ble');
    this.deviceIdSelected = null;
    this.step2 = false
    this.isConnected = false
    await BleClient.stopNotifications(
      id,
      BLE_SERVICE,
      BLE_CHARACTERISTIC,
    );
    await BleClient.disconnect(id);
    console.log('disconnected from device', id);
  }

  // Permet de se connecter à l'ID de l'appareil
  async connect(deviceId, deviceName) {
    this.deviceIdSelected = deviceId;
    this.isLoadingg = true;
    this.readDisplay = false;
    this.writeDisplay = false;
    this.step2 = false
    this.isLoadingg = true;
    await BleClient.connect(deviceId).then(
      async (res) => {
        await this.storage.set('ble', {id: deviceId, name: deviceName})
        this.ble = await this.storage.get('ble');
        if(this.ble != null) {
          this.isConnected =true;
        }
        else {
          this.isConnected = false
        }
        const toast = await this.toastController.create({
          message: 'Bleutooth connecté !',
          duration: 2000,
           color: "success",
           position: "bottom"
    
        });
        toast.present();
      },
      async (error) => {
        const toast = await this.toastController.create({
          message: 'Connexion impossible !',
          duration: 2000,
           color: "danger",
           position: "bottom"
    
        });
        toast.present();
      }
    );
    console.log('connected to device', deviceName);
    this.step2 = true;
    this.isLoadingg = false;
  }


  // Lis la valeur de l'appareil (UUID)
  async read(deviceId) {
    this.readDisplay = true;

    this.readValue = await BleClient.read(
      deviceId,
      BLE_SERVICE,
      BLE_CHARACTERISTIC
    );

    console.log('read values', this.readValue)
  }

   // Écris une valeur à l'appareil (UUID)
  async write(deviceId) {
    this.writeDisplay = true;

    this.writeValue = await BleClient.write(
      deviceId,
      BLE_SERVICE,
      BLE_CHARACTERISTIC,
      numbersToDataView([1, 0]),
    );

    console.log('read values', this.writeValue)
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
