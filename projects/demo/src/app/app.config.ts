import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { LanguagesEnum } from './enums/languages.enum';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({ prefix: '/i18n/' }),
      fallbackLang: LanguagesEnum.FR,
      lang: LanguagesEnum.FR,
    }),
    provideAppInitializer(() => {
      const translate = inject(TranslateService);
      return translate.use(LanguagesEnum.FR);
    }),
  ],
};
