import { CustomDatePipe } from './../../pipes/custom-date/custom-date.pipe';
import { PasswordPipe } from './../../pipes/password/password.pipe';
import { DeletePopupComponent } from './../../components/inputs/delete-popup/delete-popup.component';
import { UpdateCustomerComponent } from 'src/app/components/crud/update-add/update-add-customer/update-add-customer.component';
import { UpdateCompanyComponent } from '../../components/crud/update-add/update-add-company/update-add-company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from 'src/app/components/inputs/table/table.component';
import { CouponsComponent } from 'src/app/components/managment/coupons/coupons.component';
import { CompaniesComponent } from 'src/app/components/managment/companies/companies.component';
import { CustomersComponent } from 'src/app/components/managment/customers/customers.component';
import { UpdateCouponComponent } from 'src/app/components/crud/update-add/update-add-coupon/update-add-coupon.component';

@NgModule({
  declarations: [
    TableComponent,
    CouponsComponent,
    CompaniesComponent,
    CustomersComponent,
    UpdateCouponComponent,
    UpdateCompanyComponent,
    UpdateCustomerComponent,
    DeletePopupComponent,
    PasswordPipe,
    CustomDatePipe,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class ManagmentModule {}
