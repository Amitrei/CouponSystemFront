import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  PasswordIconSrc = 'assets/images/pass-login.svg';
  constructor() {}

  ngOnInit(): void {}

  stamlog(x) {
    console.log(x);
  }
}
