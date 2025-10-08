import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CvBlockComponent } from '../../shared/cv-block/cv-block';
import { CvPanelComponent } from '../../shared/cv-panel/cv-panel';
import { ThemeService } from '../../core/theme';
import { perfilText, socialLinks, experience, education, nombre, carrera, trabajo, softSkills } from '../../data/cv-data';
import { SkillsService, Skill } from '../../shared/services/skills.service';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'cv-page',
  standalone: true,
  imports: [CommonModule, FormsModule, CvBlockComponent, CvPanelComponent],
  templateUrl: './cv-page.html',
  styleUrls: ['./cv-page.css']
})
export class CvPage implements OnInit {
  get isLight$() { return this.theme.isLight$; }

  nombre = nombre;
  carrera = carrera;
  trabajo = trabajo;
  perfilText = perfilText;
  socialLinks = socialLinks;
  experience = experience;
  skills: Skill[] = [];
  education = education;
  softSkills = softSkills;

  skillQuery = '';
  private readonly platformId = inject(PLATFORM_ID);

  constructor(private theme: ThemeService, private skillsService: SkillsService) {
    this.theme.applySavedTheme();
    this.skillsService.skills$
      .pipe(takeUntilDestroyed())
      .subscribe((skills) => {
        this.skills = skills;
      });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.skillsService.loadSkills().subscribe({
        error: (error) => {
          console.error('Error loading skills from API', error);
        },
      });
    }
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
