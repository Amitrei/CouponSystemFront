import { AuthRequest } from './../../../models/auth-request';
import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  passwordIconSrc = 'assets/images/pass-login.svg';
  emailIconSrc = 'assets/images/email-login.svg';
  authRequest: AuthRequest = {
    email: '',
    password: '',
    type: '',
  };

  loginError: string;
  email: NgModel;
  password: NgModel;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('CouponSystem | Login');
    if (this.authService.isLoggedIn()) this.router.navigateByUrl('/ ');
  }

  onSubmit() {
    this.authService.login(this.authRequest).subscribe(
      (results) => {
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigate([returnUrl || '/']);
      },
      (error: HttpErrorResponse) => (this.loginError = error.error)
    );
  }

  savePassword(event: NgModel) {
    this.password = event;
    this.authRequest.password = event.value;
  }

  saveEmail(event: NgModel) {
    this.email = event;
    this.authRequest.email = event.value;
  }

  saveType(event: NgModel) {
    this.authRequest.type = event.value;
  }

  logIt(log) {
    console.log(log);
  }
}
