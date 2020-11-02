import { environment } from './../../../environments/environment';
import { GuestService } from './../guest/guest.service';
import { Router } from '@angular/router';
import { AuthResponse } from './../../models/auth-response';
import { from, Observable } from 'rxjs';
import { AuthRequest } from './../../models/auth-request';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrl;
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private guestService: GuestService
  ) {}

  login(authRequest: AuthRequest): Observable<boolean> {
    return this.httpClient
      .post<boolean>(this.baseUrl + authRequest.type + '/login', authRequest)
      .pipe<boolean>(
        map((response: any) => {
          let result: AuthResponse = response;
          if (result && result.token) {
            localStorage.setItem('token', response.token);
            return true;
          }
          return false;
        })
      );
  }

  logout() {
    if (!this.isAdmin()) {
      this.guestService.logout(localStorage.getItem('token')).subscribe(
        (res) => console.log(res),
        (error) => console.log(error)
      );
    }
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');
    let isExpired = jwtHelper.isTokenExpired(localStorage.getItem('token'));
    if (!token) return false;
    return !isExpired;
  }

  getClientType(): string {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');
    if (token) {
      const clientType = jwtHelper.decodeToken(token).type;
      return clientType;
    }
    return null;
  }

  isAdmin(): boolean {
    return this.getClientType() === 'Administrator';
  }
  isCompany(): boolean {
    return this.getClientType() === 'Company';
  }
  isCustomer(): boolean {
    return this.getClientType() === 'Customer';
  }

  logIt() {
    console.log(this.isAdmin());
  }
}
