# 🔐 Crack The Code (@abenzine/crack-the-code)

A Mastermind-like game where you must guess a hidden 4-digit code.

## 📦 Installation

```bash
npm install @abenzine/crack-the-code
```

## 🚀 Usage

```ts
import { CrackTheCodeComponent } from "@abenzine/crack-the-code";
```

```html
<crack-the-code></crack-the-code>
```

## ⚙️ Inputs

| Input        | Type                       | Description            |
| ------------ | -------------------------- | ---------------------- |
| translations | `CrackTheCodeTranslations` | Override default texts |

## 🌍 Translations

```ts
export interface CrackTheCodeTranslations {
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
  correctPlaceLabel?: string;
  wrongPlaceLabel?: string;
  gameWonMessage?: string;
  instructions?: string;
}
```

## ✨ Features

- Code guessing logic
- Feedback system (correct / misplaced)
- Attempts history
- Timer

## 🛠️ Peer Dependencies

- Angular 21+
- Angular Material

---
