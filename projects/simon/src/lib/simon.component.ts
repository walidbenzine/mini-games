import {
  Component,
  computed,
  inject,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { SimonTranslations, TilesEnum } from '../public-api';
import { SimonService } from './services/simon.service';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'simon',
  imports: [CommonModule, MatButton, MatCheckbox],
  templateUrl: './simon.component.html',
  styleUrls: ['./simon.component.scss'],
})
export class SimonComponent implements OnInit, OnDestroy {
  readonly game = inject(SimonService);

  translations = input<SimonTranslations>();
  errorSoundPath = input<string>();
  successSoundPath = input<string>();
  tilesSoundPath = input<Map<TilesEnum, string>>();

  texts = computed(() => ({
    ...this.game.defaultTranslations,
    ...this.translations(),
  }));

  ngOnInit(): void {
    this.game.setAssets(
      this.successSoundPath(),
      this.errorSoundPath(),
      this.tilesSoundPath(),
    );
  }

  pauseOrResumeGame(): void {
    this.game.isGamePaused() ? this.game.resumeGame() : this.game.pauseGame();
  }

  ngOnDestroy(): void {
    this.game.pauseGame();
  }
}
