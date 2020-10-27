import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  hideMenu = false;

  constructor() {}

  public toggleMenu() {
    this.hideMenu = !this.hideMenu;
  }
}
