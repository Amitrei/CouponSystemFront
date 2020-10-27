import { Company } from 'src/app/models/company';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { CompanyService } from './../../../services/company/company.service';
import { AdminService } from './../../../services/admin/admin.service';
import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
  returnUrl: string;
  company: Company;
  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private companyService: CompanyService,
    private router: Router,
    private rout: ActivatedRoute,
    private title: Title,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.title.setTitle('CouponSystem | Company');
    this.getCompany();
    this.returnUrl = this.rout.snapshot.queryParamMap.get('return');
  }

  goBack() {
    this.router.navigate([this.returnUrl || '/']);
  }

  navigateToCoupons() {
    if (this.authService.isAdmin()) {
      this.router.navigate(['/coupons'], {
        queryParams: { companyid: this.company.id },
      });
    } else this.router.navigate(['/coupons']);
  }

  getCompany(): Company {
    let companyID = this.rout.snapshot.queryParamMap.get('id');
    if (this.authService.isAdmin()) {
      this.adminService.getOneCompany(companyID).subscribe(
        (response: Company) => {
          this.company = response;
          console.log(this.company);
        },
        (error) => this.location.back()
      );
      return this.company;
    }

    if (this.authService.isCompany()) {
      this.companyService.getCompanyDetails().subscribe((response: Company) => {
        this.company = response;
        console.log(this.company);
      });
      return this.company;
    }
  }
}
