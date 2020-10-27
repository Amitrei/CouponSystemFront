import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  crudPopUp: boolean;
  transparentPopup: boolean;
  deletePopUp: boolean;
  constructor() {}
}
