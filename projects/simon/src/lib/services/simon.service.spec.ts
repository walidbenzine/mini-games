import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { SimonService } from './simon.service';
import { TilesService } from './tiles.service';
import { TilesEnum } from '../enums/tiles.enum';

describe('SimonService', () => {
  let service: SimonService;

  const activateTileMock = vi.fn();
  const deactivateTileMock = vi.fn();

  const tilesServiceMock = {
    tiles: vi.fn(() => []),
    activateTile: activateTileMock,
    deactivateTile: deactivateTileMock,
    updateTilesSound: vi.fn(),
  };

  let playMock: any;

  beforeEach(() => {
    vi.useFakeTimers();

    playMock = vi.fn();

    class AudioMock {
      currentTime = 0;
      play = playMock;
    }

    vi.spyOn(globalThis, 'Audio').mockImplementation(function () {
      return new AudioMock() as any;
    });

    TestBed.configureTestingModule({
      providers: [
        SimonService,
        { provide: TilesService, useValue: tilesServiceMock },
      ],
    });

    service = TestBed.inject(SimonService);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start game properly', () => {
    service.startGame();

    expect(service.isGameStarted()).toBe(true);
    expect(service.level()).toBe(0);
    expect(service.gameOver()).toBe(false);
  });

  it('should increment timer', () => {
    service.startGame();

    vi.advanceTimersByTime(3000);

    expect(service.elapsedSeconds()).toBe(3);
    expect(service.timerLabel()).toBe('00:03');
  });

  it('should pause and resume game', () => {
    service.startGame();

    service.pauseGame();

    expect(service.isGamePaused()).toBe(true);

    service.resumeGame();

    expect(service.isGamePaused()).toBe(false);
  });

  it('should go to next round', () => {
    service.startGame();

    vi.advanceTimersByTime(500);

    expect(service.level()).toBe(1);
  });

  it('should activate tile when clicking', () => {
    service.startGame();

    (service as any).sequence.set([TilesEnum.GREEN]);

    service.clickTile(TilesEnum.GREEN);

    expect(activateTileMock).toHaveBeenCalled();
  });

  it('should trigger game over on wrong move', () => {
    service.setAssets('success.mp3', 'error.mp3', undefined);
    service.startGame();

    (service as any).sequence.set([TilesEnum.GREEN]);

    service.clickTile(TilesEnum.RED);

    expect(service.gameOver()).toBe(true);
    expect(playMock).toHaveBeenCalled();
  });

  it('should go to next round when player completes sequence', () => {
    service.startGame();

    (service as any).sequence.set([TilesEnum.GREEN]);

    service.clickTile(TilesEnum.GREEN);

    vi.advanceTimersByTime(1000);

    expect(service.level()).toBeGreaterThanOrEqual(1);
  });

  it('should disable tile click while sequence is playing', () => {
    service.startGame();

    (service as any).isPlayingSequence.set(true);

    service.clickTile(TilesEnum.GREEN);

    expect(activateTileMock).not.toHaveBeenCalled();
  });

  it('should enable and disable sound', () => {
    service.changeSoundEnability(false);

    expect(service.soundEnabled()).toBe(false);

    service.changeSoundEnability(true);

    expect(service.soundEnabled()).toBe(true);
  });
});
