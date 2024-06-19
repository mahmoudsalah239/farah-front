import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { AccountComponent } from '../Auth/account/account.component';

import { LoginComponent } from '../Auth/login/login.component';
import { OwnerRegisterComponent } from '../Auth/owner-register/owner-register.component';
import { HallComponent } from '../components/hall/hall.component';
import { PhotographerComponent } from '../components/photographer/photographer.component';
import { DressComponent } from '../components/dress/dress.component';
import { CarComponent } from '../components/car/car.component';
import { BeautyCenterComponent } from '../components/beauty-center/beauty-center.component';
import { ForgotPasswordComponentComponent } from '../Auth/forgot-password-component/forgot-password-component.component';
import { HallDetailsComponent } from '../components/hall/hall-details/hall-details.component';
import { FavoriteComponent } from '../components/favorite/favorite.component';
import { BookingComponent } from '../components/booking/booking.component';

import { NotFoundComponent } from '../components/not-found/not-found.component';
import { RegisterComponent } from '../Auth/register/register.component';

import { CarDetailsComponent } from '../components/car/car-details/car-details.component';
import { FavoriteCarComponent } from '../components/favorite-car/favorite-car.component';
import { BookingCarComponent } from '../components/booking-car/booking-car.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'hall', component: HallComponent },
  { path: 'hall-details/:id', component: HallDetailsComponent },
  { path: 'favorite', component: FavoriteComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'photographer', component: PhotographerComponent },
  { path: 'dress', component: DressComponent },
  { path: 'car', component: CarComponent },
  {path:'car-details/:id',component:CarDetailsComponent},
  {path:'favorite-car',component:FavoriteCarComponent},
  {path:'booking-car',component:BookingCarComponent},
  { path: 'beauty', component: BeautyCenterComponent },
  { path: 'Account', component: AccountComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponentComponent },
  { path: 'OwnerRegister', component: OwnerRegisterComponent },
  { path: '**', component: NotFoundComponent },
];
