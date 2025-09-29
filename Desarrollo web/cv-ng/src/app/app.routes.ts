import { Routes } from '@angular/router';
import { CvPage } from './pages/cv-page/cv-page';
import { ExperiencePage } from './pages/experience-page/experience-page';
import { SkillsPage } from './pages/skills-page/skills-page';
import { EducationPage } from './pages/education-page/education-page';
// rutas
export const routes: Routes = [
  { path: '', component: CvPage },       
  { path: 'experience', component: ExperiencePage },  // Ruta de experiencias
  { path: 'habilidades', component: SkillsPage }, // Ruta de habilidades
  { path: 'education', component: EducationPage }, // Ruta de eduación
  { path: '**', redirectTo: '' }         
];
