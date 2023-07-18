import { TestBed } from '@angular/core/testing';

import { Modulo1Service } from './modulo1.service';

describe('Modulo1Service', () => {
  let service: Modulo1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Modulo1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
