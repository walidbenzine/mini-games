import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { signal } from '@angular/core';

import { MemoryComponent } from './memory.component';
import { MemoryService } from './memory.service';

describe('MemoryComponent', () => {
  let component: MemoryComponent;
  let fixture: ComponentFixture<MemoryComponent>;
  let serviceMock: any;

  beforeEach(async () => {
    serviceMock = {
      defaultTranslations: {
        startGame: 'Start Game',
        restartGame: 'Restart Game',
        resumeGame: 'Resume Game',
        pauseGame: 'Pause Game',
        attemptsLabel: 'Attempts',
        gameWonMessage: 'Won!',
        title: 'Memory',
      },

      startGame: vi.fn(),
      pauseGame: vi.fn(),
      resumeGame: vi.fn(),
      onClickCard: vi.fn(),

      isGameStarted: signal(false),
      isGamePaused: signal(false),
      isGameWon: signal(false),

      attempts: signal(0),
      timerLabel: signal('00:00'),
      cards: signal([]),
    };

    await TestBed.configureTestingModule({
      imports: [MemoryComponent],
      providers: [{ provide: MemoryService, useValue: serviceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(MemoryComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should start game with hiddenNumbers', () => {
    fixture.componentRef.setInput('hiddenNumbers', 10);
    fixture.detectChanges();

    component.startOrRestartGame();

    expect(serviceMock.startGame).toHaveBeenCalledWith(10);
  });

  it('should pause game when game is running', () => {
    serviceMock.isGamePaused.set(false);

    component.pauseOrResumeGame();

    expect(serviceMock.pauseGame).toHaveBeenCalled();
  });

  it('should resume game when game is paused', () => {
    serviceMock.isGamePaused.set(true);

    component.pauseOrResumeGame();

    expect(serviceMock.resumeGame).toHaveBeenCalled();
  });

  it('should merge default translations with custom translations', () => {
    fixture.componentRef.setInput('translations', {
      title: 'Custom Memory',
    });
    fixture.detectChanges();

    const texts = component.texts();

    expect(texts.title).toBe('Custom Memory');
    expect(texts.startGame).toBe('Start Game');
  });

  it('should pause game on destroy if game started and not won', () => {
    serviceMock.isGameStarted.set(true);
    serviceMock.isGameWon.set(false);
    serviceMock.isGamePaused.set(false);

    component.ngOnDestroy();

    expect(serviceMock.pauseGame).toHaveBeenCalled();
  });

  it('should not pause game on destroy if already paused', () => {
    serviceMock.isGameStarted.set(true);
    serviceMock.isGameWon.set(false);
    serviceMock.isGamePaused.set(true);

    component.ngOnDestroy();

    expect(serviceMock.pauseGame).not.toHaveBeenCalled();
  });

  it('should not pause game on destroy if game already won', () => {
    serviceMock.isGameStarted.set(true);
    serviceMock.isGameWon.set(true);
    serviceMock.isGamePaused.set(false);

    component.ngOnDestroy();

    expect(serviceMock.pauseGame).not.toHaveBeenCalled();
  });
});
