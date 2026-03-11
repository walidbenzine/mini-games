import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { MemoryService } from './memory.service';
import { Card } from './interfaces/card.interface';

describe('MemoryService', () => {
  let service: MemoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemoryService],
    });

    service = TestBed.inject(MemoryService);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start game properly', () => {
    service.startGame(3);

    expect(service.isGameStarted()).toBe(true);
    expect(service.isGamePaused()).toBe(false);
    expect(service.cards().length).toBe(6);
    expect(service.attempts()).toBe(0);
  });

  it('should generate pairs of cards', () => {
    service.startGame(4);

    const cards = service.cards();
    const values = cards.map((c) => c.value);

    const occurrences = values.reduce((acc: Record<number, number>, v) => {
      acc[v] = (acc[v] || 0) + 1;
      return acc;
    }, {});

    Object.values(occurrences).forEach((count) => {
      expect(count).toBe(2);
    });
  });

  it('should flip a card when clicked', () => {
    service.startGame(2);

    const card = service.cards()[0];

    service.onClickCard(card);

    expect(service.cards()[0].flipped).toBe(true);
  });

  it('should increment attempts after two flips', () => {
    service.startGame(2);

    const cards = service.cards();

    service.onClickCard(cards[0]);
    service.onClickCard(cards[1]);

    expect(service.attempts()).toBe(1);
  });

  it('should pause and resume game', () => {
    service.startGame(2);

    service.pauseGame();

    expect(service.isGamePaused()).toBe(true);
    expect(service.cards().every((c) => c.disabled)).toBe(true);

    service.resumeGame();

    expect(service.isGamePaused()).toBe(false);
    expect(service.cards().every((c) => !c.disabled)).toBe(true);
  });

  it('should increment timer', () => {
    vi.useFakeTimers();

    service.startGame(2);

    vi.advanceTimersByTime(3000);

    expect(service.timerLabel()).toBe('00:03');
  });

  it('should detect win when all cards matched', () => {
    service.startGame(1);

    const cards = service.cards();

    const forced: Card[] = cards.map((c) => ({
      ...c,
      flipped: true,
      matched: true,
    }));

    (service as any)._cards.set(forced);

    expect(service.isGameWon()).toBe(true);
  });

  it('should stop timer on destroy', () => {
    vi.useFakeTimers();

    service.startGame(2);

    service.ngOnDestroy();

    const timeAfterDestroy = service.timerLabel();

    vi.advanceTimersByTime(5000);

    expect(service.timerLabel()).toBe(timeAfterDestroy);
  });

  it('should mark cards as matched when two identical cards are flipped', () => {
    service.startGame(2);

    const cards = service.cards();

    // Force deterministic values
    const forced = [
      { ...cards[0], value: 1 },
      { ...cards[1], value: 1 },
      { ...cards[2], value: 2 },
      { ...cards[3], value: 2 },
    ];

    (service as any)._cards.set(forced);

    service.onClickCard(forced[0]);
    service.onClickCard(forced[1]);

    const updated = service.cards();

    expect(updated[0].matched).toBe(true);
    expect(updated[1].matched).toBe(true);
  });

  it('should unflip cards after 500ms when they do not match', () => {
    vi.useFakeTimers();

    service.startGame(2);

    const cards = service.cards();

    // Force deterministic values
    const forced = [
      { ...cards[0], value: 1 },
      { ...cards[1], value: 2 },
      { ...cards[2], value: 1 },
      { ...cards[3], value: 2 },
    ];

    (service as any)._cards.set(forced);

    service.onClickCard(forced[0]);
    service.onClickCard(forced[1]);

    vi.advanceTimersByTime(500);

    const updated = service.cards();

    expect(updated[0].flipped).toBe(false);
    expect(updated[1].flipped).toBe(false);
  });

  it('should not flip cards when game is paused', () => {
    service.startGame(2);
    service.pauseGame();
    service.onClickCard(service.cards()[0]);
    expect(service.cards()[0].flipped).toBe(false);
  });
});
