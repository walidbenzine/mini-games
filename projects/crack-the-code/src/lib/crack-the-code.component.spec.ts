import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CrackTheCodeComponent } from './crack-the-code.component';
import { CrackTheCodeService } from './crack-the-code.service';

describe('CrackTheCodeComponent', () => {
  let component: CrackTheCodeComponent;
  let fixture: ComponentFixture<CrackTheCodeComponent>;
  let mockService: any;

  beforeEach(async () => {
    mockService = {
      attempts: signal([]),
      currentGuess: signal({ value: '' }),

      defaultTranslations: {
        title: 'Test',
        startGame: 'Start',
        restartGame: 'Restart',
        pauseGame: 'Pause',
        resumeGame: 'Resume',
        submitGuess: 'Submit',
        inputPlaceholder: 'Code',
        attemptsLabel: 'Attempts',
        attemptsHistoryLabel: 'History',
        correctPlaceLabel: 'Correct',
        wrongPlaceLabel: 'Wrong',
        gameWonMessage: 'Won',
        guessAlreadyTried: 'Already tried',
        secretCodeLabel: 'Code',
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
      imports: [CrackTheCodeComponent],
      providers: [{ provide: CrackTheCodeService, useValue: mockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CrackTheCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call startGame when start button clicked', () => {
    const button = fixture.debugElement.query(
      By.css('.header button:last-child'),
    );
    button.triggerEventHandler('click');
    expect(mockService.startGame).toHaveBeenCalled();
  });

  it('should call pauseGame when pause clicked', () => {
    mockService.isGamePaused.mockReturnValue(false);
    fixture.detectChanges();

    const pauseButton = fixture.debugElement.query(By.css('.buttons button'));
    pauseButton.triggerEventHandler('click');

    expect(mockService.pauseGame).toHaveBeenCalled();
  });

  it('should call resumeGame when paused', () => {
    mockService.isGamePaused.mockReturnValue(true);
    fixture.detectChanges();

    const pauseButton = fixture.debugElement.query(By.css('.buttons button'));
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
