import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { MenuService } from './../../services/menu/menu.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav-component',
  templateUrl: './nav-component.component.html',
  styleUrls: ['./nav-component.component.scss'],
})
export class NavComponent implements OnInit {
  companyName: string = 'COUPONIM';
  constructor(
    private menuService: MenuService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  toggleMenu() {
    this.menuService.toggleMenu();
  }

  logIt(event) {
    console.log(event);
  }

  isMainPage(): boolean {
    return this.router.url === '/';
  }

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
