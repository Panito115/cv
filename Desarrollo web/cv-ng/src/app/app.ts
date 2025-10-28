import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { RouterOutlet } from '@angular/router';

import { CvBlockComponent } from './shared/cv-block/cv-block';
import { CvPanelComponent } from './shared/cv-panel/cv-panel';
import { ThemeService } from './core/theme';
import { perfilText, socialLinks, experience, education } from './data/cv-data';
import { SkillsService, Skill } from './shared/services/skills.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, CvBlockComponent, CvPanelComponent],
  templateUrl: './app.html'
})
export class App implements OnInit {
  isLight$!: Observable<boolean>;

  perfilText = perfilText;
  socialLinks = socialLinks;
  experience = experience;
  skills: Skill[] = [];
  education = education;

  skillQuery = '';

  constructor(private theme: ThemeService, private skillsService: SkillsService) {
    this.isLight$ = this.theme.isLight$;
    this.skills = this.skillsService.getSkills();
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
