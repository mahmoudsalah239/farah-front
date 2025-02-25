// src/app/routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { AccountComponent } from '../Auth/account/account.component';
import { LoginComponent } from '../Auth/login/login.component';
import { OwnerRegisterComponent } from '../Auth/owner-register/owner-register.component';
import { HallComponent } from '../components/hall/hall.component';
import { PhotographerComponent } from '../components/photographer/photographer.component';
import { CarComponent } from '../components/car/car.component';
import { BeautyCenterComponent } from '../components/beauty-center/beauty-center.component';
import { ForgotPasswordComponentComponent } from '../Auth/forgot-password-component/forgot-password-component.component';
import { HallDetailsComponent } from '../components/hall/hall-details/hall-details.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { RegisterComponent } from '../Auth/register/register.component';
import { CarDetailsComponent } from '../components/car/car-details/car-details.component';
import { FavoriteCarComponent } from '../components/favorite-car/favorite-car.component';
import { BeautyDetailsComponent } from '../components/beauty-center/beauty-details/beauty-details.component';
import { FavoriteCenterComponent } from '../components/favorite-center/favorite-center.component';
import { PhotographerDetailsComponent } from '../components/photographer/photographer-details/photographer-details.component';
import { FavoritePhotographerComponent } from '../components/favorite-photographer/favorite-photographer.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { FavoritesComponent } from '../components/favorites/favorites.component';
import { FavoriteComponent } from './../components/favorite/favorite.component';
import { AllChatsComponent } from '../chats/all-chats/all-chats.component';
import { ChatComponent } from '../chats/chat/chat.component';
import { AuthGuard } from '../auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'hall', component: HallComponent },
  { path: 'hall-details/:id', component: HallDetailsComponent },
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

      { path: 'favorite-car', component: FavoriteCarComponent },
      { path: 'favorite-center', component: FavoriteCenterComponent },
      { path: '**', component: NotFoundComponent },
    ],
    canActivate: [AuthGuard],
  },

  { path: 'photographer', component: PhotographerComponent },
  { path: 'photographer-details/:id', component: PhotographerDetailsComponent },
  { path: 'favorite-photographer', component: FavoritePhotographerComponent },

  { path: 'Chats', component: AllChatsComponent, canActivate: [AuthGuard] },
  {
    path: 'Chats/chat/:id',
    component: ChatComponent,
    canActivate: [AuthGuard],
  },

  { path: 'car', component: CarComponent },
  { path: 'car-details/:id', component: CarDetailsComponent },
  {
    path: 'favorite-car',
    component: FavoriteCarComponent,
    canActivate: [AuthGuard],
  },

  { path: 'beauty', component: BeautyCenterComponent },
  { path: 'beauty-center-details/:id', component: BeautyDetailsComponent },
  {
    path: 'favorite-center',
    component: FavoriteCenterComponent,
    canActivate: [AuthGuard],
  },

  { path: 'Account', component: AccountComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'Login', component: LoginComponent },

  { path: 'forgot-password', component: ForgotPasswordComponentComponent },
  { path: 'OwnerRegister', component: OwnerRegisterComponent },
  { path: 'Profile', component: ProfileComponent, canActivate: [AuthGuard] },

  { path: '**', component: NotFoundComponent },
];
