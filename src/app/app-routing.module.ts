import { CourseEnCoursPage } from './courseEnCours/courseEnCours.page';
import { CoursePage } from './course/course.page';
import { ModifProfilPage } from './modifProfil/modifProfil.page';
import { MenuPage } from './menu/menu.page';
import { InscriptionPage } from './inscription/inscription.page';
import { DemarreCoursePage } from './DemarreCourse/demarreCourse.page';
import { ConnexionPage } from './connexion/connexion.page';
import { HomePage } from './home/home.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Bluet } from './bluet/bluet.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'connexion',
   component: ConnexionPage
  },
  {
    path: 'demarre-course',
    component: DemarreCoursePage
  },
  {
    path: 'bluet',
    component: Bluet
  },
  {
    path: 'course-en-cours',
     component: CourseEnCoursPage
  },
  {
    path: 'inscription',
   component: InscriptionPage
  },
  {
    path: 'courses-enregistrees',
     component: CoursePage
  },
  {
    path: 'menu',
    component: MenuPage
  },
  {
    path: 'modification-profil',
     component: ModifProfilPage
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
