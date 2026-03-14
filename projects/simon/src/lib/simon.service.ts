import { Injectable } from '@angular/core';
import { SimonTranslations } from './interfaces/simon-translations.interface';

@Injectable({ providedIn: 'root' })
export class SimonService {
  readonly defaultTranslations: SimonTranslations = {};
}
