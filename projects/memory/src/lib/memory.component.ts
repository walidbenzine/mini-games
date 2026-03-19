import { Component, computed, inject, input, OnDestroy } from '@angular/core';
import { MemoryTranslations } from './interfaces/memory-translations.interface';
import { MemoryService } from './memory.service';
import { MatButton } from '@angular/material/button';
import { CardComponent } from './components/card/card.component';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'memory',
  imports: [MatButton, CardComponent, NgStyle],
  templateUrl: './memory.component.html',
  styleUrl: './memory.component.scss',
})
export class MemoryComponent implements OnDestroy {
  readonly game = inject(MemoryService);

  translations = input<MemoryTranslations>();
  hiddenNumbers = input<number>(8);
  readonly cardWidth = input<string | undefined>('50px');

  usedCardWidth = computed(
    () => this.cardWidth() ?? this.game.defaultCardWidth,
  );

  texts = computed(() => ({
    ...this.game.defaultTranslations,
    ...this.translations(),
  }));

  startOrRestartGame(): void {
    this.game.startGame(this.hiddenNumbers());
  }

  pauseOrResumeGame(): void {
    this.game.isGamePaused() ? this.game.resumeGame() : this.game.pauseGame();
  }

  ngOnDestroy(): void {
    const shouldPauseGameOnDestroy =
      this.game.isGameStarted() &&
      !this.game.isGameWon() &&
      !this.game.isGamePaused();
    shouldPauseGameOnDestroy && this.game.pauseGame();
  }
}
