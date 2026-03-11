import { Component, computed, Signal } from '@angular/core';
import { MemoryComponent, MemoryTranslations } from 'memory';
import { BaseTranslationsComponent } from '../../components/base/base-translations.component';
import { TranslatesEnum } from '../../enums/translates.enum';

@Component({
  selector: 'app-memory',
  template: `<memory [translations]="gameTranslations()"></memory>`,
  styles: `
    memory {
      width: 100dvw;
      height: 100dvh;
    }
  `,
  imports: [MemoryComponent],
})
export class AppMemoryComponent extends BaseTranslationsComponent {
  gameTranslations: Signal<MemoryTranslations> = computed(() => {
    return {};
  });

  protected getTextsList(): TranslatesEnum[] {
    return [];
  }
}
