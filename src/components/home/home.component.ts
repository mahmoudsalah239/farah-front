import { Component } from '@angular/core';
import { SliderComponent } from '../slider/slider.component';
import { HallComponent } from '../hall/hall.component';
import { HallDetailsComponent } from '../hall-details/hall-details.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, HallComponent, HallDetailsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
