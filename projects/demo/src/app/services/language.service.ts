import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs';
import { LanguagesEnum } from '../enums/languages.enum';
import { TranslatesEnum } from '../enums/translates.enum';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translateService = inject(TranslateService);
  private currentLanguage = signal<LanguagesEnum>(LanguagesEnum.FR);
  getLanguage = this.currentLanguage.asReadonly();

  setLanguage(lang: LanguagesEnum): void {
    this.translateService
      .use(lang)
      .pipe(tap(() => this.currentLanguage.set(lang)))
      .subscribe();
  }

  getTranslation(key: TranslatesEnum): Signal<string> {
    return computed(() => {
      this.getLanguage();
      return this.translateService.instant(key);
    });
  }

  getTranslationWithParams(
    key: TranslatesEnum,
    params: Record<string, any>,
  ): Signal<string> {
    return computed(() => {
      this.getLanguage();
      return this.translateService.instant(key, params);
    });
  }

  getTranslationMap(
    keys: readonly TranslatesEnum[],
  ): Signal<Map<TranslatesEnum, string>> {
    return computed(() => {
      this.getLanguage();

      return new Map(
        keys.map((key) => [key, this.translateService.instant(key)] as const),
      );
    });
  }
}
