import { Component, computed, Signal } from '@angular/core';
import {
  GuessTheNumberComponent,
  GuessTheNumberTranslations,
} from 'guess-the-number';
import { BaseTranslationsComponent } from '../../components/base/base-translations.component';
import { TranslatesEnum } from '../../enums/translates.enum';

@Component({
  selector: 'app-guess-the-number',
  template: `<guess-the-number
    [translations]="gameTranslations()"
  ></guess-the-number>`,
  styles: `
    guess-the-number {
      width: 100dvw;
      height: 100dvh;
    }
  `,
  imports: [GuessTheNumberComponent],
})
export class AppGuessTheNumberComponent extends BaseTranslationsComponent {
  gameTranslations: Signal<GuessTheNumberTranslations> = computed(() => {
    return {
      startGame: this.translations().get(
        TranslatesEnum.GUESS_THE_NUMBER_START_GAME,
      ),

      title: this.translations().get(TranslatesEnum.GUESS_THE_NUMBER_TITLE),
      restartGame: this.translations().get(
        TranslatesEnum.GUESS_THE_NUMBER_RESTART_GAME,
      ),
      pauseGame: this.translations().get(
        TranslatesEnum.GUESS_THE_NUMBER_PAUSE_GAME,
      ),
      resumeGame: this.translations().get(
        TranslatesEnum.GUESS_THE_NUMBER_RESUME_GAME,
      ),
      secretCodeLabel: this.translations().get(
        TranslatesEnum.GUESS_THE_NUMBER_SECRET_CODE_LABEL,
      ),
      attemptsLabel: this.translations().get(
        TranslatesEnum.GUESS_THE_NUMBER_ATTEMPTS_LABEL,
      ),
      inputPlaceholder: this.translations().get(
        TranslatesEnum.GUESS_THE_NUMBER_INPUT_PLACEHOLDER,
      ),
      guessAlreadyTried: this.translations().get(
        TranslatesEnum.GUESS_THE_NUMBER_GUESS_ALREADY_TRIED,
      ),
      submitGuess: this.translations().get(
        TranslatesEnum.GUESS_THE_NUMBER_SUBMIT_GUESS,
      ),
      attemptsHistoryLabel: this.translations().get(
        TranslatesEnum.GUESS_THE_NUMBER_ATTEMPTS_HISTORY_LABEL,
      ),
      isEqual: this.translations().get(
        TranslatesEnum.GUESS_THE_NUMBER_IS_EQUAL_LABEL,
      ),
      isLess: this.translations().get(
        TranslatesEnum.GUESS_THE_NUMBER_IS_LESS_LABEL,
      ),
      isGreater: this.translations().get(
        TranslatesEnum.GUESS_THE_NUMBER_IS_GREATER_LABEL,
      ),
      gameWonMessage: this.translations().get(
        TranslatesEnum.GUESS_THE_NUMBER_GAME_WON_MESSAGE,
      ),
    };
  });

  protected getTextsList(): TranslatesEnum[] {
    return [
      TranslatesEnum.GUESS_THE_NUMBER_START_GAME,
      TranslatesEnum.GUESS_THE_NUMBER_TITLE,
      TranslatesEnum.GUESS_THE_NUMBER_RESTART_GAME,
      TranslatesEnum.GUESS_THE_NUMBER_RESUME_GAME,
      TranslatesEnum.GUESS_THE_NUMBER_PAUSE_GAME,
      TranslatesEnum.GUESS_THE_NUMBER_SECRET_CODE_LABEL,
      TranslatesEnum.GUESS_THE_NUMBER_ATTEMPTS_LABEL,
      TranslatesEnum.GUESS_THE_NUMBER_INPUT_PLACEHOLDER,
      TranslatesEnum.GUESS_THE_NUMBER_GUESS_ALREADY_TRIED,
      TranslatesEnum.GUESS_THE_NUMBER_SUBMIT_GUESS,
      TranslatesEnum.GUESS_THE_NUMBER_ATTEMPTS_HISTORY_LABEL,
      TranslatesEnum.GUESS_THE_NUMBER_IS_EQUAL_LABEL,
      TranslatesEnum.GUESS_THE_NUMBER_IS_LESS_LABEL,
      TranslatesEnum.GUESS_THE_NUMBER_IS_GREATER_LABEL,
      TranslatesEnum.GUESS_THE_NUMBER_GAME_WON_MESSAGE,
    ];
  }
}
