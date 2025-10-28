import { Component, inject, PLATFORM_ID, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CvBlockComponent } from '../../shared/cv-block/cv-block';
import { CvPanelComponent } from '../../shared/cv-panel/cv-panel';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemeService } from '../../core/theme';
import { perfilText, socialLinks, experience, education, nombre, carrera, trabajo, softSkills } from '../../data/cv-data';
import { SkillsService, Skill } from '../../shared/services/skills.service';
import { GithubService, GithubProfile } from '../../shared/services/github.service';
import { WeatherService, WeatherSummary } from '../../shared/services/weather.service';
import { API_CONFIG } from '../../core/config/api.config';

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
  skills: Skill[] = [];
  education = education;
  softSkills = softSkills;

  skillQuery = '';
  githubProfile?: GithubProfile;
  githubError?: string;
  isGithubLoading = true;

  weatherData?: WeatherSummary;
  weatherError?: string;
  isWeatherLoading = true;

  readonly githubUsername = API_CONFIG.githubUser;
  readonly weatherCity = API_CONFIG.weatherCity;
  readonly weatherApiKey = API_CONFIG.weatherApiKey;

  private readonly platformId = inject(PLATFORM_ID);

  constructor(
    private readonly theme: ThemeService,
    private readonly skillsService: SkillsService,
    private readonly githubService: GithubService,
    private readonly weatherService: WeatherService,
  ) {
    this.theme.applySavedTheme();
    this.skillsService.skills$
      .pipe(takeUntilDestroyed())
      .subscribe((skills) => {
        this.skills = skills;
      });

    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.loadSkills();
        this.loadGithubProfile();
        this.loadWeather();
      }
    });
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

  private loadSkills() {
    this.skillsService.loadSkills()
      .pipe(takeUntilDestroyed())
      .subscribe({
        error: (error) => {
          console.error('Error loading skills from API', error);
        },
      });
  }

  private loadGithubProfile() {
    this.isGithubLoading = true;
    this.githubError = undefined;

    this.githubService.getProfile(this.githubUsername)
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (profile) => {
          this.githubProfile = profile;
          this.isGithubLoading = false;
        },
        error: (error) => {
          console.error('Error loading GitHub profile', error);
          this.githubError = 'No fue posible obtener el perfil de GitHub.';
          this.isGithubLoading = false;
        },
      });
  }

  private loadWeather() {
    if (!this.weatherApiKey || this.weatherApiKey === 'REEMPLAZA_CON_TU_API_KEY') {
      this.weatherError = 'Configura tu API key de OpenWeatherMap en cv-ng/src/app/core/config/api.config.ts';
      this.isWeatherLoading = false;
      return;
    }

    this.isWeatherLoading = true;
    this.weatherError = undefined;

    this.weatherService.getCurrentWeather(this.weatherCity, this.weatherApiKey)
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (weather) => {
          this.weatherData = weather;
          this.isWeatherLoading = false;
        },
        error: (error) => {
          console.error('Error loading weather information', error);
          this.weatherError = 'No fue posible obtener el clima actual.';
          this.isWeatherLoading = false;
        },
      });
  }
}
