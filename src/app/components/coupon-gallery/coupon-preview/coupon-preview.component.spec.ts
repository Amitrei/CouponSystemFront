import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponPreviewComponent } from './coupon-preview.component';

describe('CouponPreviewComponent', () => {
  let component: CouponPreviewComponent;
  let fixture: ComponentFixture<CouponPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
