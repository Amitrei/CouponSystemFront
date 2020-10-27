import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Company } from 'src/app/models/company';
import { AdminService } from 'src/app/services/admin/admin.service';
import { TableService } from 'src/app/services/table/table.service';
import { UpdateAddService } from 'src/app/services/update-add/update-add.service';
import {
  ConfirmedValidator,
  isEmailAlreadyExists,
  isNameAlreadyExists,
} from './update-add-company-validators';

@Component({
  selector: 'update-add-company',
  templateUrl: './update-add-company.component.html',
  styleUrls: ['./update-add-company.component.scss'],
})
export class UpdateCompanyComponent {
  company: Company;
  @Output()
  companyEvent = new EventEmitter();

  updateForm = this.fb.group(
    {
      name: new FormControl(
        '',
        [Validators.required, Validators.min(2)],
        isNameAlreadyExists(this.adminService)
      ),
      email: new FormControl(
        '',
        [Validators.email, Validators.required],
        isEmailAlreadyExists(this.adminService)
      ),
      password: new FormControl('', [Validators.minLength(4), Validators.required]),
      repeat_password: new FormControl(''),
    },
    { validator: ConfirmedValidator('password', 'repeat_password') }
  );

  get isActionCompleted() {
    return this.updateAddService.isActionCompleted;
  }

  constructor(
    private fb: FormBuilder,
    private updateAddService: UpdateAddService,
    private tableService: TableService,
    private adminService: AdminService,
    private httpClient: HttpClient
  ) {}

  getCompany() {
    let company = this.updateAddService.company;

    return company;
  }

  closeWindow() {
    this.updateForm.reset();
    this.tableService.crudPopUp = false;
    this.updateAddService.company = undefined;
    this.updateAddService.isActionCompleted = false;
  }

  saveAndUpdate(formValues) {
    this.company = this.getCompany();
    for (const property in formValues) {
      if (property === 'repeat_password') continue;
      if (property === 'name' && this.company.id) continue;
      if (formValues[property]) this.company[property] = formValues[property];
    }

    if (this.company.id) {
      this.updateCompany(this.company);
    } else {
      this.addCompany(this.company);
    }
  }

  updateCompany(company: Company) {
    this.adminService.updateCompany(company).subscribe(
      () => {
        this.companyEvent.emit(this.company);
        // isActionCompleted -> a flag for the animation to start.
        this.updateAddService.isActionCompleted = true;
        this.updateForm.reset();
      },
      (error) => console.log(error)
    );
  }

  addCompany(company: Company) {
    this.adminService.addCompany(company).subscribe(
      (res) => {
        this.companyEvent.emit(res);
        // isActionCompleted -> a flag for the animation to start.
        this.updateAddService.isActionCompleted = true;
        this.updateForm.reset();
      },
      (error) => console.log(error)
    );
  }

  get f() {
    return this.updateForm.controls;
  }
}
