import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { CvBlockComponent } from './shared/cv-block/cv-block';
import { CvPanelComponent } from './shared/cv-panel/cv-panel';
import { ThemeService } from './core/theme';
import { perfilText, socialLinks, experience, skills, education } from './data/cv-data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, CvBlockComponent, CvPanelComponent],
  templateUrl: './app.html'
})
export class App implements OnInit {
  isLight$!: Observable<boolean>;

  perfilText = perfilText;
  socialLinks = socialLinks;
  experience = experience;
  skills = skills;
  education = education;

  skillQuery = '';

  constructor(private theme: ThemeService) {
    this.isLight$ = this.theme.isLight$;
  }

  ngOnInit() {
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
