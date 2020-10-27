import { AuthService } from './../auth/auth.service';
import { CustomerService } from './../customer/customer.service';
import { Coupon } from './../../models/coupon';
import { GuestService } from './../guest/guest.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CouponPreviewService {
  coupon: Coupon;
  isOwned: boolean;
  imgSrc: string;
  isOpen = false;
  constructor(
    private authService: AuthService,
    private customerService: CustomerService
  ) {}

  setCoupon(coupon: Coupon) {
    this.coupon = coupon;
    this.imgSrc = 'assets/images/' + this.coupon.image + '.png';
    this.isCouponOwned(this.coupon.id);
  }

  isCouponOwned(couponID: number) {
    if (this.authService.isCustomer()) {
      this.customerService
        .isOwned(couponID)
        .subscribe((res: boolean) => (this.isOwned = res));
    }
  }
}
