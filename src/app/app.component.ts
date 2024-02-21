import { Component } from '@angular/core';

import { TechCloudComponent } from './tech-cloud/tech-cloud.component';

@Component({
  standalone: true,
  imports: [TechCloudComponent],
  selector: 'cv-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
