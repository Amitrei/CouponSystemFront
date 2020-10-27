import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorMessageService {
  private isErrorMsgActive: boolean;
  constructor() {}

  activateErrorMessage() {
    this.isErrorMsgActive = true;

    setTimeout(() => {
      this.isErrorMsgActive = false;
    }, 6000);
  }

  get getIsErrorMsgActive() {
    return this.isErrorMsgActive;
  }
}
