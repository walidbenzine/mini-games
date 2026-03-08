# 🎯 Guess The Number

A lightweight, standalone Angular mini-game component.

@abenzine/guess-the-number is a reusable Angular library that provides a simple "Guess The Number" game built with Angular Signals and Angular Material.

The goal is simple: guess the hidden 4-digit number with hints indicating whether the secret number is higher or lower.

It is:

✅ Standalone component (no NgModule required)
✅ Built with Angular Signals
✅ OnPush change detection
✅ i18n-agnostic
✅ Fully configurable via reactive translations

# 📦 Installation

npm install @abenzine/guess-the-number

# ⚙️ Peer Dependencies

Make sure your project includes:

@angular/core

@angular/common

@angular/material

Compatible with Angular 21+.

# 🚀 Usage

Import the standalone component
import { GuessTheNumberComponent } from '@abenzine/guess-the-number';

@Component({
standalone: true,
imports: [GuessTheNumberComponent],
template: `<guess-the-number [translations]="translations" />`
})
export class MyComponent {}

# 🌍 Internationalization (i18n)

This library is translation-system agnostic.

It does not depend on:

ngx-translate

Transloco

or any other i18n library.

Instead, translations are passed reactively via an Angular Signal.

# 🔤 Translations Interface

export interface GuessTheNumberTranslations {
title?: string;
startGame?: string;
restartGame?: string;
resumeGame?: string;
pauseGame?: string;
secretCodeLabel?: string;
attemptsLabel?: string;
inputPlaceholder?: string;
guessAlreadyTried?: string;
submitGuess?: string;
attemptsHistoryLabel?: string;
isLess?: string;
isGreater?: string;
isEqual?: string;
gameWonMessage?: string;
}

All properties are optional — default values are provided internally.

# 🧠 Recommended Reactive Setup (Angular Signals)

Example using a translation system like ngx-translate:

import { Component, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
GuessTheNumberComponent,
GuessTheNumberTranslations
} from '@abenzine/guess-the-number';

@Component({
standalone: true,
imports: [GuessTheNumberComponent],
template: `<guess-the-number [translations]="translations" />`
})
export class HomeComponent {

translations = signal(
this.buildTranslations()
);

constructor(private translate: TranslateService) {
this.translate.onLangChange.subscribe(() => {
this.translations.set(this.buildTranslations());
});
}

private buildTranslations(): GuessTheNumberTranslations {
return {
title: this.translate.instant('GUESS.TITLE'),
startGame: this.translate.instant('GUESS.START'),
restartGame: this.translate.instant('GUESS.RESTART'),
resumeGame: this.translate.instant('GUESS.RESUME'),
pauseGame: this.translate.instant('GUESS.PAUSE'),
secretCodeLabel: this.translate.instant('GUESS.SECRET'),
attemptsLabel: this.translate.instant('GUESS.ATTEMPTS'),
inputPlaceholder: this.translate.instant('GUESS.INPUT'),
guessAlreadyTried: this.translate.instant('GUESS.ALREADY_TRIED'),
submitGuess: this.translate.instant('GUESS.SUBMIT'),
attemptsHistoryLabel: this.translate.instant('GUESS.HISTORY'),
isLess: this.translate.instant('GUESS.LOWER'),
isGreater: this.translate.instant('GUESS.GREATER'),
isEqual: this.translate.instant('GUESS.EQUAL'),
gameWonMessage: this.translate.instant('GUESS.WON')
};
}
}

Whenever the language changes, the signal updates automatically and the component re-renders.

# 🎨 Angular Material

This component uses:

MatButtonModule

MatInputModule

MatFormField

MatDivider

MatHint

Make sure Angular Material is installed and configured in your application.

# 🕹 Game Features

Random 4-digit secret number

Timer

Pause / Resume

Attempts history

Smart feedback:

Secret number is higher

Secret number is lower

Correct guess

Prevents duplicate guesses

Restart support

Fully reactive UI via Angular Signals

# 🧩 Customization

You can partially override translations:

translations = signal({
title: 'My Custom Title'
});

All missing values automatically fallback to internal defaults.

# 🏗 Technical Details

Standalone component

ChangeDetectionStrategy.OnPush

Signal-based state management

Internal service encapsulates game logic

Timer handled via reactive signals

No global providers required

No i18n coupling

Fully tree-shakable (sideEffects: false)

# 📄 Example Template

<guess-the-number [translations]="translations" />

# 👤 Author

Walid BENZINE

npm: @abenzine

# 📜 License

MIT
