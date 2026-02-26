import { Component, computed, Signal } from '@angular/core';
import {
  CrackTheCodeComponent,
  CrackTheCodeTranslations,
} from 'crack-the-code';
import { BaseTranslationsComponent } from '../../components/base/base-translations.component';
import { TranslatesEnum } from '../../enums/translates.enum';

@Component({
  selector: 'app-crack-the-code',
  template: `<crack-the-code
    [translations]="gameTranslations()"
  ></crack-the-code>`,
  styles: `
    crack-the-code {
      width: 100dvw;
      height: 100dvh;
    }
  `,
  imports: [CrackTheCodeComponent],
})
export class AppCrackTheCodeComponent extends BaseTranslationsComponent {
  gameTranslations: Signal<CrackTheCodeTranslations> = computed(() => {
    return {
      startGame: this.translations().get(
        TranslatesEnum.CRACK_THE_CODE_START_GAME,
      ),

      title: this.translations().get(TranslatesEnum.CRACK_THE_CODE_TITLE),
      restartGame: this.translations().get(
        TranslatesEnum.CRACK_THE_CODE_RESTART_GAME,
      ),
      pauseGame: this.translations().get(
        TranslatesEnum.CRACK_THE_CODE_PAUSE_GAME,
      ),
      resumeGame: this.translations().get(
        TranslatesEnum.CRACK_THE_CODE_RESUME_GAME,
      ),
      secretCodeLabel: this.translations().get(
        TranslatesEnum.CRACK_THE_CODE_SECRET_CODE_LABEL,
      ),
      attemptsLabel: this.translations().get(
        TranslatesEnum.CRACK_THE_CODE_ATTEMPTS_LABEL,
      ),
      inputPlaceholder: this.translations().get(
        TranslatesEnum.CRACK_THE_CODE_INPUT_PLACEHOLDER,
      ),
      guessAlreadyTried: this.translations().get(
        TranslatesEnum.CRACK_THE_CODE_GUESS_ALREADY_TRIED,
      ),
      submitGuess: this.translations().get(
        TranslatesEnum.CRACK_THE_CODE_SUBMIT_GUESS,
      ),
      attemptsHistoryLabel: this.translations().get(
        TranslatesEnum.CRACK_THE_CODE_ATTEMPTS_HISTORY_LABEL,
      ),
      correctPlaceLabel: this.translations().get(
        TranslatesEnum.CRACK_THE_CODE_CORRECT_PLACE_LABEL,
      ),
      wrongPlaceLabel: this.translations().get(
        TranslatesEnum.CRACK_THE_CODE_WRONG_PLACE_LABEL,
      ),
      gameWonMessage: this.translations().get(
        TranslatesEnum.CRACK_THE_CODE_GAME_WON_MESSAGE,
      ),
    };
  });

  protected getTextsList(): TranslatesEnum[] {
    return [
      TranslatesEnum.CRACK_THE_CODE_START_GAME,
      TranslatesEnum.CRACK_THE_CODE_TITLE,
      TranslatesEnum.CRACK_THE_CODE_RESTART_GAME,
      TranslatesEnum.CRACK_THE_CODE_RESUME_GAME,
      TranslatesEnum.CRACK_THE_CODE_PAUSE_GAME,
      TranslatesEnum.CRACK_THE_CODE_SECRET_CODE_LABEL,
      TranslatesEnum.CRACK_THE_CODE_ATTEMPTS_LABEL,
      TranslatesEnum.CRACK_THE_CODE_INPUT_PLACEHOLDER,
      TranslatesEnum.CRACK_THE_CODE_GUESS_ALREADY_TRIED,
      TranslatesEnum.CRACK_THE_CODE_SUBMIT_GUESS,
      TranslatesEnum.CRACK_THE_CODE_ATTEMPTS_HISTORY_LABEL,
      TranslatesEnum.CRACK_THE_CODE_CORRECT_PLACE_LABEL,
      TranslatesEnum.CRACK_THE_CODE_WRONG_PLACE_LABEL,
      TranslatesEnum.CRACK_THE_CODE_GAME_WON_MESSAGE,
    ];
  }
}
