import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss'],
})
export class ChangeEmailComponent implements OnInit {
  currentEmail = 'stamEmail@gmail.com';
  emailIconSrc = 'assets/images/email-login.svg';

  constructor() {}

  ngOnInit(): void {}

  stamlog(event) {
    console.log(event);
  }
}
