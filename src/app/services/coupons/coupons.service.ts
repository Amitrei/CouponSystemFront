import { map } from 'rxjs/operators';
import { Coupon } from './../../models/coupon';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CouponsService {
  private baseUrl = environment.baseUrl;

  constructor(private authService: AuthService, private httpClient: HttpClient) {}

  getAllCoupons(): Observable<Coupon[]> {
    return this.httpClient
      .get<Coupon[]>(this.baseUrl + this.authService.getClientType().toLowerCase() + '/coupons')
      .pipe<Coupon[]>(
        map((response) => {
          response.forEach((coupon) => (coupon.idOfCompany = null));
          return response;
        })
      );
  }
}
