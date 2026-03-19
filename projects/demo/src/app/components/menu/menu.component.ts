import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatesEnum } from '../../enums/translates.enum';
import { BaseTranslationsComponent } from '../base/base-translations.component';
import { ThemeSelectorComponent } from '../theme-selector/theme-selector.component';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { RoutesEnum } from '../../enums/routes.enum';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  imports: [
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatIcon,
    ThemeSelectorComponent,
    LanguageSelectorComponent,
    UpperCasePipe,
    RouterLinkActive,
    RouterLink,
  ],
})
export class MenuComponent extends BaseTranslationsComponent {
  routes = [
    { route: RoutesEnum.CRACK_THE_CODE, label: TranslatesEnum.CRACK_THE_CODE },
    {
      route: RoutesEnum.GUESS_THE_NUMBER,
      label: TranslatesEnum.GUESS_THE_NUMBER,
    },
    { route: RoutesEnum.MEMORY, label: TranslatesEnum.MEMORY },
    { route: RoutesEnum.SIMON, label: TranslatesEnum.SIMON },
  ];

  protected getTextsList(): TranslatesEnum[] {
    return [
      TranslatesEnum.CRACK_THE_CODE,
      TranslatesEnum.GUESS_THE_NUMBER,
      TranslatesEnum.MEMORY,
      TranslatesEnum.SIMON,
      TranslatesEnum.ROUTES,
      TranslatesEnum.PARAMS,
      TranslatesEnum.NETWORKS,
    ];
  }
}
