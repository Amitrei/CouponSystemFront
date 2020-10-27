import { GlobalerrorHandler } from './common/global-error-handler';
import { MenuService } from './services/menu/menu.service';
import { ManagmentModule } from './modules/managment/managment.module';
import { AccountModule } from './modules/account/account.module';
import { CouponCardComponent } from './components/coupon-gallery/coupon-card/coupon-card.component';
import { GalleryComponent } from './components/coupon-gallery/gallery/gallery.component';
import { NavComponent } from './components/nav-component/nav-component.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from './components/inputs/search-bar/search-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { CouponPreviewComponent } from './components/coupon-gallery/coupon-preview/coupon-preview.component';
import { ErrorMessageComponent } from './components/inputs/error-message/error-message/error-message.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found/page-not-found.component';
import { FilterComponent } from './components/inputs/filter/filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SearchBarComponent,
    GalleryComponent,
    CouponCardComponent,
    FooterComponent,
    SideMenuComponent,
    CouponPreviewComponent,
    ErrorMessageComponent,
    PageNotFoundComponent,
    FilterComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },

        allowedDomains: ['localhost:8080'],
        disallowedRoutes: [''],
        headerName: 'authorization',
      },
    }),
  ],
  providers: [MenuService, { provide: ErrorHandler, useClass: GlobalerrorHandler }],
  bootstrap: [AppComponent],
})
export class AppModule {}
