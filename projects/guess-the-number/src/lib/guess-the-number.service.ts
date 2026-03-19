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
    instructions: `
      <h3>How to play</h3>
      <p>Find the secret number.</p>
      <ul>
        <li>Click <strong>"Start"</strong> to begin.</li>
        <li>Enter a number.</li>
        <li>Submit your guess.</li>
        <li>If it's too high → number is lower.</li>
        <li>If it's too low → number is greater.</li>
        <li>Use hints to find the answer.</li>
      </ul>
      <p><strong>Good luck!</strong></p>
    `,
  };

  private secretNumber: number = 0;
  private timerRef: ReturnType<typeof setInterval> | undefined;
  private readonly elapsedSeconds = signal(0);

  readonly numberLength = 4;

  private readonly _isGameStarted = signal(false);
  readonly isGameStarted = this._isGameStarted.asReadonly();

  private readonly _isGamePaused = signal(false);
  readonly isGamePaused = this._isGamePaused.asReadonly();

  private readonly _isGameWon = signal(false);
  readonly isGameWon = this._isGameWon.asReadonly();

  private readonly _currentGuess = signal<number | null>(null);
  readonly currentGuess = this._currentGuess.asReadonly();

  private readonly _attempts = signal<AttemptFeedback[]>([]);
  readonly attempts = this._attempts.asReadonly();

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
    this._isGameStarted.set(true);
    this._isGamePaused.set(false);
    this._isGameWon.set(false);
    this._currentGuess.set(null);
    this.elapsedSeconds.set(0);
    this._attempts.set([]);

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
    this._isGamePaused.set(true);
    this.stopTimer();
  }

  resumeGame(): void {
    this._isGamePaused.set(false);
    this.startTimer();
  }

  updateCurrentGuess(value: string): void {
    const sanitized = value.replace(/\D/g, '').slice(0, this.numberLength);
    this._currentGuess.set(+sanitized);
  }

  submitGuess(): void {
    if (!this.canSubmitGuess()) {
      return;
    }

    const result = this.evaluateGuess();

    this._attempts.update((currentAttempts) => [
      {
        guess: this.currentGuess() as number,
        ...result,
      },
      ...currentAttempts,
    ]);

    if (result.isEqual) {
      this._isGameWon.set(true);
      this.stopTimer();
    }

    this._currentGuess.set(null);
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
