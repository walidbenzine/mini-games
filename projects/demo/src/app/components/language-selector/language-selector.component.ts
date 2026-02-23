import { Component, computed, inject } from '@angular/core';
import { LanguagesEnum } from '../../enums/languages.enum';
import { LanguageService } from '../../services/language.service';
import { TranslatesEnum } from '../../enums/translates.enum';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-language-selector',
  template: `
    @for (language of visibleLanguages(); track language.key) {
      <img
        [matTooltip]="translation()"
        [src]="language.img"
        (click)="changeLanguage(language.key)"
      />
    }
  `,
  styles: `
    :host {
      gap: 10px;
      display: flex;
      flex-direction: column;
    }
    img {
      width: 70px;
      cursor: pointer;

      @media (max-height: 900px) {
        width: 40px;
      }
    }
  `,
  imports: [MatTooltipModule],
})
export class LanguageSelectorComponent {
  private readonly languageService = inject(LanguageService);

  private readonly allLanguages = [
    { key: LanguagesEnum.FR, img: 'icons/fr.png' },
    { key: LanguagesEnum.EN, img: 'icons/en.png' },
  ];

  readonly visibleLanguages = computed(() =>
    this.allLanguages.filter(
      (al) => al.key !== this.languageService.getLanguage(),
    ),
  );
  readonly translation = this.languageService.getTranslation(
    TranslatesEnum.CHANGE_LANGUAGE,
  );

  changeLanguage(key: LanguagesEnum): void {
    this.languageService.setLanguage(key);
  }
}
