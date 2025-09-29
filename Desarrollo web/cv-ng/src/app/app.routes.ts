import { Routes } from '@angular/router';
import { CvPage } from './pages/cv-page/cv-page';
import { ExperiencePage } from './pages/experience-page/experience-page';
import { SkillsPage } from './pages/skills-page/skills-page';
import { EducationPage } from './pages/education-page/education-page';

export const routes: Routes = [
  { path: '', component: CvPage },       // raíz -> tu CV
  { path: 'experience', component: ExperiencePage }, // página de experiencia ampliada
  { path: 'skills', component: SkillsPage },
  { path: 'education', component: EducationPage },
  { path: '**', redirectTo: '' }         // cualquier otra ruta -> CV
];
