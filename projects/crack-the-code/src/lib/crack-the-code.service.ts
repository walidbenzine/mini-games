import { Injectable, OnDestroy, computed, signal } from '@angular/core';
import { CrackTheCodeTranslations } from './interfaces/crack-the-code-translations.interface';

interface AttemptFeedback {
  guess: string;
  correctPlace: number;
  wrongPlace: number;
}

@Injectable()
export class CrackTheCodeService implements OnDestroy {
  readonly defaultTranslations: CrackTheCodeTranslations = {
    startGame: 'Start Game',
    secretCodeLabel: 'Secret Code',
    restartGame: 'Restart Game',
    attemptsLabel: 'Attempts',
    inputPlaceholder: 'Enter your guess',
    guessAlreadyTried: 'You already tried this guess!',
    submitGuess: 'Submit Guess',
    attemptsHistoryLabel: 'Attempts History',
    correctPlaceLabel: 'Correct Place',
    wrongPlaceLabel: 'Wrong Place',
    gameWonMessage: 'Congratulations! You cracked the code!',
    title: 'Crack The Code',
  };

  private secretCode: string[] = [];
  private timerRef: ReturnType<typeof setInterval> | undefined;
  private readonly elapsedSeconds = signal(0);

  readonly codeLength = 4;
  readonly isGameStarted = signal(false);
  readonly isGameWon = signal(false);
  readonly currentGuess = signal<{ value: string }>({ value: '' });
  readonly attempts = signal<AttemptFeedback[]>([]);

  readonly codeToPrint = computed(() => {
    if (!this.isGameStarted()) {
      return '';
    }

    if (this.isGameWon()) {
      return this.secretCode.join('');
    }

    return '*'.repeat(this.codeLength);
  });

  readonly canSubmitGuess = computed(
    () =>
      this.isGameStarted() &&
      !this.isGameWon() &&
      this.currentGuess().value.length === this.codeLength &&
      !this.alreadyTriedThisGuess(),
  );

  readonly alreadyTriedThisGuess = computed(() => {
    return this.attempts().some(
      (attempt) => attempt.guess === this.currentGuess().value,
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

    this.secretCode = this.generateCode();
    this.isGameStarted.set(true);
    this.isGameWon.set(false);
    this.currentGuess.set({ value: '' });
    this.elapsedSeconds.set(0);
    this.attempts.set([]);

    this.startTimer();
  }

  private generateCode(): string[] {
    return Array.from({ length: this.codeLength }, () =>
      Math.floor(Math.random() * 10).toString(),
    );
  }

  private startTimer(): void {
    this.timerRef = setInterval(() => {
      this.elapsedSeconds.update((seconds) => seconds + 1);
    }, 1000);
  }

  updateCurrentGuess(value: string): void {
    const sanitized = value.replace(/\D/g, '').slice(0, this.codeLength);
    this.currentGuess.set({ value: sanitized });
  }

  submitGuess(): void {
    if (!this.canSubmitGuess()) {
      return;
    }

    const currentGuess = this.currentGuess();
    const result = this.evaluateGuess(currentGuess.value.split(''));

    this.attempts.update((currentAttempts) => [
      {
        guess: currentGuess.value,
        ...result,
      },
      ...currentAttempts,
    ]);

    if (result.correctPlace === this.codeLength) {
      this.isGameWon.set(true);
      this.stopTimer();
    }

    this.currentGuess.set({ value: '' });
  }

  private evaluateGuess(guess: string[]): {
    correctPlace: number;
    wrongPlace: number;
    incorrect: number;
  } {
    let correctPlace = 0;
    let wrongPlace = 0;

    const secretUsed = new Array(this.codeLength).fill(false);

    for (let i = 0; i < this.codeLength; i++) {
      if (guess[i] === this.secretCode[i]) {
        correctPlace++;
        secretUsed[i] = true;
      }
    }

    for (let i = 0; i < this.codeLength; i++) {
      for (let j = 0; j < this.codeLength; j++) {
        if (!secretUsed[j] && guess[i] === this.secretCode[j]) {
          wrongPlace++;
          secretUsed[j] = true;
          break;
        }
      }
    }

    return {
      correctPlace,
      wrongPlace,
      incorrect: this.codeLength - correctPlace - wrongPlace,
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
