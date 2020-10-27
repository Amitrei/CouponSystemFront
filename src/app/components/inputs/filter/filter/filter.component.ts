import { element } from 'protractor';
import { Coupon } from './../../../../models/coupon';
import { GuestService } from './../../../../services/guest/guest.service';
import { FilterService } from './../../../../services/filter/filter.service';
import { Category } from './../../../../models/category';
import {
  Component,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'gallery-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit, OnDestroy {
  selectedCategories = new Array();
  categories = Category;
  coupons: Coupon[];
  maxPrice: number;
  @Output()
  filteredList = new EventEmitter();

  constructor(private filterService: FilterService, private guestService: GuestService) {}
  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.getAllCoupons();
  }

  closeFilterView() {
    this.filterService.toggleFilter();
  }

  isInvalidPrice() {
    return this.maxPrice && this.maxPrice <= 0;
  }

  @ViewChildren('categoryBtn') checkboxes: QueryList<ElementRef>;

  clearForms() {
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });

    this.selectedCategories = new Array();

    this.maxPrice = undefined;

    this.getAllCoupons();
    this.filter(undefined, 'price');
  }

  categoryClicked(categoryBtn: HTMLInputElement) {
    if (categoryBtn.checked && !this.selectedCategories.includes(categoryBtn.value))
      this.selectedCategories.push(categoryBtn.value);

    if (!categoryBtn.checked && this.selectedCategories.includes(categoryBtn.value)) {
      let categoryIndex = this.selectedCategories.findIndex(
        (category) => category === categoryBtn.value
      );
      this.selectedCategories.splice(categoryIndex, 1);
    }
  }

  getAllCoupons() {
    this.guestService.getAllCoupons().subscribe((resp) => (this.coupons = resp));
  }

  sort(couponsList: Array<Coupon>, sortProperty) {
    // if content loaded sort can be started.
    if (couponsList.length) {
      let sortedArray: any[] = couponsList.sort((n1, n2) => {
        if (n1[sortProperty] > n2[sortProperty]) {
          return 1;
        }

        if (n1[sortProperty] < n2[sortProperty]) {
          return -1;
        }

        return 0;
      });

      return sortedArray;
    }
    return couponsList;
  }

  filter(maxPrice: number, sortProperty) {
    let combinedArrays = new Array<Coupon>();

    if (this.selectedCategories.length === 0) combinedArrays = this.coupons;
    else {
      for (const category of this.selectedCategories) {
        let filteredCoupons = this.coupons.filter(
          (coupon) => coupon.category.toLowerCase() === String(category).toLowerCase()
        );
        combinedArrays = combinedArrays.concat(filteredCoupons);
      }
    }

    // Check if max price filter is needed
    if (maxPrice) combinedArrays = combinedArrays.filter((coupon) => coupon.price <= maxPrice);

    // Sort
    combinedArrays = this.sort(combinedArrays, sortProperty);

    this.filteredList.emit(combinedArrays);

    // Close window
    this.filterService.toggleFilter();
  }
}
