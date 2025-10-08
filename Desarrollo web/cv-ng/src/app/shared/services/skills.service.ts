import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

export interface Skill {
  name: string;
  level: number;
}

@Injectable({ providedIn: 'root' })
export class SkillsService {
  private readonly baseUrl = 'http://localhost:3000';
  private readonly levelMap: Record<string, number> = {
    beginner: 3,
    intermediate: 5,
    advanced: 7,
    expert: 9,
  };

  private readonly skillsSubject = new BehaviorSubject<Skill[]>([]);

  skills$: Observable<Skill[]> = this.skillsSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadSkills(): Observable<Skill[]> {
    return this.http
      .get<{ message: string; data: Array<{ id: number; name: string; level: string }> }>(
        `${this.baseUrl}/skills`,
      )
      .pipe(
        map((response) =>
          response.data.map((skill) => ({
            name: skill.name,
            level: this.mapLevel(skill.level),
          })),
        ),
        tap((skills) => this.setSkills(skills)),
      );
  }

  getSkills(): Skill[] {
    return this.skillsSubject.getValue();
  }

  setSkills(skills: Skill[]): void {
    this.skillsSubject.next(skills);
  }

  private mapLevel(level: string): number {
    const normalized = (level || '').toLowerCase();
    return this.levelMap[normalized] ?? 0;
  }
}
