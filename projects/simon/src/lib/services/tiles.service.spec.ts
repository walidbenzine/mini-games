import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TilesService } from './tiles.service';
import { TilesEnum } from '../enums/tiles.enum';

describe('TilesService', () => {
  let service: TilesService;
  let playMock: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TilesService],
    });

    service = TestBed.inject(TilesService);

    playMock = vi.fn();

    class AudioMock {
      currentTime = 0;
      play = playMock;
    }

    vi.spyOn(globalThis, 'Audio').mockImplementation(function () {
      return new AudioMock() as any;
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with 4 inactive tiles', () => {
    const tiles = service.tiles();

    expect(tiles.length).toBe(4);
    expect(tiles.every((t) => t.active === false)).toBe(true);
  });

  it('should update tile sounds', () => {
    const audioSpy = vi.spyOn(globalThis, 'Audio');

    const soundMap = new Map([
      [TilesEnum.GREEN, 'green.mp3'],
      [TilesEnum.RED, 'red.mp3'],
    ]);

    service.updateTilesSound(soundMap);

    const tiles = service.tiles();

    expect(audioSpy).toHaveBeenCalledTimes(2);
    expect(tiles.find((t) => t.id === TilesEnum.GREEN)?.sound).toBeDefined();
    expect(tiles.find((t) => t.id === TilesEnum.RED)?.sound).toBeDefined();
  });

  it('should activate a tile', () => {
    service.activateTile(TilesEnum.GREEN, false);

    const tile = service.tiles().find((t) => t.id === TilesEnum.GREEN);

    expect(tile?.active).toBe(true);
  });

  it('should deactivate a tile', () => {
    service.activateTile(TilesEnum.GREEN, false);
    service.deactivateTile(TilesEnum.GREEN);

    const tile = service.tiles().find((t) => t.id === TilesEnum.GREEN);

    expect(tile?.active).toBe(false);
  });

  it('should play sound when tile is activated with sound enabled', () => {
    const soundMap = new Map([[TilesEnum.GREEN, 'green.mp3']]);

    service.updateTilesSound(soundMap);

    service.activateTile(TilesEnum.GREEN, true);

    expect(playMock).toHaveBeenCalled();
  });

  it('should not play sound when sound is disabled', () => {
    const soundMap = new Map([[TilesEnum.GREEN, 'green.mp3']]);

    service.updateTilesSound(soundMap);

    service.activateTile(TilesEnum.GREEN, false);

    expect(playMock).not.toHaveBeenCalled();
  });
});
