import { AuthService } from './../../services/auth/auth.service';
import { MenuService } from './../../services/menu/menu.service';
import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  constructor(private menuService: MenuService, private authService: AuthService) {}

  ngOnInit(): void {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logOut() {
    this.closeMenu();
    return this.authService.logout();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  isCustomer() {
    return this.authService.isCustomer();
  }

  isCompany() {
    return this.authService.isCompany();
  }
  closeMenu() {
    this.menuService.toggleMenu();
  }

  public getHideMenu() {
    return this.menuService.hideMenu;
  }
}
