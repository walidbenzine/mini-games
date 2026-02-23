import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-selector',
  template: `
    <mat-icon (click)="themeService.toggle()">
      {{ themeService.theme() === 'dark' ? 'light_mode' : 'dark_mode' }}
    </mat-icon>
  `,
  styles: `
    :host {
      display: flex;
    }
    mat-icon {
      cursor: pointer;
      font-size: 50px;
      width: 50px;
      height: auto;

      @media (max-height: 900px) {
        font-size: 30px;
        width: 30px;
      }
    }
  `,
  imports: [MatIconModule],
  providers: [ThemeService],
})
export class ThemeSelectorComponent {
  public readonly themeService = inject(ThemeService);
}
