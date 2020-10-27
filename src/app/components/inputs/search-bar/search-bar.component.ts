import { Router } from '@angular/router';
import { SearchBarService } from './../../../services/search-bar/search-bar.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit, OnDestroy {
  constructor(private searchBarService: SearchBarService, private router: Router) {}

  ngOnDestroy(): void {
    this.searchBarService.searchCoupons(null);
  }

  ngOnInit(): void {
    this.searchBarService.getAllCoupons();
  }

  isMainPage(): boolean {
    return this.router.url === '/';
  }

  search(searchBar: HTMLInputElement) {
    this.searchBarService.searchCoupons(searchBar.value);
  }
}
