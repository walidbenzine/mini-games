import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { CrackTheCodeService } from './crack-the-code.service';

describe('CrackTheCodeService', () => {
  let service: CrackTheCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrackTheCodeService],
    });

    service = TestBed.inject(CrackTheCodeService);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start game properly', () => {
    service.startGame();

    expect(service.isGameStarted()).toBe(true);
    expect(service.isGameWon()).toBe(false);
    expect(service.currentGuess().value).toBe('');
    expect(service.attempts().length).toBe(0);
  });

  it('should sanitize input correctly', () => {
    service.updateCurrentGuess('12a45');

    expect(service.currentGuess().value).toBe('1245');
  });

  it('should not allow submit if guess length invalid', () => {
    service.startGame();
    service.updateCurrentGuess('12');

    expect(service.canSubmitGuess()).toBe(false);
  });

  it('should allow submit when guess valid', () => {
    service.startGame();
    service.updateCurrentGuess('1234');

    expect(service.canSubmitGuess()).toBe(true);
  });

  it('should add attempt on submit', () => {
    service.startGame();

    // Force secret code for deterministic test
    (service as any).secretCode = ['1', '2', '3', '4'];

    service.updateCurrentGuess('1234');
    service.submitGuess();

    expect(service.attempts().length).toBe(1);
    expect(service.isGameWon()).toBe(true);
  });

  it('should calculate correctPlace and wrongPlace properly', () => {
    service.startGame();
    (service as any).secretCode = ['1', '2', '3', '4'];

    service.updateCurrentGuess('1243');
    service.submitGuess();

    const attempt = service.attempts()[0];

    expect(attempt.correctPlace).toBe(2);
    expect(attempt.wrongPlace).toBe(2);
  });

  it('should pause and resume game', () => {
    service.startGame();

    service.pauseGame();
    expect(service.isGamePaused()).toBe(true);

    service.resumeGame();
    expect(service.isGamePaused()).toBe(false);
  });

  it('should increment timer', () => {
    vi.useFakeTimers();

    service.startGame();

    vi.advanceTimersByTime(3000);

    expect(service.timerLabel()).toBe('00:03');
  });

  it('should stop timer on win', () => {
    vi.useFakeTimers();

    service.startGame();
    (service as any).secretCode = ['1', '2', '3', '4'];

    service.updateCurrentGuess('1234');
    service.submitGuess();

    const timeAfterWin = service.timerLabel();

    vi.advanceTimersByTime(5000);

    expect(service.timerLabel()).toBe(timeAfterWin);
  });

  it('should stop timer on destroy', () => {
    vi.useFakeTimers();

    service.startGame();
    service.ngOnDestroy();

    const timeAfterDestroy = service.timerLabel();

    vi.advanceTimersByTime(5000);

    expect(service.timerLabel()).toBe(timeAfterDestroy);
  });
});
