import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { BiographyComponent } from './biography/biography.component';
import { TechStackComponent } from './tech-stack/tech-stack.component';
import { TimelineComponent } from './timeline/timeline.component';

@Component({
  standalone: true,
  imports: [
    BiographyComponent,
    MatCardModule,
    TechStackComponent,
    TimelineComponent,
  ],
  selector: 'cv-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
