import { TestBed } from '@angular/core/testing';

import { RouteTestService } from './route-test.service';

describe('RouteTestService', () => {
  let service: RouteTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
