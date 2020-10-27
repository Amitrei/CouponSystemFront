import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { Coupon } from 'src/app/models/coupon';
import { CompanyService } from 'src/app/services/company/company.service';
import { CouponPreviewService } from 'src/app/services/coupon-preview/coupon-preview.service';
import { TableService } from 'src/app/services/table/table.service';
import { UpdateAddService } from 'src/app/services/update-add/update-add.service';
import { isCouponExistsByTitle, UpdateCouponValidators } from './update-add-coupon-form-validators';

@Component({
  selector: 'update-add-coupon',
  templateUrl: './update-add-coupon.component.html',
  styleUrls: ['./update-add-coupon.component.scss'],
})
export class UpdateCouponComponent implements OnInit {
  section1: boolean;
  section2: boolean;
  categories = Category;

  @Output()
  couponEvent = new EventEmitter();
  updatedCoupon: Coupon;

  updateForm = new FormGroup({
    title: new FormControl('', Validators.required, isCouponExistsByTitle(this.companyService)),
    description: new FormControl('', Validators.required),
    amount: new FormControl('', [Validators.required, UpdateCouponValidators.cannotBeUnderZero]),
    price: new FormControl('', [Validators.required, UpdateCouponValidators.cannotBeUnderZero]),
    start_date: new FormControl('', [
      UpdateCouponValidators.dateFormatValidator,
      UpdateCouponValidators.dateValidator,
      Validators.required,
    ]),
    end_date: new FormControl('', [
      UpdateCouponValidators.dateFormatValidator,
      UpdateCouponValidators.dateValidator,
      Validators.required,
    ]),
    category: new FormControl('', Validators.required),
  });

  constructor(
    private companyService: CompanyService,
    private tableService: TableService,
    private updateAddService: UpdateAddService
  ) {}

  ngOnInit(): void {}

  swipeToSection2() {
    this.section2 = true;
    this.section1 = false;
  }

  swipeToSection1() {
    this.section1 = true;
    this.section2 = false;
  }

  getCoupon() {
    let coupon = this.updateAddService.coupon;
    return coupon;
  }

  saveAndUpdate(formValues: object) {
    this.coupon.company = {
      id: this.coupon.idOfCompany,
    };

    console.log(this.coupon);
    for (const property in formValues) {
      if (formValues[property]) {
        this.coupon[property] = formValues[property];
      }
    }

    if (this.coupon.id) this.updateCoupon(this.coupon);
    else this.addCoupon(this.coupon);
  }

  addCoupon(coupon: Coupon) {
    this.companyService.addCoupon(coupon).subscribe((res: Coupon) => {
      // isActionCompleted -> a flag for the animation to start.
      console.log(res);
      res.company = null;
      this.couponEvent.emit(res);
      this.resetCard();
    });
  }

  resetCard() {
    // Reseting the swipe animation
    this.updateAddService.isActionCompleted = true;
    this.updateForm.reset();
    this.section1 = undefined;
    this.section2 = undefined;
  }

  updateCoupon(coupon: Coupon) {
    this.companyService.updateCoupon(coupon).subscribe(() => {
      coupon.company = null;
      this.couponEvent.emit(coupon);
      this.resetCard();
    });
  }

  get isActionCompleted() {
    return this.updateAddService.isActionCompleted;
  }

  closeWindow() {
    this.updateForm.reset();
    this.tableService.crudPopUp = false;
    this.updateAddService.isUpdateCompleted = false;
    this.updateAddService.coupon = undefined;
    // Reset swipe animation
    this.section1 = undefined;
    this.section2 = undefined;
  }

  // form getter
  get f() {
    return this.updateForm.controls;
  }

  get coupon() {
    return this.getCoupon();
  }

  logIt(log) {
    console.log(log);
  }
}
