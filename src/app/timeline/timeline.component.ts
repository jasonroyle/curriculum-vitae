import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

import { ExperienceComponent } from '../experience/experience.component';

@Component({
  selector: 'cv-timeline',
  standalone: true,
  imports: [CommonModule, ExperienceComponent, MatDividerModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
})
export class TimelineComponent {}
