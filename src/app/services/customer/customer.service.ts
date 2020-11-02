import { Customer } from './../../models/customer';
import { Category } from './../../models/category';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private baseUrl = environment.baseUrl;

  private API_URL = this.baseUrl + 'customer/';
  constructor(private http: HttpClient) {}

  purchaseCoupon(coupon: Coupon) {
    return this.http.post(this.API_URL + 'purchase-coupon', coupon);
  }

  getAllCoupons(): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(this.API_URL + 'coupons');
  }

  getCouponsByCategory(category: Category): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(this.API_URL + 'coupons-by-category/' + category);
  }

  getCouponsByPrice(price: number): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(this.API_URL + 'coupons/' + price);
  }

  getCustomerDetails(): Observable<Customer> {
    return this.http.get<Customer>(this.API_URL + 'details');
  }

  isOwned(couponID: number) {
    return this.http.get(this.API_URL + 'coupons/is-owned/' + couponID);
  }
}
