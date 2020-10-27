import { TableService } from './../../../services/table/table.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.scss'],
})
export class DeletePopupComponent implements OnInit {
  @Input()
  deletedObject;

  @Input()
  objectID;

  @Output()
  deleteClicked = new EventEmitter();

  constructor(private tableService: TableService) {}

  ngOnInit(): void {}

  convertObjToArray() {
    return (<any>Object).values(this.deletedObject);
  }

  isPopup() {
    return this.tableService.deletePopUp;
  }

  closeWindow() {
    this.tableService.deletePopUp = false;
    this.tableService.transparentPopup = false;
  }

  deleteEmit() {
    this.deleteClicked.emit(this.objectID);
    this.closeWindow();
  }
}
