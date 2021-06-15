import { CourseEnCoursPage } from './courseEnCours/courseEnCours.page';
import { ModalPage } from './modal/modal.page';
import { ModalComPage } from './modalCom/modalCom.page';
import { CoursePage } from './course/course.page';
import { ModifProfilPage } from './modifProfil/modifProfil.page';
import { MenuPage } from './menu/menu.page';
import { InscriptionPage } from './inscription/inscription.page';
import { DemarreCoursePage } from './DemarreCourse/demarreCourse.page';
import { ConnexionPage } from './connexion/connexion.page';
import { HomePage } from './home/home.page';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { GoogleMapsModule } from '@angular/google-maps';
import { BLE } from '@ionic-native/ble/ngx';
import { Bluet } from './bluet/bluet.page';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    ConnexionPage,
    DemarreCoursePage,
    InscriptionPage,
    MenuPage,
    ModifProfilPage,
    CoursePage,
    ModalComPage,
    ModalPage,
    CourseEnCoursPage,
    Bluet
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    GoogleMapsModule
  ],
  providers: [
    BLE,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: LOCALE_ID, useValue: 'fr' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
