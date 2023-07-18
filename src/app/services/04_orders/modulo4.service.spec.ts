import { TestBed } from '@angular/core/testing';

import { Modulo4Service } from './modulo4.service';

describe('Modulo4Service', () => {
  let service: Modulo4Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Modulo4Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
