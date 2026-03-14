import { Component, computed, Signal } from '@angular/core';
import { SimonComponent, SimonTranslations } from 'simon';
import { BaseTranslationsComponent } from '../../components/base/base-translations.component';
import { TranslatesEnum } from '../../enums/translates.enum';

@Component({
  selector: 'app-simon',
  template: `<simon [translations]="gameTranslations()"></simon>`,
  styles: `
    simon {
      width: 100dvw;
      height: 100dvh;
    }
  `,
  imports: [SimonComponent],
})
export class AppSimonComponent extends BaseTranslationsComponent {
  gameTranslations: Signal<SimonTranslations> = computed(() => {
    return {};
  });

  protected getTextsList(): TranslatesEnum[] {
    return [TranslatesEnum.SIMON];
  }
}
