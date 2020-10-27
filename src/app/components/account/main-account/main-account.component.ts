import { Customer } from './../../../models/customer';
import { AuthService } from './../../../services/auth/auth.service';
import { CustomerService } from './../../../services/customer/customer.service';
import { AdminService } from './../../../services/admin/admin.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main-account',
  templateUrl: './main-account.component.html',
  styleUrls: ['./main-account.component.scss'],
})
export class MainAccountComponent implements OnInit {
  customer: Customer;
  returnUrl: string;
  constructor(
    private rout: ActivatedRoute,
    private adminService: AdminService,
    private customerService: CustomerService,
    private authService: AuthService,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('CouponSystem | Account');
    this.getCustomer();
    this.returnUrl = this.rout.snapshot.queryParamMap.get('return');
    console.log(this.returnUrl);
  }

  goBack() {
    this.router.navigate([this.returnUrl || '/']);
  }

  getCustomer(): Customer {
    let customerID = this.rout.snapshot.queryParamMap.get('id');
    if (this.authService.isAdmin()) {
      this.adminService.getOneCustomer(customerID).subscribe((response: Customer) => {
        this.customer = response;
      });
      return this.customer;
    }

    if (this.authService.isCustomer()) {
      this.customerService.getCustomerDetails().subscribe((response: Customer) => {
        this.customer = response;
        console.log(this.customer);
      });
      return this.customer;
    }
  }

  navigateToCoupons() {
    if (this.authService.isAdmin()) {
      this.router.navigate(['/coupons'], {
        queryParams: { customerid: this.customer.id },
      });
    } else this.router.navigate(['/coupons']);
  }
}
