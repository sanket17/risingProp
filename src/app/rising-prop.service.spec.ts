import { TestBed, inject } from '@angular/core/testing';

import { RisingPropService } from './rising-prop.service';

describe('RisingPropService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RisingPropService]
    });
  });

  it('should be created', inject([RisingPropService], (service: RisingPropService) => {
    expect(service).toBeTruthy();
  }));
});
