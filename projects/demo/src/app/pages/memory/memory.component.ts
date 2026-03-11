import { Component, computed, Signal } from '@angular/core';
import { MemoryComponent, MemoryTranslations } from 'memory';
import { BaseTranslationsComponent } from '../../components/base/base-translations.component';
import { TranslatesEnum } from '../../enums/translates.enum';

@Component({
  selector: 'app-memory',
  template: `<memory [translations]="gameTranslations()"></memory>`,
  styles: `
    memory {
      width: 100dvw;
      height: 100dvh;
    }
  `,
  imports: [MemoryComponent],
})
export class AppMemoryComponent extends BaseTranslationsComponent {
  gameTranslations: Signal<MemoryTranslations> = computed(() =>
    this.mapTranslations(this.translations()),
  );

  protected getTextsList(): TranslatesEnum[] {
    return [
      TranslatesEnum.MEMORY_TITLE,
      TranslatesEnum.MEMORY_START_GAME,
      TranslatesEnum.MEMORY_RESTART_GAME,
      TranslatesEnum.MEMORY_PAUSE_GAME,
      TranslatesEnum.MEMORY_RESUME_GAME,
      TranslatesEnum.MEMORY_ATTEMPTS_LABEL,
      TranslatesEnum.MEMORY_GAME_WON_MESSAGE,
    ];
  }

  private mapTranslations(
    translations: Map<TranslatesEnum, string>,
  ): MemoryTranslations {
    return {
      title: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.MEMORY_TITLE,
      ),
      startGame: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.MEMORY_START_GAME,
      ),
      restartGame: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.MEMORY_RESTART_GAME,
      ),
      pauseGame: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.MEMORY_PAUSE_GAME,
      ),
      resumeGame: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.MEMORY_RESUME_GAME,
      ),
      attemptsLabel: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.MEMORY_ATTEMPTS_LABEL,
      ),
      gameWonMessage: this.getTranslationOrUndefined(
        translations,
        TranslatesEnum.MEMORY_GAME_WON_MESSAGE,
      ),
    };
  }

  private getTranslationOrUndefined(
    translations: Map<TranslatesEnum, string>,
    key: TranslatesEnum,
  ): string | undefined {
    return translations.get(key) || undefined;
  }
}
