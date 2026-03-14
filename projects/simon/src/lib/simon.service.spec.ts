import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { SimonService } from './simon.service';

describe('SimonService', () => {
  let service: SimonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SimonService],
    });

    service = TestBed.inject(SimonService);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
