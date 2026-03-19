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
import { MatButton } from '@angular/material/button';
import {
  MatFormField,
  MatHint,
  MatInput,
  MatLabel,
} from '@angular/material/input';
import { CrackTheCodeService } from './crack-the-code.service';
import { CrackTheCodeTranslations } from './interfaces/crack-the-code-translations.interface';

@Component({
  selector: 'crack-the-code',
  imports: [MatButton, MatInput, MatFormField, MatDivider, MatHint, MatLabel],
  templateUrl: './crack-the-code.component.html',
  styleUrls: ['./crack-the-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrackTheCodeComponent implements OnDestroy {
  readonly game = inject(CrackTheCodeService);

  @ViewChild('inputGuess') guessInput!: ElementRef<MatInput>;

  translations = input<CrackTheCodeTranslations>();

  currentValue = computed(() => this.game.currentGuess());

  texts = computed(() => ({
    ...this.game.defaultTranslations,
    ...this.translations(),
  }));

  constructor() {
    effect(() => {
      const newGuess = this.game.currentGuess();
      if (this.guessInput) {
        this.guessInput.nativeElement.value = newGuess.value;
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
