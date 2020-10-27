import { Router } from '@angular/router';
import { TableService } from './../../../services/table/table.service';
import { UpdateAddService } from 'src/app/services/update-add/update-add.service';
import { AdminService } from './../../../services/admin/admin.service';
import { Customer } from './../../../models/customer';
import { Managments } from './../managments';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent extends Managments implements OnInit {
  content: Customer[];
  searchKeyWords: string;
  searchResults: Customer[];
  sortBy: string;

  constructor(
    private adminService: AdminService,
    private updateAddService: UpdateAddService,
    private tableService: TableService,
    private router: Router,
    private title: Title
  ) {
    super();
  }

  ngOnInit(): void {
    this.title.setTitle('CouponSystem | Customers');
    this.getAllCustomers();
  }

  private getAllCustomers() {
    this.adminService.getAllCustomers().subscribe((response) => (this.content = response));
  }

  navigateAction(actionEvent) {
    switch (actionEvent.action) {
      case 'update':
        return this.updateCustomer(actionEvent.id);

      case 'delete':
        return this.deleteCustomer(actionEvent.id);

      case 'preview': {
        this.router.navigate(['/account'], {
          queryParams: { id: actionEvent.id, return: 'customers' },
        });
        return null;
      }

      case 'add':
        return this.addCustomer();
    }
  }

  addCustomer() {
    this.updateAddService.setEmptyCustomer();
    this.tableService.crudPopUp = true;
  }
  updateCustomer(customerID) {
    this.tableService.crudPopUp = true;
    return this.updateAddService.getCustomer(customerID);
  }

  updateCustomersList(customer: Customer) {
    setTimeout(() => {
      this.tableService.crudPopUp = false;
      this.updateAddService.customer = undefined;
      let customerIndex = this.content.findIndex((c) => c.id == customer.id);

      if (customerIndex === -1) this.content.push(customer);
      else this.content[customerIndex] = customer;

      this.updateAddService.isActionCompleted = false;
    }, 5000);
  }

  deleteCustomer(customerID) {
    this.adminService.deleteCustomer(customerID).subscribe(() => {
      let deletedCustomerIndex = this.content.findIndex((c) => c.id === customerID);
      this.content.splice(deletedCustomerIndex, 1);
    });
  }

  search() {
    if (!this.searchKeyWords || this.searchKeyWords.length === 0) this.searchResults = undefined;

    if (this.content && this.searchKeyWords) {
      this.searchResults = this.content.filter(
        (customer: Customer) =>
          customer.firstName.toLowerCase().includes(this.searchKeyWords.toLowerCase()) ||
          customer.lastName.toLowerCase().includes(this.searchKeyWords.toLowerCase())
      );
    }
  }

  sortByName() {
    this.sortBy = 'name';
    this.sortTable(this.content, 'firstName');
  }

  getContent() {
    if (this.searchResults) return this.searchResults;
    return this.content;
  }
}
