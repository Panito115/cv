import { Routes } from '@angular/router';
import { CvPage } from './pages/cv-page/cv-page';
import { ExperiencePage } from './pages/experience-page/experience-page';
import { SkillsPage } from './pages/skills-page/skills-page';
import { EducationPage } from './pages/education-page/education-page';
import { Laboral } from './pages/experience-page/laboral/laboral';
import { Proyectos } from './pages/experience-page/proyectos/proyectos';

// rutas
export const routes: Routes = [
  { path: '', component: CvPage },       
  { path: 'experience', component: ExperiencePage, //Ruta de experiencias
    children: [
      {path: "laboral", component: Laboral},       // Ruta hija que lleva a /experience/laboral
      {path: "experiencia", component: Proyectos}  // Ruta hija que lleva a /experience/proyetos
    ]
  }, 
  { path: 'habilidades', component: SkillsPage }, // Ruta de habilidades
  { path: 'education', component: EducationPage }, // Ruta de eduación
  { path: '**', redirectTo: '' }         
];
