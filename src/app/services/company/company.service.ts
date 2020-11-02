import { environment } from './../../../environments/environment';
import { Category } from './../../models/category';
import { Coupon } from 'src/app/models/coupon';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private baseUrl = environment.baseUrl;
  private API_ADRESS = this.baseUrl + 'company/';
  constructor(private httpClient: HttpClient) {}

  updateCoupon(coupon: Coupon) {
    return this.httpClient.put(this.API_ADRESS + 'coupons/update', coupon);
  }

  addCoupon(coupon: Coupon) {
    return this.httpClient.post(this.API_ADRESS + 'coupons/add', coupon);
  }

  deleteCoupon(couponId) {
    return this.httpClient.delete(this.API_ADRESS + 'coupons/delete/' + couponId);
  }

  isCouponExistsByTitle(title: String) {
    return this.httpClient.get(this.API_ADRESS + 'coupons/by-title/' + title);
  }
  getAllCoupons() {
    return this.httpClient.get(this.API_ADRESS + 'coupons');
  }

  getAllPurchases() {
    return this.httpClient.get(this.API_ADRESS + 'coupons/total-purchases');
  }
  getCouponsByCategory(category: Category) {
    return this.httpClient.get(this.API_ADRESS + 'coupons/by-category/' + category);
  }

  getCouponsByAmount(amount: number) {
    return this.httpClient.get(this.API_ADRESS + 'coupons/' + amount);
  }

  getCompanyDetails() {
    return this.httpClient.get(this.API_ADRESS + 'company-details');
  }
}
