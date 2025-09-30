import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'experience-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './experience-page.html',
  styleUrls: ['./experience-page.css']
})
export class ExperiencePage {}
