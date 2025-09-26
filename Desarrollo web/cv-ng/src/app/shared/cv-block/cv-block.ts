import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cv-block',
  standalone: true,
  imports: [CommonModule],
  // 👇 usa el nombre real del archivo que tienes en tu carpeta
  templateUrl: './cv-block.html'
})
export class CvBlockComponent implements OnInit {
  @Input() title = '';
  @Input() collapsible = false;     // ¿Mostrar botón para colapsar?
  @Input() storageKey?: string;     // Clave para recordar estado en localStorage
  @Input() extraClasses = '';       // Clases extra (ej: "block-social")

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
