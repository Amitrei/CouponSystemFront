import { Location } from '@angular/common';
import { AuthService } from './../../../services/auth/auth.service';
import { Company } from './../../../models/company';
import { AdminService } from './../../../services/admin/admin.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from './../../../models/category';
import { CouponPreviewService } from './../../../services/coupon-preview/coupon-preview.service';
import { TableService } from './../../../services/table/table.service';
import { CompanyService } from './../../../services/company/company.service';
import { UpdateAddService } from 'src/app/services/update-add/update-add.service';
import { Coupon } from './../../../models/coupon';
import { CouponsService } from './../../../services/coupons/coupons.service';
import { Managments } from './../managments';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss'],
})
export class CouponsComponent extends Managments implements OnInit {
  contents: Coupon[];
  searchKeyWords: string;
  searchResults: Coupon[];
  sortBy: string;
  isFiltered: boolean;
  companyId: number;
  customerId: number;
  constructor(
    private couponsService: CouponsService,
    private updateAddService: UpdateAddService,
    private companyService: CompanyService,
    private tableService: TableService,
    private cardPreviewService: CouponPreviewService,
    private authService: AuthService,
    private adminService: AdminService,
    private title: Title,
    private route: ActivatedRoute,
    private location: Location
  ) {
    super();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  ngOnInit(): void {
    this.companyId = Number(this.route.snapshot.queryParamMap.get('companyid'));
    this.customerId = Number(this.route.snapshot.queryParamMap.get('customerid'));
    this.specificCoupons(this.companyId, this.customerId);

    if (!this.specificCoupons(this.companyId, this.customerId)) this.getAllCoupons();
    this.title.setTitle('CouponSystem | Coupons');
  }

  specificCoupons(companyId, CustomerId): boolean {
    if (this.companyId !== 0) {
      this.adminService
        .getOneCompany(this.companyId)
        .subscribe((response: Company) => (this.contents = response.coupons));
      return true;
    }

    if (this.customerId !== 0) {
      this.adminService
        .getOneCustomer(this.customerId)
        .subscribe((response: Customer) => (this.contents = response.coupons));
      return true;
    }
    return false;
  }

  getAllCoupons() {
    var that = this;
    that.couponsService.getAllCoupons().subscribe((response) => (that.contents = response));
    return this.contents;
  }

  navigateAction(actionEvent) {
    switch (actionEvent.action) {
      case 'update':
        this.tableService.crudPopUp = true;
        return this.updateCoupon(actionEvent.id);

      case 'delete':
        return this.deleteCoupon(actionEvent.id);

      case 'preview':
        return this.previewCoupon(actionEvent.id);

      case 'add':
        return this.addCoupon();
    }
  }

  addCoupon() {
    this.updateAddService.setEmptyCoupon();
    this.tableService.crudPopUp = true;
  }
  updateCouponsList(coupon: Coupon) {
    coupon.company = null;

    setTimeout(() => {
      //update coupon list even if your in search mode
      this.searchResults = this.getAllCoupons();

      this.tableService.crudPopUp = false;
      this.updateAddService.coupon = undefined;
      let couponIndex = this.contents.findIndex((c) => c.id == coupon.id);
      if (couponIndex === -1) this.contents.unshift(coupon);
      else this.contents[couponIndex] = coupon;

      this.updateAddService.isActionCompleted = false;
    }, 5000);
  }

  updateCoupon(couponId) {
    this.updateAddService.getCoupon(couponId);
  }

  deleteCoupon(couponId) {
    this.companyService.deleteCoupon(couponId).subscribe(() => {
      let deletedCouponIndex = this.contents.findIndex((c) => c.id === couponId);
      this.contents.splice(deletedCouponIndex, 1);

      // if your in search mode update if deleting.
      this.searchResults = this.contents;
    });
  }

  previewCoupon(couponID) {
    let couponIndex = this.contents.findIndex((c) => c.id === couponID);
    const coupon = Object.assign({}, this.contents[couponIndex]);
    this.cardPreviewService.setCoupon(coupon);
    this.cardPreviewService.isOpen = true;
  }

  search() {
    if (!this.searchKeyWords || this.searchKeyWords.length === 0) this.searchResults = undefined;

    if (this.contents && this.searchKeyWords) {
      this.searchResults = this.contents.filter(
        (coupon) =>
          coupon.companyName.toLowerCase().includes(this.searchKeyWords.toLowerCase()) ||
          coupon.title.toLowerCase().includes(this.searchKeyWords.toLowerCase())
      );
    }
  }

  getContent() {
    if (this.searchResults) return this.searchResults;
    return this.contents;
  }

  sortCoupons(sortBy: string) {
    this.backToAllCoupons();

    sortBy === 'price' ? (this.sortBy = 'Price') : (this.sortBy = 'Company');
    this.contents = this.sortTable(this.contents, sortBy);
    console.log(this.contents);
  }

  getCategories() {
    return Category;
  }

  filterByCategory(category: string) {
    this.backToAllCoupons();
    this.isFiltered = true;
    this.searchResults = this.filter(this.contents, 'category', category);
  }

  backToAllCoupons() {
    this.isFiltered = false;
    this.sortBy = undefined;
    this.searchResults = undefined;
  }

  previousPage() {
    this.location.back();
  }
}
