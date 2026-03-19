import { Component, computed, Signal } from '@angular/core';
import { SimonComponent, SimonTranslations, TilesEnum } from 'simon';
import { BaseTranslationsComponent } from '../../components/base/base-translations.component';
import { TranslatesEnum } from '../../enums/translates.enum';

@Component({
  selector: 'app-simon',
  template: `<simon
    [translations]="gameTranslations()"
    successSoundPath="./sounds/simon/success.mp3"
    errorSoundPath="./sounds/simon/error.mp3"
    [tilesSoundPath]="tilesSoundPath"
  ></simon>`,
  imports: [SimonComponent],
})
export class AppSimonComponent extends BaseTranslationsComponent {
  gameTranslations: Signal<SimonTranslations> = computed(() =>
    this.mapTranslations(this.translations()),
  );

  tilesSoundPath = new Map<TilesEnum, string>([
    [TilesEnum.GREEN, './sounds/simon/sound1.mp3'],
    [TilesEnum.RED, './sounds/simon/sound2.mp3'],
    [TilesEnum.YELLOW, './sounds/simon/sound3.mp3'],
    [TilesEnum.BLUE, './sounds/simon/sound4.mp3'],
  ]);

  protected getTextsList(): TranslatesEnum[] {
    return [
      TranslatesEnum.SIMON_TITLE,
      TranslatesEnum.SIMON_START_GAME,
      TranslatesEnum.SIMON_RESTART_GAME,
      TranslatesEnum.SIMON_PAUSE_GAME,
      TranslatesEnum.SIMON_RESUME_GAME,
      TranslatesEnum.SIMON_LEVEL,
      TranslatesEnum.SIMON_GAME_OVER,
      TranslatesEnum.SIMON_SOUND_ENABLED,
      TranslatesEnum.SIMON_INSTRUCTIONS,
    ];
  }

  private mapTranslations(
    translations: Map<TranslatesEnum, string>,
  ): SimonTranslations {
    return {
      title: translations.get(TranslatesEnum.SIMON_TITLE),
      startGame: translations.get(TranslatesEnum.SIMON_START_GAME),
      restartGame: translations.get(TranslatesEnum.SIMON_RESTART_GAME),
      pauseGame: translations.get(TranslatesEnum.SIMON_PAUSE_GAME),
      resumeGame: translations.get(TranslatesEnum.SIMON_RESUME_GAME),
      level: translations.get(TranslatesEnum.SIMON_LEVEL),
      gameOver: translations.get(TranslatesEnum.SIMON_GAME_OVER),
      soundEnabled: translations.get(TranslatesEnum.SIMON_SOUND_ENABLED),
      instructions: translations.get(TranslatesEnum.SIMON_INSTRUCTIONS),
    };
  }
}
