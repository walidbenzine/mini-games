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
  {
    path: RoutesEnum.GUESS_THE_NUMBER,
    loadComponent: () =>
      import('./pages/guess-the-number/guess-the-number.component').then(
        (m) => m.AppGuessTheNumberComponent,
      ),
  },
  {
    path: RoutesEnum.MEMORY,
    loadComponent: () =>
      import('./pages/memory/memory.component').then(
        (m) => m.AppMemoryComponent,
      ),
  },
  {
    path: RoutesEnum.SIMON,
    loadComponent: () =>
      import('./pages/simon/simon.component').then((m) => m.AppSimonComponent),
  },
  {
    path: '**',
    redirectTo: RoutesEnum.CRACK_THE_CODE,
  },
];
