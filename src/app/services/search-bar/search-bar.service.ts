import { Coupon } from './../../models/coupon';
import { Injectable, OnInit } from '@angular/core';
import { GuestService } from '../guest/guest.service';

@Injectable({
  providedIn: 'root',
})
export class SearchBarService implements OnInit {
  private allCoupons: Coupon[];
  private searchResults: Coupon[];
  public searchKeywords: string;

  constructor(private guestService: GuestService) {}

  ngOnInit(): void {
    this.getAllCoupons();
  }

  getAllCoupons() {
    this.guestService.getAllCoupons().subscribe((response) => {
      this.allCoupons = response;
    });
  }

  searchCoupons(searchContent: string): Coupon[] {
    this.getAllCoupons();
    this.searchKeywords = searchContent;
    if (!searchContent) {
      this.searchResults = undefined;
      return this.searchResults;
    }

    this.searchResults = this.allCoupons.filter(
      (coupon) =>
        coupon.companyName.toLowerCase().includes(searchContent.toLowerCase()) ||
        coupon.title.toLowerCase().includes(searchContent.toLowerCase())
    );

    return this.searchResults;
  }

  getSearchResults(): Coupon[] {
    return this.searchResults;
  }
}
