import { TilesEnum } from '../enums/tiles.enum';

export interface Tile {
  id: TilesEnum;
  color: string;
  active: boolean;
  sound: HTMLAudioElement | undefined;
}
