import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-hall-details',
  standalone: true,
  imports: [CarouselModule, CommonModule],
  templateUrl: './hall-details.component.html',
  styleUrl: './hall-details.component.scss',
})
export class HallDetailsComponent {
  images: string[];
  constructor() {
    this.images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'];
  }
}
