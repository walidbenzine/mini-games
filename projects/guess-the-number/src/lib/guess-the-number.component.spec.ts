import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GuessTheNumberComponent } from './guess-the-number.component';
import { GuessTheNumberService } from './guess-the-number.service';

describe('GuessTheNumberComponent', () => {
  let component: GuessTheNumberComponent;
  let fixture: ComponentFixture<GuessTheNumberComponent>;
  let mockService: any;

  beforeEach(async () => {
    mockService = {
      attempts: signal([]),
      currentGuess: signal(null),

      defaultTranslations: {
        startGame: 'Start Game',
        secretCodeLabel: 'Secret Code',
        restartGame: 'Restart Game',
        resumeGame: 'Resume Game',
        pauseGame: 'Pause Game',
        attemptsLabel: 'Attempts',
        inputPlaceholder: 'Enter your guess',
        guessAlreadyTried: 'You already tried this guess!',
        submitGuess: 'Submit Guess',
        attemptsHistoryLabel: 'Attempts History',
        isLess: 'The secret number is lower',
        isGreater: 'The secret number is greater',
        isEqual: 'Is the secret number',
        gameWonMessage: 'Congratulations! You guessed the number!',
        title: 'Guess the number',
      },

      startGame: vi.fn(),
      pauseGame: vi.fn(),
      resumeGame: vi.fn(),
      submitGuess: vi.fn(),
      updateCurrentGuess: vi.fn(),

      isGamePaused: vi.fn().mockReturnValue(false),
      isGameWon: vi.fn().mockReturnValue(false),
      isGameStarted: vi.fn().mockReturnValue(true),
      alreadyTriedThisGuess: vi.fn().mockReturnValue(false),
      canSubmitGuess: vi.fn().mockReturnValue(true),
      codeToPrint: vi.fn().mockReturnValue('1234'),
      timerLabel: vi.fn().mockReturnValue('00:10'),
    };

    await TestBed.configureTestingModule({
      imports: [GuessTheNumberComponent],
      providers: [{ provide: GuessTheNumberService, useValue: mockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(GuessTheNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call startGame when start button clicked', () => {
    const button = fixture.debugElement.queryAll(By.css('.buttons button'))[0];
    button.triggerEventHandler('click');
    expect(mockService.startGame).toHaveBeenCalled();
  });

  it('should call pauseGame when pause clicked', () => {
    mockService.isGamePaused.mockReturnValue(false);
    fixture.detectChanges();

    const pauseButton = fixture.debugElement.queryAll(
      By.css('.buttons button'),
    )[1];
    pauseButton.triggerEventHandler('click');

    expect(mockService.pauseGame).toHaveBeenCalled();
  });

  it('should call resumeGame when paused', () => {
    mockService.isGamePaused.mockReturnValue(true);
    fixture.detectChanges();

    const pauseButton = fixture.debugElement.queryAll(
      By.css('.buttons button'),
    )[1];
    pauseButton.triggerEventHandler('click');

    expect(mockService.resumeGame).toHaveBeenCalled();
  });

  it('should update guess on input', () => {
    const input = fixture.debugElement.query(By.css('input'));

    input.nativeElement.value = '1234';
    input.triggerEventHandler('input', {
      target: input.nativeElement,
    });

    expect(mockService.updateCurrentGuess).toHaveBeenCalledWith('1234');
  });

  it('should submit guess when form submitted', () => {
    const form = fixture.debugElement.query(By.css('form'));

    form.triggerEventHandler('submit', {
      preventDefault: vi.fn(),
    });

    expect(mockService.submitGuess).toHaveBeenCalled();
  });

  it('should submit guess on form submit', () => {
    const form = fixture.debugElement.query(By.css('form'));

    form.triggerEventHandler('submit', {
      preventDefault: vi.fn(),
    });

    expect(mockService.submitGuess).toHaveBeenCalled();
  });

  it('should pause game on destroy if running', () => {
    mockService.isGameStarted.mockReturnValue(true);
    mockService.isGameWon.mockReturnValue(false);
    mockService.isGamePaused.mockReturnValue(false);

    component.ngOnDestroy();

    expect(mockService.pauseGame).toHaveBeenCalled();
  });

  it('should NOT pause game on destroy if already paused', () => {
    mockService.isGameStarted.mockReturnValue(true);
    mockService.isGameWon.mockReturnValue(false);
    mockService.isGamePaused.mockReturnValue(true);

    component.ngOnDestroy();

    expect(mockService.pauseGame).not.toHaveBeenCalled();
  });
});
