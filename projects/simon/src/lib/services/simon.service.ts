import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { SimonTranslations } from '../interfaces/simon-translations.interface';
import { TilesEnum } from '../enums/tiles.enum';
import { Tile } from '../interfaces/tile.interface';
import { TilesService } from './tiles.service';

@Injectable({ providedIn: 'root' })
export class SimonService {
  private readonly tilesService = inject(TilesService);

  readonly defaultTranslations: SimonTranslations = {
    title: 'Simon game',
    startGame: 'Start game',
    restartGame: 'Restart game',
    resumeGame: 'Resume game',
    pauseGame: 'Pause game',
    level: 'Level',
    gameOver: 'Game over',
    soundEnabled: 'Game sound',
  };

  private readonly sequence = signal<TilesEnum[]>([]);
  private readonly playerInput = signal<TilesEnum[]>([]);
  private readonly isPlayingSequence = signal(false);
  private readonly isGoingToNextRound = signal(false);

  private readonly successSound = signal<HTMLAudioElement | undefined>(
    undefined,
  );
  private readonly errorSound = signal<HTMLAudioElement | undefined>(undefined);

  readonly tiles: Signal<Tile[]> = computed(() => this.tilesService.tiles());

  private readonly _level = signal(0);
  readonly level = this._level.asReadonly();

  private readonly _gameOver = signal(false);
  readonly gameOver = this._gameOver.asReadonly();

  private readonly hasSoundAssets = computed(
    () =>
      !!this.successSound() ||
      !!this.errorSound() ||
      this.tiles().some((t) => !!t.sound),
  );

  private readonly _soundEnabled = signal(true);
  readonly soundEnabled = computed(
    () => this.hasSoundAssets() && this._soundEnabled(),
  );

  private readonly _isGameStarted = signal(false);
  readonly isGameStarted = this._isGameStarted.asReadonly();

  private readonly _isGamePaused = signal(false);
  readonly isGamePaused = this._isGamePaused.asReadonly();

  private timerRef: ReturnType<typeof setInterval> | undefined;
  readonly timerLabel = computed(() => {
    const totalSeconds = this.elapsedSeconds();
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');

    return `${minutes}:${seconds}`;
  });

  private readonly _elapsedSeconds = signal(0);
  readonly elapsedSeconds = this._elapsedSeconds.asReadonly();

  readonly disableClickTile: Signal<boolean> = computed(
    () =>
      !this.isGameStarted() ||
      this.isPlayingSequence() ||
      this.gameOver() ||
      this.isGoingToNextRound() ||
      this.isGamePaused(),
  );

  readonly disableButtons: Signal<boolean> = computed(
    () => this.isPlayingSequence() || this.isGoingToNextRound(),
  );

  setAssets(
    successSoundPath: string | undefined,
    errorSoundPath: string | undefined,
    tilesSoundPath: Map<TilesEnum, string> | undefined,
  ): void {
    this.updateSuccessSound(successSoundPath);
    this.updateErrorSound(errorSoundPath);
    this.tilesService.updateTilesSound(tilesSoundPath);
  }

  private updateSuccessSound(successSoundPath: string | undefined): void {
    this.successSound.set(new Audio(successSoundPath));
  }

  private updateErrorSound(errorSoundPath: string | undefined): void {
    this.errorSound.set(new Audio(errorSoundPath));
  }

  changeSoundEnability(isEnabled: boolean): void {
    this._soundEnabled.set(isEnabled);
  }

  private playErrorSound(): void {
    if (this.soundEnabled()) {
      const errorSound = this.errorSound();
      if (errorSound) {
        errorSound.currentTime = 0;
        errorSound.play();
      }
    }
  }

  private playSuccessSound(): void {
    if (this.soundEnabled()) {
      const successSound = this.successSound();
      if (successSound) {
        successSound.currentTime = 0;
        successSound.play();
      }
    }
  }

  pauseGame(): void {
    if (!this.gameOver()) {
      this.stopTimer();
      this._isGamePaused.set(true);
    }
  }

  resumeGame(): void {
    this.startTimer();
    this._isGamePaused.set(false);
  }

  startGame(): void {
    this.stopTimer();

    this.sequence.set([]);
    this.playerInput.set([]);
    this._level.set(0);
    this.isPlayingSequence.set(false);
    this.isGoingToNextRound.set(false);
    this._gameOver.set(false);
    this._isGameStarted.set(true);
    this._isGamePaused.set(false);
    this._elapsedSeconds.set(0);

    this.startTimer();

    setTimeout(() => this.nextRound(), 500);
  }

  private startTimer(): void {
    this.timerRef = setInterval(() => {
      this._elapsedSeconds.update((seconds) => seconds + 1);
    }, 1000);
  }

  private stopTimer(): void {
    if (!this.timerRef) {
      return;
    }

    clearInterval(this.timerRef);
    this.timerRef = undefined;
  }

  nextRound(): void {
    this._level.update((v) => v + 1);
    const randomTile = Math.floor(Math.random() * 4);
    this.sequence.update((seq) => [...seq, randomTile]);
    this.isGoingToNextRound.set(false);
    this.playSequence();
  }

  async playSequence(): Promise<void> {
    this.isPlayingSequence.set(true);

    for (const id of this.sequence()) {
      this.activateTile(id);

      await this.delay(600);

      this.tilesService.deactivateTile(id);

      await this.delay(200);
    }

    this.playerInput.set([]);
    this.isPlayingSequence.set(false);
  }

  clickTile(id: number): void {
    if (this.disableClickTile()) {
      return;
    }

    this.activateTile(id);
    setTimeout(() => this.tilesService.deactivateTile(id), 200);

    this.playerInput.update((v) => [...v, id]);

    this.checkPlayerMove();
  }

  private checkPlayerMove(): void {
    const input = this.playerInput();
    const sequence = this.sequence();

    const currentIndex = input.length - 1;

    if (input[currentIndex] !== sequence[currentIndex]) {
      this.playErrorSound();
      this.stopTimer();
      this._gameOver.set(true);
      return;
    }

    if (input.length === sequence.length) {
      this.isGoingToNextRound.set(true);
      setTimeout(() => this.playSuccessSound(), 200);
      setTimeout(() => this.nextRound(), 1000);
    }
  }

  private activateTile(id: TilesEnum): void {
    this.tilesService.activateTile(id, this.soundEnabled());
  }

  private delay(ms: number): Promise<any> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
