import { Category } from './../../models/category';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  isFilterClicked: boolean;
  outAnimation: boolean;

  constructor() {}

  toggleFilter() {
    this.isFilterClicked = !this.isFilterClicked;
  }
}
