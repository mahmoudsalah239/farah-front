import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HallComponent } from '../hall/hall.component';
import { CarComponent } from '../car/car.component';
import { BeautyCenterComponent } from '../beauty-center/beauty-center.component';
import { DressComponent } from '../dress/dress.component';
import { PhotographerComponent } from '../photographer/photographer.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive ,HallComponent,CarComponent,BeautyCenterComponent,DressComponent,PhotographerComponent ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {



  
}
