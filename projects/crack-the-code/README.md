# 🎮 Crack The Code

A lightweight, standalone Angular mini-game component.

@abenzine/crack-the-code is a reusable Angular library that provides a simple "Crack the Code" number guessing game built with Angular Signals and Angular Material.

It is:

✅ Standalone component (no NgModule required)

✅ Built with Angular Signals

✅ OnPush change detection

✅ i18n-agnostic

✅ Fully configurable via reactive translations

## 📦 Installation

```bash
npm install @abenzine/crack-the-code
```

## ⚙️ Peer Dependencies

Make sure your project has:

@angular/core

@angular/common

@angular/material

Compatible with Angular 21+.

### 🚀 Usage

1. Import the standalone component

import { CrackTheCodeComponent } from '@abenzine/crack-the-code';

@Component({
standalone: true,
imports: [CrackTheCodeComponent],
template: `     <crack-the-code
      [translations]="translations"
    />
  `
})
export class MyComponent {}

2. Internationalization (i18n)

This library is translation-system agnostic.

It does not depend on ngx-translate, Transloco, or any other i18n library.

Instead, it expects translations to be passed reactively from the parent via an Angular Signal.

🔤 Translations Interface

export interface CrackTheCodeTranslations {
title?: string;
startGame?: string;
restartGame?: string;
secretCodeLabel?: string;
attemptsLabel?: string;
inputPlaceholder?: string;
guessAlreadyTried?: string;
submitGuess?: string;
attemptsHistoryLabel?: string;
correctPlaceLabel?: string;
wrongPlaceLabel?: string;
gameWonMessage?: string;
}

All properties are optional — defaults are provided internally.

## 🧠 Recommended Reactive Setup (Angular Signals)

Example using a translation system like ngx-translate:

import { Component, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
CrackTheCodeComponent,
CrackTheCodeTranslations
} from '@abenzine/crack-the-code';

@Component({
standalone: true,
imports: [CrackTheCodeComponent],
template: `     <crack-the-code
      [translations]="translations"
    />
  `
})
export class HomeComponent {

translations = signal<CrackTheCodeTranslations>(
this.buildTranslations()
);

constructor(private translate: TranslateService) {
this.translate.onLangChange.subscribe(() => {
this.translations.set(this.buildTranslations());
});
}

private buildTranslations(): CrackTheCodeTranslations {
return {
title: this.translate.instant('CRACK.TITLE'),
startGame: this.translate.instant('CRACK.START'),
restartGame: this.translate.instant('CRACK.RESTART'),
secretCodeLabel: this.translate.instant('CRACK.SECRET'),
attemptsLabel: this.translate.instant('CRACK.ATTEMPTS'),
inputPlaceholder: this.translate.instant('CRACK.INPUT'),
guessAlreadyTried: this.translate.instant('CRACK.ALREADY_TRIED'),
submitGuess: this.translate.instant('CRACK.SUBMIT'),
attemptsHistoryLabel: this.translate.instant('CRACK.HISTORY'),
correctPlaceLabel: this.translate.instant('CRACK.CORRECT'),
wrongPlaceLabel: this.translate.instant('CRACK.WRONG'),
gameWonMessage: this.translate.instant('CRACK.WON')
};
}
}

Whenever the language changes, the signal updates automatically and the component re-renders.

## 🎨 Angular Material

This component uses:

MatButtonModule

MatInputModule

MatFormField

MatDivider

MatHint

Make sure Angular Material is installed and configured in your application.

## 🕹 Game Features

4-digit random secret code

Timer

Attempt history

Feedback:

Correct digit in correct place

Correct digit in wrong place

Prevents duplicate guesses

Restart support

Reactive UI via Angular Signals

## 🧩 Customization

You can partially override translations:

translations = signal({
title: 'My Custom Title'
});

All missing values fallback to internal defaults.

## 🏗 Technical Details

Standalone component

ChangeDetectionStrategy.OnPush

Signal-based state management

Internal service encapsulates game logic

No global providers

No i18n coupling

Fully tree-shakable (sideEffects: false)

## 📄 Example Template

<crack-the-code
[translations]="translations"
/>

## 👤 Author

Walid BENZINE
npm: @abenzine

## 📜 License

MIT
