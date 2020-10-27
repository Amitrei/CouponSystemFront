import { TestBed } from '@angular/core/testing';

import { UpdateAddService } from './update-add.service';

describe('UpdateService', () => {
  let service: UpdateAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
