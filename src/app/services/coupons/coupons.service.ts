import { map } from 'rxjs/operators';
import { Coupon } from './../../models/coupon';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CouponsService {
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}

  getAllCoupons(): Observable<Coupon[]> {
    return this.httpClient
      .get<Coupon[]>(
        'http://localhost:8080/' +
          this.authService.getClientType().toLowerCase() +
          '/coupons'
      )
      .pipe<Coupon[]>(
        map((response) => {
          response.forEach((coupon) => (coupon.idOfCompany = null));
          return response;
        })
      );
  }
}
