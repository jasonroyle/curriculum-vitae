import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { TechStackComponent } from './tech-stack/tech-stack.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, TechStackComponent],
    }).compileComponents();
  });
});
