import { TestBed } from '@angular/core/testing';

import { TransferringService } from './transferring.service';

describe('TransferringService', () => {
  let service: TransferringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
