import { TableService } from './../table/table.service';
import { Customer } from '../../models/customer';
import { AdminService } from '../admin/admin.service';
import { GuestService } from '../guest/guest.service';
import { Injectable } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { Company } from 'src/app/models/company';

@Injectable({
  providedIn: 'root',
})
export class UpdateAddService {
  coupon: Coupon;
  company: Company;
  customer: Customer;
  isUpdateCompleted: boolean;
  isActionCompleted: boolean;

  constructor(
    private guestService: GuestService,
    private adminService: AdminService,
    private tableService: TableService
  ) {}

  closeWindow() {
    setTimeout(() => {
      this.tableService.crudPopUp = false;
      this.company = undefined;
      this.customer = undefined;
      this.coupon = undefined;
      this.isActionCompleted = false;
    }, 5000);
  }
  getCoupon(couponID) {
    this.guestService.getCoupon(couponID).subscribe(
      (response: Coupon) => {
        this.coupon = response;
      },
      (error) => console.log(error)
    );
  }

  getCompany(companyID) {
    return this.adminService.getOneCompany(companyID).subscribe(
      (response: Company) => (this.company = response),
      (error) => console.log(error)
    );
  }

  setEmptyCompany() {
    this.company = new Company();
  }

  setEmptyCustomer() {
    this.customer = new Customer();
  }

  setEmptyCoupon() {
    this.coupon = new Coupon();
    // default image
    this.coupon.image = 'pizza';
  }

  getCustomer(customerID) {
    return this.adminService
      .getOneCustomer(customerID)
      .subscribe((response: Customer) => (this.customer = response));
  }
}
