import { map } from 'rxjs/operators';
import { Customer } from './../../models/customer';
import { Company } from './../../models/company';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private API_ADRESS = 'http://localhost:8080/administrator/';
  constructor(private httpClient: HttpClient) {}

  getAllCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(this.API_ADRESS + 'companies').pipe(
      map((respose: Company[]) => {
        respose.forEach((company) => (company.password = '*****'));

        return respose;
      })
    );
  }
  getAllCustomers(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.API_ADRESS + 'customers');
  }

  isCompanyExistsByName(companyName: string) {
    return this.httpClient.get(this.API_ADRESS + 'companies/by-name/' + companyName);
  }

  isCustomerExistsByEmail(email: string) {
    return this.httpClient.get(this.API_ADRESS + 'customers/by-email/' + email);
  }
  isCompanyExistsByEmail(email: string) {
    return this.httpClient.get(this.API_ADRESS + 'companies/by-email/' + email);
  }
  addCompany(company: Company) {
    return this.httpClient.post(this.API_ADRESS + 'companies/add', company);
  }

  updateCompany(company: Company) {
    return this.httpClient.put(this.API_ADRESS + 'companies/update', company);
  }

  deleteCompany(companyId: number) {
    return this.httpClient.delete(this.API_ADRESS + 'companies/delete/' + companyId);
  }

  getOneCompany(companyID) {
    return this.httpClient.get(this.API_ADRESS + 'companies/' + companyID);
  }

  addCustomer(customer: Customer) {
    return this.httpClient.post(this.API_ADRESS + 'customers/add', customer);
  }

  deleteCustomer(customerID) {
    return this.httpClient.delete(this.API_ADRESS + 'customers/delete/' + customerID);
  }

  updateCustomer(customer: Customer) {
    return this.httpClient.put(this.API_ADRESS + 'customers/update', customer);
  }

  getOneCustomer(customerID) {
    return this.httpClient.get(this.API_ADRESS + 'customers/' + customerID);
  }
}
