import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Customer } from 'src/app/models/customer';
import { AdminService } from 'src/app/services/admin/admin.service';
import { TableService } from 'src/app/services/table/table.service';
import { UpdateAddService } from 'src/app/services/update-add/update-add.service';
import { ConfirmedValidator } from '../update-add-company/update-add-company-validators';
import { isCustomerEmailAlreadyExists } from './customer-validators';
@Component({
  selector: 'update-add-customer',
  templateUrl: './update-add-customer.component.html',
  styleUrls: ['./update-add-customer.component.scss'],
})
export class UpdateCustomerComponent implements OnInit {
  @Output()
  customerEvent = new EventEmitter();
  customer: Customer;
  updateForm = this.fb.group(
    {
      firstName: new FormControl('', [Validators.minLength(2), Validators.required]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl(
        '',
        [Validators.required, Validators.email],
        isCustomerEmailAlreadyExists(this.adminService)
      ),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      repeat_password: new FormControl(''),
    },
    { validator: ConfirmedValidator('password', 'repeat_password') }
  );
  constructor(
    private updateAddService: UpdateAddService,
    private fb: FormBuilder,
    private tableService: TableService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {}

  getCustomer() {
    return this.updateAddService.customer;
  }

  get f() {
    return this.updateForm.controls;
  }

  closeWindow() {
    this.updateAddService.customer = undefined;
    this.tableService.crudPopUp = false;
    this.updateForm.reset();
    this.updateAddService.isActionCompleted = false;
  }

  get isActionCompleted() {
    return this.updateAddService.isActionCompleted;
  }

  saveAndUpdate(formValues) {
    this.customer = this.getCustomer();
    for (const property in formValues) {
      if (property === 'repeat_password') continue;
      if (formValues[property]) this.customer[property] = formValues[property];
    }

    if (this.customer.id) this.updateCustomer(this.customer);
    else this.addCustomer(this.customer);
  }

  addCustomer(customer: Customer) {
    this.adminService.addCustomer(customer).subscribe(
      (res) => {
        // isActionCompleted -> a flag for the animation to start.
        console.log('res' + res);
        this.customerEvent.emit(res);
        this.updateAddService.isActionCompleted = true;
        this.updateForm.reset();
      },
      (error) => console.log(error)
    );
  }
  updateCustomer(customer: Customer) {
    this.adminService.updateCustomer(customer).subscribe(
      () => {
        this.customerEvent.emit(customer);
        this.updateAddService.isActionCompleted = true;
        this.updateForm.reset();
      },
      (error) => console.log(error)
    );
  }
}
