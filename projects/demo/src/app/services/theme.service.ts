import { Injectable, signal, computed, effect } from '@angular/core';

export type ThemeMode = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'theme-preference';

@Injectable()
export class ThemeService {
  private mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  private userPreference = signal<ThemeMode>(
    (localStorage.getItem(STORAGE_KEY) as ThemeMode) ?? 'system',
  );

  private systemPrefersDark = signal(this.mediaQuery.matches);

  readonly theme = computed<'dark' | 'light'>(() => {
    if (this.userPreference() === 'system') {
      return this.systemPrefersDark() ? 'dark' : 'light';
    }
    return this.userPreference() as 'dark' | 'light';
  });

  constructor() {
    this.mediaQuery.addEventListener('change', (e) =>
      this.systemPrefersDark.set(e.matches),
    );

    effect(() => {
      this.applyTheme(this.theme());
    });
  }

  toggle(): void {
    this.setTheme(this.theme() === 'dark' ? 'light' : 'dark');
  }

  private setTheme(mode: ThemeMode): void {
    this.userPreference.set(mode);
    localStorage.setItem(STORAGE_KEY, mode);
  }

  private applyTheme(theme: ThemeMode) {
    const root = document.documentElement;

    root.classList.remove('light-theme', 'dark-theme');
    root.classList.add(`${theme}-theme`);
  }
}
