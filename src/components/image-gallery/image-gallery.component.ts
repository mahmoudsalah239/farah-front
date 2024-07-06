import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-gallery.component.html',
  styleUrl: './image-gallery.component.scss'
})
export class ImageGalleryComponent {
  images = [
    { url: '../../assets/1.jpg', alt: 'Image 1' },
    { url: '../../assets/2.jpg', alt: 'Image 1' },
    { url: '../../assets/3.jpg', alt: 'Image 1' },
    { url: '../../assets/4.jpg', alt: 'Image 1' },
    { url: '../../assets/5.jpg', alt: 'Image 1' },
    { url: '../../assets/6.jpg', alt: 'Image 1' },
    { url: '../../assets/1.jpg', alt: 'Image 1' },
    { url: '../../assets/2.jpg', alt: 'Image 1' },
    { url: '../../assets/3.jpg', alt: 'Image 1' },
    { url: '../../assets/3.jpg', alt: 'Image 1' },
  ];

}
