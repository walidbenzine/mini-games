import { Injectable, OnDestroy, computed, signal } from '@angular/core';
import { GuessTheNumberTranslations } from './interfaces/guess-the-number-translations.interface';

interface AttemptFeedback {
  guess: number;
  isLess: boolean;
  isGreater: boolean;
  isEqual: boolean;
}

@Injectable({ providedIn: 'root' })
export class GuessTheNumberService implements OnDestroy {
  readonly defaultTranslations: GuessTheNumberTranslations = {
    startGame: 'Start Game',
    secretCodeLabel: 'Secret Code',
    restartGame: 'Restart Game',
    resumeGame: 'Resume Game',
    pauseGame: 'Pause Game',
    attemptsLabel: 'Attempts',
    inputPlaceholder: 'Enter your guess',
    guessAlreadyTried: 'You already tried this guess!',
    submitGuess: 'Submit Guess',
    attemptsHistoryLabel: 'Attempts History',
    isLess: 'The secret number is lower',
    isGreater: 'The secret number is greater',
    isEqual: 'Is the secret number',
    gameWonMessage: 'Congratulations! You guessed the number!',
    title: 'Guess the number',
  };

  private secretNumber: number = 0;
  private timerRef: ReturnType<typeof setInterval> | undefined;
  private readonly elapsedSeconds = signal(0);

  readonly numberLength = 4;
  readonly isGameStarted = signal(false);
  readonly isGamePaused = signal(false);
  readonly isGameWon = signal(false);
  readonly currentGuess = signal<number | null>(null);
  readonly attempts = signal<AttemptFeedback[]>([]);

  readonly codeToPrint = computed(() => {
    if (!this.isGameStarted()) {
      return '';
    }

    if (this.isGameWon()) {
      return this.secretNumber;
    }

    return '*'.repeat(this.numberLength);
  });

  readonly canSubmitGuess = computed(
    () =>
      this.isGameStarted() &&
      !this.isGamePaused() &&
      !this.isGameWon() &&
      !this.alreadyTriedThisGuess(),
  );

  readonly alreadyTriedThisGuess = computed(() => {
    return this.attempts().some(
      (attempt) => attempt.guess === this.currentGuess(),
    );
  });

  readonly timerLabel = computed(() => {
    const totalSeconds = this.elapsedSeconds();
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');

    return `${minutes}:${seconds}`;
  });

  startGame(): void {
    this.stopTimer();

    this.secretNumber = this.generateCode();
    this.isGameStarted.set(true);
    this.isGamePaused.set(false);
    this.isGameWon.set(false);
    this.currentGuess.set(null);
    this.elapsedSeconds.set(0);
    this.attempts.set([]);

    this.startTimer();
  }

  private generateCode(): number {
    return Math.floor(Math.random() * 10000);
  }

  private startTimer(): void {
    this.timerRef = setInterval(() => {
      this.elapsedSeconds.update((seconds) => seconds + 1);
    }, 1000);
  }

  pauseGame(): void {
    this.isGamePaused.set(true);
    this.stopTimer();
  }

  resumeGame(): void {
    this.isGamePaused.set(false);
    this.startTimer();
  }

  updateCurrentGuess(value: string): void {
    const sanitized = value.replace(/\D/g, '').slice(0, this.numberLength);
    this.currentGuess.set(+sanitized);
  }

  submitGuess(): void {
    if (!this.canSubmitGuess()) {
      return;
    }

    const result = this.evaluateGuess();

    this.attempts.update((currentAttempts) => [
      {
        guess: this.currentGuess() as number,
        ...result,
      },
      ...currentAttempts,
    ]);

    if (result.isEqual) {
      this.isGameWon.set(true);
      this.stopTimer();
    }

    this.currentGuess.set(null);
  }

  private evaluateGuess(): {
    isLess: boolean;
    isGreater: boolean;
    isEqual: boolean;
  } {
    return {
      isLess: this.secretNumber < (this.currentGuess() as number),
      isGreater: this.secretNumber > (this.currentGuess() as number),
      isEqual: this.secretNumber === this.currentGuess(),
    };
  }

  private stopTimer(): void {
    if (!this.timerRef) {
      return;
    }

    clearInterval(this.timerRef);
    this.timerRef = undefined;
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }
}
