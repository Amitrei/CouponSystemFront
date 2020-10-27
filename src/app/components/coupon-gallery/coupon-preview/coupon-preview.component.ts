import { GuestService } from './../../../services/guest/guest.service';
import { CustomerService } from './../../../services/customer/customer.service';
import { AuthService } from './../../../services/auth/auth.service';
import { Coupon } from './../../../models/coupon';
import { CouponPreviewService } from './../../../services/coupon-preview/coupon-preview.service';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'coupon-preview',
  templateUrl: './coupon-preview.component.html',
  styleUrls: ['./coupon-preview.component.scss'],
})
export class CouponPreviewComponent implements OnInit {
  coupon: Coupon;
  purchaseClicked: boolean;
  imgSrc: string;
  constructor(
    private service: CouponPreviewService,
    private authService: AuthService,
    private customerService: CustomerService,
    private guestService: GuestService
  ) {}

  ngOnInit(): void {
    this.getCoupon();
  }

  @HostListener('document:keyup.esc')
  onkeyup() {
    this.closePreview();
  }

  isPreviewOpen(): boolean {
    return this.service.isOpen;
  }

  getCoupon() {
    this.guestService.getCoupon(this.service.coupon.id).subscribe((response: Coupon) => {
      this.coupon = response;
      this.coupon.company = {
        id: this.coupon.idOfCompany,
      };
    });

    return this.coupon;
  }

  closePreview() {
    this.service.isOpen = false;
    this.purchaseClicked = false;
  }

  getAmount() {
    let amount = this.coupon.amount;
    if (amount <= 0) return 'OUT OF STOCK';
    if (amount < 10) return 'less then 10';
    if (amount > 10) return '10+';

    return this.coupon.amount;
  }

  allowPurchase(): boolean {
    return this.authService.isCustomer() && !this.service.isOwned && this.coupon.amount > 0;
  }

  purchaseCoupon() {
    this.customerService.purchaseCoupon(this.coupon).subscribe((response) => console.log(response));
    this.purchaseClicked = true;
  }

  cannotPurchaseMsg(): string {
    if (!this.authService.isLoggedIn()) return 'Log in to purchase coupon';

    if (this.service.isOwned) return 'Your already own this coupon.';

    if (this.coupon.amount <= 0) return 'Coupon out of stock';

    return 'Only customers allowed to purchase coupons.';
  }
}
