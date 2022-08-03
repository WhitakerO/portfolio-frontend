import { TestBed } from '@angular/core/testing';

import { ExpLaboralService } from './explaboral.service';

describe('ExplaboralService', () => {
  let service: ExpLaboralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpLaboralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
