import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cv-panel',
  standalone: true,
  imports: [CommonModule],
  // 👇 usa el nombre real del archivo que tienes en tu carpeta
  templateUrl: './cv-panel.html'
})
export class CvPanelComponent implements OnInit {
  @Input() title = '';
  @Input() collapsible = false;
  @Input() storageKey?: string;
  @Input() stripBottom = false;   // Variante con .strip-bottom
  @Input() bodyClass = '';        // Clase para el <section> (ej: "experience", "skills")

  collapsed = false;

  ngOnInit() {
    if (this.collapsible && this.storageKey) {
      this.collapsed = localStorage.getItem(this.storageKey) === 'true';
    }
  }

  toggle() {
    if (!this.collapsible) return;
    this.collapsed = !this.collapsed;
    if (this.storageKey) {
      localStorage.setItem(this.storageKey, this.collapsed ? 'true' : 'false');
    }
  }
}
