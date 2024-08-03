import { CanActivateFn, Router } from '@angular/router';
import { UserAccountService } from '../services/user-account.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserAccountService);
  const router = inject(Router);
  if(userService.isAuthenticated()){
    return true;
  }
  router.navigate(['/unauth/login']);
  return false;
};
