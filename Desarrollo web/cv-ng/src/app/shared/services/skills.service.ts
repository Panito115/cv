import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Skill {
  name: string;
  level: number;
}

@Injectable({ providedIn: 'root' })
export class SkillsService {
  private readonly skillsSubject = new BehaviorSubject<Skill[]>([
    { name: 'Python', level: 9 },
    { name: 'JavaScript', level: 5 },
    { name: 'HTML', level: 9 },
    { name: 'CSS', level: 7 }
  ]);

  skills$: Observable<Skill[]> = this.skillsSubject.asObservable();

  getSkills(): Skill[] {
    return this.skillsSubject.getValue();
  }

  setSkills(skills: Skill[]): void {
    this.skillsSubject.next(skills);
  }
}
