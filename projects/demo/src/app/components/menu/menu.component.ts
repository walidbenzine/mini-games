import { UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
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
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    ThemeSelectorComponent,
    LanguageSelectorComponent,
    UpperCasePipe,
    RouterModule,
  ],
})
export class MenuComponent extends BaseTranslationsComponent {
  routes = [
    { route: RoutesEnum.CRACK_THE_CODE, label: TranslatesEnum.CRACK_THE_CODE },
  ];

  protected getTextsList(): TranslatesEnum[] {
    return [
      TranslatesEnum.CRACK_THE_CODE,
      TranslatesEnum.ROUTES,
      TranslatesEnum.PARAMS,
      TranslatesEnum.NETWORKS,
    ];
  }
}
