import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {
  MatFormField,
  MatHint,
  MatInput,
  MatInputModule,
} from '@angular/material/input';
import { GuessTheNumberService } from './guess-the-number.service';
import { GuessTheNumberTranslations } from './interfaces/guess-the-number-translations.interface';

@Component({
  selector: 'guess-the-number',
  imports: [MatButtonModule, MatInputModule, MatFormField, MatDivider, MatHint],
  templateUrl: './guess-the-number.component.html',
  styleUrls: ['./guess-the-number.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuessTheNumberComponent implements OnDestroy {
  readonly game = inject(GuessTheNumberService);

  @ViewChild('inputGuess') guessInput!: ElementRef<MatInput>;

  translations = input<GuessTheNumberTranslations>();

  currentValue = computed(() => this.game.currentGuess());

  texts = computed(() => ({
    ...this.game.defaultTranslations,
    ...this.translations(),
  }));

  constructor() {
    effect(() => {
      const newGuess = this.game.currentGuess();
      if (this.guessInput) {
        this.guessInput.nativeElement.value = newGuess;
      }
    });
  }

  startOrRestartGame(): void {
    this.game.startGame();
  }

  pauseOrResumeGame(): void {
    this.game.isGamePaused() ? this.game.resumeGame() : this.game.pauseGame();
  }

  onGuessInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.game.updateCurrentGuess(target.value);
  }

  submitGuess(): void {
    this.game.submitGuess();
  }

  ngOnDestroy(): void {
    const shouldPauseGameOnDestroy =
      this.game.isGameStarted() &&
      !this.game.isGameWon() &&
      !this.game.isGamePaused();
    shouldPauseGameOnDestroy && this.game.pauseGame();
  }
}
