import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  lola as experienceLaborTitle,
  sexy as experienceLaborDescription,
  proyectosTitle as projectsTitle,
  proyectosDescription as projectsDescription
} from '../../data/cv-data';

@Component({
  selector: 'experience-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './experience-page.html',
  styleUrls: ['./experience-page.css']
})
export class ExperiencePage {
  lola = experienceLaborTitle;
  sexy = experienceLaborDescription;
  proyectosTitle = projectsTitle;
  proyectosDescription = projectsDescription;
}
