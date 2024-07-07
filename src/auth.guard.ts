import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from './services/login.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);

  if (authService.isLoggedIn) {
    router.navigate(['/home']);
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};

export const preventLoggedInAccessGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);

  if (authService.isLoggedIn) {
    router.navigate(['/home']);
    return false;
  } else {
    router.navigate(['/home']);
    return true;
  }
};
