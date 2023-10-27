import { TestBed } from '@angular/core/testing';

import { FormService } from './form.service';

describe('CheckFormService', () => {
  let service: CheckFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
