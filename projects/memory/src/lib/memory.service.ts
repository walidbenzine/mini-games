import { Injectable, OnDestroy, computed, effect, signal } from '@angular/core';
import { MemoryTranslations } from './interfaces/memory-translations.interface';
import { Card } from './interfaces/card.interface';

@Injectable({ providedIn: 'root' })
export class MemoryService implements OnDestroy {
  readonly defaultTranslations: MemoryTranslations = {
    startGame: 'Start Game',
    restartGame: 'Restart Game',
    resumeGame: 'Resume Game',
    pauseGame: 'Pause Game',
    attemptsLabel: 'Attempts',
    gameWonMessage: 'Congratulations! You won the game !',
    title: 'Memory',
  };

  private timerRef: ReturnType<typeof setInterval> | undefined;
  private readonly elapsedSeconds = signal(0);

  private readonly _cards = signal<Card[]>([]);
  readonly cards = this._cards.asReadonly();

  readonly isGameStarted = signal(false);
  readonly isGamePaused = signal(false);
  readonly currentGuess = signal<number | null>(null);
  readonly attempts = signal<number>(0);

  readonly isGameWon = computed(() => this.cards().every((c) => c.matched));

  private readonly flippedCards = computed(() =>
    this.cards().filter((c) => c.flipped),
  );

  readonly timerLabel = computed(() => {
    const totalSeconds = this.elapsedSeconds();
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');

    return `${minutes}:${seconds}`;
  });

  constructor() {
    effect(() => {
      this.isGameWon() && this.stopTimer();
    });
  }

  startGame(hiddenNumbers: number): void {
    this.stopTimer();

    this.isGameStarted.set(true);
    this.isGamePaused.set(false);
    this.currentGuess.set(null);
    this.elapsedSeconds.set(0);
    this._cards.set([]);
    this.attempts.set(0);
    this.generateCards(hiddenNumbers);

    this.startTimer();
  }

  private generateCards(hiddenNumbers: number): void {
    const numbersArray = Array.from({ length: hiddenNumbers }, (_, i) => i + 1)
      .flatMap((n) => [n, n])
      .sort(() => Math.random() - 0.5);

    const cardsArray: Card[] = [];

    numbersArray.forEach((number, index) => {
      cardsArray.push({
        index,
        value: number,
        flipped: false,
        matched: false,
        disabled: false,
      });
    });

    this._cards.set(cardsArray);
  }

  private startTimer(): void {
    this.timerRef = setInterval(() => {
      this.elapsedSeconds.update((seconds) => seconds + 1);
    }, 1000);
  }

  pauseGame(): void {
    this.isGamePaused.set(true);
    this.stopTimer();
    this.changeEnabilityCards(true);
  }

  private changeEnabilityCards(disabled: boolean): void {
    const cards = this._cards().map((card) => {
      return {
        ...card,
        disabled,
      };
    });
    this.updateCardsState(cards);
  }

  resumeGame(): void {
    this.isGamePaused.set(false);
    this.startTimer();
    this.changeEnabilityCards(false);
  }

  private stopTimer(): void {
    if (!this.timerRef) {
      return;
    }

    clearInterval(this.timerRef);
    this.timerRef = undefined;
  }

  onClickCard(card: Card): void {
    if (card.disabled || card.flipped || card.matched) {
      return;
    }

    this.flipCard(card.index);

    if (this.flippedCards().length % 2 == 0) {
      this.incrementAttempts();
      this.updateMatchedCards();
      setTimeout(() => this.unflipUnMatchedCards(), 500);
    }
  }

  private flipCard(index: number): void {
    const cards = this._cards().map((card) => {
      return {
        ...card,
        flipped: card.index === index ? !card.flipped : card.flipped,
      };
    });
    this.updateCardsState(cards);
  }

  private updateCardsState(cards: Card[]): void {
    this._cards.set(cards);
  }

  private updateMatchedCards(): void {
    const cards = this._cards().map((card) => {
      return {
        ...card,
        matched: this.hasCardMatch(card),
      };
    });
    this.updateCardsState(cards);
  }

  private hasCardMatch(card: Card): boolean {
    if (!card.flipped) return card.matched;

    return this.flippedCards().some(
      (fc) => fc.value === card.value && fc.index !== card.index,
    );
  }

  private unflipUnMatchedCards(): void {
    const cards = this.cards().map((card) => {
      return {
        ...card,
        flipped: card.matched,
      };
    });
    this.updateCardsState(cards);
  }

  private incrementAttempts(): void {
    this.attempts.update((attempts) => ++attempts);
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }
}
