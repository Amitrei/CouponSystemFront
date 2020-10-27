import { Coupon } from './../../../models/coupon';
import { GuestService } from './../../../services/guest/guest.service';
import { CouponPreviewService } from './../../../services/coupon-preview/coupon-preview.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'coupon-card',
  templateUrl: './coupon-card.component.html',
  styleUrls: ['./coupon-card.component.scss'],
})
export class CouponCardComponent implements OnInit {
  @Input()
  companyName: string;

  @Input()
  couponTitle: string;

  @Input()
  couponPrice: Number;

  @Input()
  couponDescription: string;

  @Input()
  couponImage: string;

  @Input()
  couponId: number;

  logoSrc: string;

  currentCoupon: Coupon;
  constructor(
    private cardPreviewService: CouponPreviewService,
    private guestService: GuestService
  ) {}

  ngOnInit(): void {
    this.getCoupon();
    this.logoSrc = 'assets/images/' + this.couponImage + '.png';
  }

  onBuyClick() {
    this.cardPreviewService.setCoupon(this.currentCoupon);
    this.cardPreviewService.isOpen = true;
  }

  getCoupon() {
    this.guestService.getCoupon(this.couponId).subscribe(
      (res: Coupon) => (this.currentCoupon = res),
      (error) => console.log(error)
    );
  }
}
