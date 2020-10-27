import { ErrorMessageService } from './../services/error-message/error-message.service';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalerrorHandler implements ErrorHandler {
  constructor(private errorMsgService: ErrorMessageService) {}

  handleError(error: any): void {
    this.errorMsgService.activateErrorMessage();
    console.log(error);
  }
}
