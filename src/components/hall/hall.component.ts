import { Component } from '@angular/core';
import { HallDetailsComponent } from '../hall-details/hall-details.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-hall',
  standalone: true,
  imports: [HallDetailsComponent, RouterLink, RouterLinkActive],
  templateUrl: './hall.component.html',
  styleUrl: './hall.component.scss',
})
export class HallComponent {}
