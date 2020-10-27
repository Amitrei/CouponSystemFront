import { Router, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompanyGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route, state: RouterStateSnapshot) {
    if (
      this.authService.isLoggedIn() &&
      (this.authService.isCompany() || this.authService.isAdmin())
    )
      return true;

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
