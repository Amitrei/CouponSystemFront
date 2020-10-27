import { Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { TableService } from './../../../services/table/table.service';
import { UpdateAddService } from 'src/app/services/update-add/update-add.service';
import { CouponPreviewService } from './../../../services/coupon-preview/coupon-preview.service';
import { HttpClient } from '@angular/common/http';
import { AdminService } from './../../../services/admin/admin.service';
import { Component, OnInit } from '@angular/core';
import { Managments } from '../managments';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent extends Managments implements OnInit {
  content: Company[];
  updatedCompany: Company;
  searchKeyWords: string;
  searchResults: Company[];
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
    this.title.setTitle('CouponSystem | Companies');
    this.getAllCompanies();
  }

  getAllCompanies() {
    this.adminService.getAllCompanies().subscribe((response) => (this.content = response));
  }

  updateCompaniesList(company: Company) {
    setTimeout(() => {
      this.tableService.crudPopUp = false;
      this.updateAddService.company = undefined;
      let companyIndex = this.content.findIndex((c) => c.id === company.id);

      // if company was not found its a new company
      if (companyIndex === -1) this.content.push(company);
      else this.content[companyIndex] = company;

      if (this.searchResults) {
        let companyIndex = this.searchResults.findIndex((c) => c.id === company.id);
        if (companyIndex === -1) this.searchResults.push(company);
        else this.searchResults[companyIndex] = company;
      }

      this.updateAddService.isActionCompleted = false;
    }, 5000);
  }

  navigateAction(actionEvent) {
    switch (actionEvent.action) {
      case 'update':
        return this.updateCompany(actionEvent.id);
      case 'delete':
        return this.deleteCompany(actionEvent.id);

      case 'add':
        return this.addCompany();

      case 'preview': {
        this.router.navigate(['/company'], {
          queryParams: { id: actionEvent.id, return: 'companies' },
        });
        return null;
      }
    }
  }

  updateCompany(companyID) {
    this.updateAddService.getCompany(companyID);
    this.tableService.crudPopUp = true;
  }

  addCompany() {
    this.updateAddService.setEmptyCompany();
    this.tableService.crudPopUp = true;
  }

  deleteCompany(companyID) {
    this.adminService.deleteCompany(companyID).subscribe(() => {
      let deletedCompanyIndex = this.content.findIndex((c) => c.id === companyID);
      this.content.splice(deletedCompanyIndex, 1);
    });
  }

  search() {
    if (!this.searchKeyWords || this.searchKeyWords.length === 0) console.log('im 0');
    this.searchResults = undefined;

    if (this.content && this.searchKeyWords) {
      this.searchResults = this.content.filter(
        (company) =>
          company.name.toLowerCase().includes(this.searchKeyWords.toLowerCase()) ||
          company.email.toLowerCase().includes(this.searchKeyWords.toLowerCase())
      );
    }
  }

  sortByName() {
    this.sortBy = 'name';
    this.sortTable(this.content, 'name');
  }
  getContent() {
    if (this.searchResults) return this.searchResults;
    return this.content;
  }
}
