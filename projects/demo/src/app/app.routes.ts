import { Routes } from '@angular/router';
import { RoutesEnum } from './enums/routes.enum';

export const routes: Routes = [
  {
    path: '',
    redirectTo: RoutesEnum.CRACK_THE_CODE,
    pathMatch: 'full',
  },
  {
    path: RoutesEnum.CRACK_THE_CODE,
    loadComponent: () =>
      import('./pages/crack-the-code/crack-the-code.component').then(
        (m) => m.AppCrackTheCodeComponent,
      ),
  },
];
