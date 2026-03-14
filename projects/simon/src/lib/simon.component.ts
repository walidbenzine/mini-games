import { Component, computed, inject, input } from '@angular/core';
import { SimonTranslations } from '../public-api';
import { SimonService } from './simon.service';

@Component({
  selector: 'simon',
  imports: [],
  templateUrl: './simon.component.html',
  styleUrls: ['./simon.component.scss'],
})
export class SimonComponent {
  readonly game = inject(SimonService);
  translations = input<SimonTranslations>();

  texts = computed(() => ({
    ...this.game.defaultTranslations,
    ...this.translations(),
  }));
}
