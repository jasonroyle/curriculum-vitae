import { Component } from '@angular/core';

import { TechStackComponent } from './tech-stack/tech-stack.component';

@Component({
  standalone: true,
  imports: [TechStackComponent],
  selector: 'cv-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
