import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { lodeGuard } from './lode.guard';

describe('lodeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => lodeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
