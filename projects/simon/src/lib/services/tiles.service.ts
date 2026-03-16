import {
  computed,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { TilesEnum } from '../enums/tiles.enum';
import { Tile } from '../interfaces/tile.interface';

@Injectable({ providedIn: 'root' })
export class TilesService {
  private readonly greenTile = signal<Tile>({
    id: TilesEnum.GREEN,
    color: 'green',
    active: false,
    sound: undefined,
  });

  private readonly redTile = signal<Tile>({
    id: TilesEnum.RED,
    color: 'red',
    active: false,
    sound: undefined,
  });

  private readonly yellowTile = signal<Tile>({
    id: TilesEnum.YELLOW,
    color: 'yellow',
    active: false,
    sound: undefined,
  });

  private readonly blueTile = signal<Tile>({
    id: TilesEnum.BLUE,
    color: 'blue',
    active: false,
    sound: undefined,
  });

  private readonly tileMap = new Map<TilesEnum, WritableSignal<Tile>>([
    [TilesEnum.GREEN, this.greenTile],
    [TilesEnum.RED, this.redTile],
    [TilesEnum.YELLOW, this.yellowTile],
    [TilesEnum.BLUE, this.blueTile],
  ]);

  readonly tiles: Signal<Tile[]> = computed(() => [
    this.greenTile(),
    this.redTile(),
    this.yellowTile(),
    this.blueTile(),
  ]);

  updateTilesSound(tilesSoundPath: Map<TilesEnum, string> | undefined): void {
    tilesSoundPath?.forEach((soundPath: string, tile: TilesEnum) => {
      const tileSignal = this.getTileById(tile);
      tileSignal?.update((tile) => {
        return {
          ...tile,
          sound: new Audio(soundPath),
        };
      });
    });
  }

  private getTileById(id: TilesEnum): WritableSignal<Tile> | undefined {
    return this.tileMap.get(id);
  }

  activateTile(id: TilesEnum, isSoundEnabled: boolean): void {
    const tileSignal = this.getTileById(id);
    if (tileSignal) {
      isSoundEnabled && this.playTileSound(tileSignal());
      tileSignal.update((tile) => {
        return {
          ...tile,
          active: true,
        };
      });
    }
  }

  private playTileSound(tile: Tile): void {
    if (tile?.sound) {
      tile.sound.currentTime = 0;
      tile.sound?.play();
    }
  }

  deactivateTile(id: TilesEnum): void {
    const tileSignal = this.getTileById(id);
    tileSignal?.update((tile) => {
      return {
        ...tile,
        active: false,
      };
    });
  }
}
