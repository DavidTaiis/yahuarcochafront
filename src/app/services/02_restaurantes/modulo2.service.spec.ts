import { TestBed } from '@angular/core/testing';

import { Modulo2Service } from './modulo2.service';

describe('Modulo2Service', () => {
  let service: Modulo2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Modulo2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
