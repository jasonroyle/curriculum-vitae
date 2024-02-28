import { Component } from '@angular/core';

import { TechStackComponent } from './tech-stack/tech-stack.component';
import { TimelineComponent } from './timeline/timeline.component';

@Component({
  standalone: true,
  imports: [TechStackComponent, TimelineComponent],
  selector: 'cv-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
