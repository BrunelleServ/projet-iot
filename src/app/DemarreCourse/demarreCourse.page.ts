import { Router } from '@angular/router';
import { Component, NgZone, ViewChild, OnInit } from '@angular/core';
import { ActionSheetController, Platform, AlertController, ToastController } from '@ionic/angular';
import {MapInfoWindow, MapMarker} from '@angular/google-maps';
import {
  BleClient,
  numbersToDataView,
  numberToUUID,
} from '@capacitor-community/bluetooth-le';
import { Storage } from '@ionic/storage-angular';

const BLE_SERVICE = numberToUUID(0x180f);
const BLE_CHARACTERISTIC = numberToUUID(0x2a19);


@Component({
  selector: 'app-demarreCourse',
  templateUrl: 'demarreCourse.page.html',
  styleUrls: ['demarreCourse.page.scss'],
})
export class DemarreCoursePage implements OnInit{

  @ViewChild(MapInfoWindow, {static: false}) infoWindow: MapInfoWindow;
  center = {lat: 43.1167, lng: 5.9333};
  markerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
  zoom = 15;
  display?: google.maps.LatLngLiteral;
  statusMessage: string;
  public bluetooth_enabled: boolean;
  public bluetooth_connected: boolean;
  devices: any[] = [];
  isLoaded = false;
  ble;
  constructor(
    private router: Router,
    public alertController: AlertController,
    public actionCtrl: ActionSheetController,
    private platform: Platform,
    private storage: Storage,
    private ngZone: NgZone,
    private toastController: ToastController
  ) {

    
    // console.log(this.platform.platforms)
    // this.platform.ready().then((readySource) => {

    //   console.log('Platform ready from', readySource);

    //   this.bluetoothle.initialize().subscribe(ble => {
    //     console.log('ble', ble.status) // logs 'enabled'
    //   });

    //  });
  }
  
  async ngOnInit() {
    this.storage.get('ble').then(
      (res) => {
        this.ble = res
        this.isLoaded = true;
      }
    );


  }

  ionViewDidEnter() {
    this.storage.get('ble').then(
      (res) => {
        console.log('hiuh ' + res)
        this.ble = res
      }
    );
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

  startScan() {
    this.router.navigate(['/bluet']);
  }
  // setStatus(message: string) {
  //   console.log("message: " + message);
  //   this.ngZone.run(() => {
  //     this.statusMessage = message;
  //   });
  // }

  // startScan() {
  //   let params = {
  //     "services": [
  //       "180D",
  //       "180F"
  //     ],
  //     "allowDuplicates": true,
  //   }
  //   this.bluetoothle.startScan(params).subscribe((success) => {
  //     console.log("startScan: " + success);
  //     this.setStatus(success.address);
  //   }, (error) => {
  //     console.log("error: " + error);
  //     this.scanError(error);
  //   })
  // }

    // If location permission is denied, you'll end up here
    // async scanError(error: string) {
    //   this.setStatus('Error ' + error);
    //   const toast = await this.toastController.create({
    //     message: 'Error scanning for Bluetooth low energy devices',
    //     position: 'middle',
    //     duration: 5000
    //   });
    //   toast.present();
    // }

  goToCourse() {
    this.router.navigate(['/course-en-cours'])
  }

  goToMenu() {
    this.router.navigate(['/menu'])
  }

  goToHistoric() {
    this.router.navigate(['/courses-enregistrees']);

  }


  addMarker(event: google.maps.MouseEvent) {
    this.markerPositions.push(event.latLng.toJSON());
  }

  move(event: google.maps.MouseEvent) {
    this.display = event.latLng.toJSON();
  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }

  removeLastMarker() {
    this.markerPositions.pop();
  }



}
