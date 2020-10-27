import { CompanyComponent } from './../../components/company/company/company.component';
import { AuthService } from './../../services/auth/auth.service';
import { ChangeEmailComponent } from './../../components/account/change-email/change-email.component';
import { LoginComponent } from './../../components/login/login/login.component';
import { TextInputComponent } from './../../components/inputs/text-input/text-input.component';
import { ChangePasswordComponent } from './../../components/account/change-password/change-password.component';
import { MainAccountComponent } from './../../components/account/main-account/main-account.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ChangePasswordComponent,
    MainAccountComponent,
    TextInputComponent,
    LoginComponent,
    ChangeEmailComponent,
    CompanyComponent,
  ],
  imports: [CommonModule, FormsModule],
  providers: [AuthService],
})
export class AccountModule {}
