import { FilterService } from './../../../services/filter/filter.service';
import { SearchBarService } from './../../../services/search-bar/search-bar.service';
import { Coupon } from './../../../models/coupon';
import { GuestService } from './../../../services/guest/guest.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'coupons-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  allCoupons: Coupon[];
  hotTrends: Coupon[];
  // ngIf flag
  filterOn: boolean;

  constructor(
    private guestService: GuestService,
    private searchBarService: SearchBarService,
    private title: Title,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.getAllCoupons();
    this.title.setTitle('CouponSystem');
  }

  get isFilterClicked() {
    return this.filterService.isFilterClicked;
  }

  getSearchResults() {
    return this.searchBarService.getSearchResults();
  }
  getAllCoupons() {
    this.guestService.getAllCoupons().subscribe((products) => {
      this.allCoupons = products;
      this.hotTrends = products;
    });
  }

  sortCouponsByPrice() {
    let sortedArray: Coupon[] = this.allCoupons.sort((n1, n2) => {
      if (n1.price > n2.price) return 1;
      if (n1.price < n2.price) return -1;
      return 0;
    });

    this.allCoupons = sortedArray;
  }

  resultsText(): string {
    return 'Results for  "' + this.searchBarService.searchKeywords + '"';
  }

  onFilterClick() {
    this.filterOn = true;
    this.filterService.toggleFilter();
  }

  loadFilteredList(listFromEvent: Array<Coupon>) {
    this.allCoupons = listFromEvent;
  }
}
