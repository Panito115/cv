import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _isLight = new BehaviorSubject<boolean>(false);
  isLight$ = this._isLight.asObservable();

  applySavedTheme() {
    const saved = localStorage.getItem('theme');
    const light = saved === 'light';
    this.setLight(light);
  }

  toggle() {
    this.setLight(!this._isLight.value);
  }

  private setLight(light: boolean) {
    this._isLight.next(light);
    document.body.classList.toggle('light-mode', light);
    localStorage.setItem('theme', light ? 'light' : 'dark');
  }
}
