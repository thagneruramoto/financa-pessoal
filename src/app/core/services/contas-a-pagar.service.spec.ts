import { TestBed } from '@angular/core/testing';

import { ContasAPagarService } from './contas-a-pagar.service';

describe('ContasAPagarService', () => {
  let service: ContasAPagarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContasAPagarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
