import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coupon } from 'src/app/models/coupon';

@Injectable({
  providedIn: 'root',
})
export class GuestService {
  constructor(private httpClient: HttpClient) {}

  getAllCoupons(): Observable<Coupon[]> {
    return this.httpClient.get<Coupon[]>('http://localhost:8080/guest/coupons');
  }

  getCoupon(couponID: number): Observable<Coupon> {
    return this.httpClient.get<Coupon>('http://localhost:8080/guest/coupon/' + couponID);
  }

  logout(token: string) {
    return this.httpClient.post('http://localhost:8080/guest/logout/' + token, null);
  }
}
