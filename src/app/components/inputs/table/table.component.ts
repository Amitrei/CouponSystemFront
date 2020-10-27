import { UpdateAddService } from 'src/app/services/update-add/update-add.service';
import { TableService } from './../../../services/table/table.service';
import { Router } from '@angular/router';
import { TableFilters } from './filters';
import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input()
  content: any[];
  contentRefrence: any[];

  @Output()
  actionClicked = new EventEmitter();

  deletedObject;
  deletedObjectID;

  constructor(
    public authService: AuthService,
    public tableService: TableService,
    public updateService: UpdateAddService,
    private router: Router
  ) {}

  // keyValue pipe for unsorted
  unsorted() {}

  loopOverProps(obj, property) {
    let filters = new TableFilters();

    if (filters.skipProperty(property, this.authService.isCustomer())) return;

    if (property === 'price') return obj + ' $';
    return obj;
  }

  getRowObjectId(currentRowObject) {
    let temp = (<any>Object).values(currentRowObject);
    return temp[0];
  }

  filterHeaders(header: string) {
    let filters = new TableFilters();
    if (this.authService.isCustomer()) return filters.skipHeadersAsCustomer(header);
    return filters.skipHeaders(header);
  }

  deleteClicked(deletedObject, deletedObjectID) {
    let trimmedObject;

    trimmedObject = {
      company: deletedObject.companyName,
      title: deletedObject.title,
      name: deletedObject.name,
      firstName: deletedObject.firstName,
      lastName: deletedObject.lastName,
      email: deletedObject.email,
    };

    this.deletedObjectID = deletedObjectID;
    this.deletedObject = trimmedObject;
    this.tableService.deletePopUp = true;
    this.tableService.transparentPopup = true;
  }

  onActionClicked(objID: number, actionClicked: string) {
    let actionEvent = {
      id: objID,
      action: actionClicked,
    };
    this.actionClicked.emit(actionEvent);
  }

  isAdminOnCoupons() {
    return this.router.url.startsWith('/coupons') && !this.authService.isCompany();
  }

  navToHome() {
    this.router.navigate(['/']);
  }
}
