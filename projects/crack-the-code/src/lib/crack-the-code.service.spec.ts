import { TestBed } from '@angular/core/testing';

import { CrackTheCodeService } from './crack-the-code.service';

describe('CrackTheCodeService', () => {
  let service: CrackTheCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrackTheCodeService],
    });
    service = TestBed.inject(CrackTheCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
