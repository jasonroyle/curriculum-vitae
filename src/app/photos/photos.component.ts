import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScatterComponent } from '../scatter/scatter.component';
import { StackComponent } from '../stack/stack.component';
import { StackDirective } from '../stack/stack.directive';

export interface Photo {
  name: string;
  img: string;
}

@Component({
  selector: 'cv-photos',
  standalone: true,
  imports: [CommonModule, ScatterComponent, StackComponent, StackDirective],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss',
})
export class PhotosComponent {
  @Input() maxRotation = 0.05;
  @Input() maxX = 100;
  @Input() maxY = 100;
  @Input() photos: Photo[] = [];
  focusedStack?: StackDirective;

  onScatterClick(
    scatterComponent: ScatterComponent,
    stackDirective: StackDirective
  ): void {
    if (this.focusedStack && this.focusedStack !== stackDirective)
      this.focusedStack.zIndex = 0;
    stackDirective.zIndex = 1;
    this.focusedStack = stackDirective;
    scatterComponent.scattered = false;
    setTimeout(() => (scatterComponent.scattered = true));
  }
}
