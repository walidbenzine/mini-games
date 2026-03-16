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
      title: translations.get(TranslatesEnum.MEMORY_TITLE),
      startGame: translations.get(TranslatesEnum.MEMORY_START_GAME),
      restartGame: translations.get(TranslatesEnum.MEMORY_RESTART_GAME),
      pauseGame: translations.get(TranslatesEnum.MEMORY_PAUSE_GAME),
      resumeGame: translations.get(TranslatesEnum.MEMORY_RESUME_GAME),
      attemptsLabel: translations.get(TranslatesEnum.MEMORY_ATTEMPTS_LABEL),
      gameWonMessage: translations.get(TranslatesEnum.MEMORY_GAME_WON_MESSAGE),
    };
  }
}
