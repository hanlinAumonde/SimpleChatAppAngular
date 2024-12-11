import { TestBed } from '@angular/core/testing';

import { SharedUserInfoService } from './shared-user-info.service';

describe('SharedUserInfoService', () => {
  let service: SharedUserInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedUserInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
