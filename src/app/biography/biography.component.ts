import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Photo, PhotosComponent } from '../photos/photos.component';

@Component({
  selector: 'cv-biography',
  standalone: true,
  imports: [CommonModule, PhotosComponent],
  templateUrl: './biography.component.html',
  styleUrl: './biography.component.scss',
})
export class BiographyComponent {
  photos: Photo[] = [
    { name: 'Guitar', img: '/assets/images/guitar.jpg' },
    { name: 'Avatar', img: '/assets/images/avatar.jpg' },
  ];
}
