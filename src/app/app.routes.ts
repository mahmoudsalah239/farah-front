import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { HallDetailsComponent } from '../components/hall-details/hall-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'details', component: HallDetailsComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
