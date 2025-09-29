import { Routes } from '@angular/router';
import { CvPage } from './pages/cv-page/cv-page';

export const routes: Routes = [
  { path: '', component: CvPage },     // raíz -> tu CV
  { path: '**', redirectTo: '' }       // cualquier otra ruta -> CV
];