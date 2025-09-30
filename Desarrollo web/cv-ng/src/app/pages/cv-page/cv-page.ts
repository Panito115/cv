import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CvBlockComponent } from '../../shared/cv-block/cv-block';
import { CvPanelComponent } from '../../shared/cv-panel/cv-panel';
import { ThemeService } from '../../core/theme';
import { perfilText, socialLinks, experience, skills, education, nombre, carrera, trabajo} from '../../data/cv-data';

@Component({
  selector: 'cv-page',
  standalone: true,
  imports: [CommonModule, FormsModule, CvBlockComponent, CvPanelComponent],
  templateUrl: './cv-page.html',
  styleUrls: ['./cv-page.css']
})
export class CvPage {
  get isLight$() { return this.theme.isLight$; }

  nombre = nombre;
  carrera = carrera;
  trabajo = trabajo;
  perfilText = perfilText;
  socialLinks = socialLinks;
  experience = experience;
  skills = skills;
  education = education;

  skillQuery = '';

  constructor(private theme: ThemeService) {
    this.theme.applySavedTheme();
  }

  toggleTheme() { this.theme.toggle(); }

  private normalized(s: string) {
    return (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
  filteredSkills() {
    const q = this.normalized(this.skillQuery);
    return this.skills.filter(s => !q || this.normalized(s.name).includes(q));
  }
  range(n: number) { return Array.from({ length: 10 }, (_, i) => i < n); }
}
