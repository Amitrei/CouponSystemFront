import { TestBed } from '@angular/core/testing';

import { CouponPreviewService } from './coupon-preview.service';

describe('CouponPreviewService', () => {
  let service: CouponPreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouponPreviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
