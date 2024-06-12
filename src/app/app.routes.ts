import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';

import { AccountComponent } from '../Auth/account/account.component';
import { RegisterComponent } from '../Auth/register/register.component';
import { LoginComponent } from '../Auth/login/login.component';
import { OwnerRegisterComponent } from '../Auth/owner-register/owner-register.component';
import { HallComponent } from '../components/hall/hall.component';
import { PhotographerComponent } from '../components/photographer/photographer.component';
import { DressComponent } from '../components/dress/dress.component';
import { CarComponent } from '../components/car/car.component';
import { BeautyCenterComponent } from '../components/beauty-center/beauty-center.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'hall', component: HallComponent },
  { path: 'photographer', component: PhotographerComponent },
  { path: 'dress', component: DressComponent },
  { path: 'car', component: CarComponent },
  { path: 'beauty', component: BeautyCenterComponent },

  { path: 'Account', component: AccountComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'OwnerRegister', component: OwnerRegisterComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
