import { ErrorMessageService } from './services/error-message/error-message.service';
import { TableService } from './services/table/table.service';
import { GuestService } from './services/guest/guest.service';
import { CustomerService } from './services/customer/customer.service';
import { CouponPreviewService } from './services/coupon-preview/coupon-preview.service';
import { MenuService } from './services/menu/menu.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private menuService: MenuService,
    private couponPreviewService: CouponPreviewService,
    private tableService: TableService,
    private errorMessageService: ErrorMessageService,
    private title: Title
  ) {}

  ngOnInit(): void {}

  openMenu: boolean;

  toggleMenu() {
    this.menuService.toggleMenu();
  }

  get isOpen() {
    return this.couponPreviewService.isOpen;
  }
  getHideMenu() {
    return this.menuService.hideMenu;
  }

  isPreviewOpen(): boolean {
    return this.couponPreviewService.isOpen || this.tableService.crudPopUp;
  }

  isTransparentOverlay() {
    return this.tableService.transparentPopup;
  }

  isErrorActive() {
    return this.errorMessageService.getIsErrorMsgActive;
  }
}
