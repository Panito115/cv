import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { lola, sexy } from '../../data/cv-data';

@Component({
  selector: 'education-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education-page.html',
  styleUrls: ['./education-page.css']
})
export class EducationPage {
  lola = lola;
  sexy = sexy;
}
