import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hall-details',
  standalone: true,
  imports: [CarouselModule, CommonModule],
  templateUrl: './hall-details.component.html',
  styleUrls: ['./hall-details.component.scss'],
})
export class HallDetailsComponent {
  images: string[] = []; 
  hallName: string = ''; 
  price: number = 0; 
  capacity: number = 0; 

  constructor(private route: ActivatedRoute) {
    this.images = ['image1.jpg', 'image2.jpg', 'image3.jpg']; 
    this.hallName = 'قاعة الفخامة'; 
    this.price = 7500.00;
    this.capacity = 300; 
  }
}
