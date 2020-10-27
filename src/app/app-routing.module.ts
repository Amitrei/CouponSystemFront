import { PageNotFoundComponent } from './components/page-not-found/page-not-found/page-not-found.component';
import { CompanyGuard } from './services/guards/company-guard.service';
import { CompanyComponent } from './components/company/company/company.component';
import { AdminGuard } from './services/guards/admin-guard.service';
import { AuthGuard } from './services/guards/auth-guard.service';
import { ChangeEmailComponent } from './components/account/change-email/change-email.component';
import { ChangePasswordComponent } from './components/account/change-password/change-password.component';
import { LoginComponent } from './components/login/login/login.component';
import { CustomersComponent } from './components/managment/customers/customers.component';
import { CompaniesComponent } from './components/managment/companies/companies.component';
import { CouponsComponent } from './components/managment/coupons/coupons.component';
import { GalleryComponent } from './components/coupon-gallery/gallery/gallery.component';
import { MainAccountComponent } from './components/account/main-account/main-account.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'account',
    component: MainAccountComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'coupons',
    component: CouponsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'companies',
    component: CompaniesComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'company',
    component: CompanyComponent,
    canActivate: [CompanyGuard],
  },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'change-email',
    component: ChangeEmailComponent,
    canActivate: [AuthGuard],
  },

  { path: 'login', component: LoginComponent },

  { path: '', component: GalleryComponent },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
