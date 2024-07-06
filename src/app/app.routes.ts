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
import { BookingComponent } from '../components/booking/booking.component';

import { NotFoundComponent } from '../components/not-found/not-found.component';
import { RegisterComponent } from '../Auth/register/register.component';

import { CarDetailsComponent } from '../components/car/car-details/car-details.component';
import { FavoriteCarComponent } from '../components/favorite-car/favorite-car.component';
import { BookingCarComponent } from '../components/booking-car/booking-car.component';
import { DressDetailsComponent } from '../components/dress/dress-details/dress-details.component';
import { BookingDressComponent } from '../components/booking-dress/booking-dress.component';
import { FavoriteDressComponent } from '../components/favorite-dress/favorite-dress.component';
import { BeautyDetailsComponent } from '../components/beauty-center/beauty-details/beauty-details.component';
import { FavoriteCenterComponent } from '../components/favorite-center/favorite-center.component';
import { BookingCenterComponent } from '../components/booking-center/booking-center.component';
import { PhotographerDetailsComponent } from '../components/photographer/photographer-details/photographer-details.component';
import { FavoritePhotographerComponent } from '../components/favorite-photographer/favorite-photographer.component';
import { BookingPhotographerComponent } from '../components/booking-photographer/booking-photographer.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { FavoritesComponent } from '../components/favorites/favorites.component';
import { FavoriteComponent } from './../components/favorite/favorite.component';
import { AllChatsComponent } from '../chats/all-chats/all-chats.component';
import { ChatComponent } from '../chats/chat/chat.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'hall', component: HallComponent },
  { path: 'hall-details/:id', component: HallDetailsComponent },
  // { path: 'favorite', component: FavoritesComponent },
  {
    path: 'favorites',
    component: FavoritesComponent,
    children: [
      { path: '', component: FavoriteCarComponent },
      { path: 'favorite', component: FavoriteComponent },
      {
        path: 'favorite-photographer',
        component: FavoritePhotographerComponent,
      },
      { path: 'favorite-dress', component: FavoriteDressComponent },
      { path: 'favorite-car', component: FavoriteCarComponent },
      { path: 'favorite-center', component: FavoriteCenterComponent },
      { path: '**', component: NotFoundComponent },
    ],
  },
  { path: 'booking', component: BookingComponent },
  { path: 'photographer', component: PhotographerComponent },
  { path: 'photographer-details/:id', component: PhotographerDetailsComponent },
  { path: 'favorite-photographer', component: FavoritePhotographerComponent },
  { path: 'booking-photographer', component: BookingPhotographerComponent },
  { path: 'dress', component: DressComponent },
  { path: 'Chats', component: AllChatsComponent },
  { path: 'Chat/:id', component: ChatComponent },

  { path: 'dress-details/:id', component: DressDetailsComponent },
  { path: 'booking-dress', component: BookingDressComponent },
  { path: 'favorite-dress', component: FavoriteDressComponent },
  { path: 'car', component: CarComponent },
  { path: 'car-details/:id', component: CarDetailsComponent },
  { path: 'favorite-car', component: FavoriteCarComponent },
  { path: 'booking-car', component: BookingCarComponent },

  { path: 'dress-details/:id', component: DressDetailsComponent },
  { path: 'booking-dress', component: BookingDressComponent },
  { path: 'favorite-dress', component: FavoriteDressComponent },
  { path: 'car', component: CarComponent },
  { path: 'car-details/:id', component: CarDetailsComponent },
  { path: 'favorite-car', component: FavoriteCarComponent },
  { path: 'booking-car', component: BookingCarComponent },

  { path: 'beauty', component: BeautyCenterComponent },
  { path: 'beauty-center-details/:id', component: BeautyDetailsComponent },
  { path: 'favorite-center', component: FavoriteCenterComponent },
  { path: 'booking-center', component: BookingCenterComponent },
  { path: 'Account', component: AccountComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponentComponent },
  { path: 'OwnerRegister', component: OwnerRegisterComponent },
  { path: 'Favourites', component: FavoriteComponent },
  { path: 'Profile', component: ProfileComponent },
  { path: '**', component: NotFoundComponent },
];
