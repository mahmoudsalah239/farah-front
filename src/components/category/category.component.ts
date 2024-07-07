import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HallComponent } from '../hall/hall.component';
import { CarComponent } from '../car/car.component';
import { BeautyCenterComponent } from '../beauty-center/beauty-center.component';

import { PhotographerComponent } from '../photographer/photographer.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [ RouterLink,CommonModule, RouterLinkActive ,HallComponent,CarComponent,BeautyCenterComponent,PhotographerComponent ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  categories = [
    {
      image: 'assets/weddingHall.jpg',
      title: 'القاعات',
      link: '/hall'
    },
    {
      image: 'assets/weddingCar.jpg',
      title: 'السيارات',
      link: '/car'
    },
    {
      image: 'assets/weddingPhotographer.jpeg',
      title: 'المصورين',
      link: '/photographer'
    },
    {
      image: 'assets/beautyCenter.jpg',
      title: 'بيوتي سنتر',
      link: '/beauty'
    },
    {
      image: 'assets/allservices.jpg',
      title: ' الخدمات المفضلة',
      link: '/favorites'
    }
  ];


  
}
