import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cv-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-panel.html',
  styleUrl: './cv-panel.css'   // 👈 IMPORTANTE: enlaza el CSS del componente
})
export class CvPanelComponent implements OnInit {
  @Input() title = '';
  @Input() collapsible = false;
  @Input() storageKey?: string;
  @Input() stripBottom = false;   // agrega clase 'strip-bottom' al header
  @Input() bodyClass = '';        // clase para el <section> contenedor

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