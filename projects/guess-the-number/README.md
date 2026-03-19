# 🔢 Guess The Number (@abenzine/guess-the-number)

A simple game where you must find the secret number using hints.

## 📦 Installation

```bash
npm install @abenzine/guess-the-number
```

## 🚀 Usage

```ts
import { GuessTheNumberComponent } from "@abenzine/guess-the-number";
```

```html
<guess-the-number></guess-the-number>
```

## ⚙️ Inputs

| Input        | Type                         | Description            |
| ------------ | ---------------------------- | ---------------------- |
| translations | `GuessTheNumberTranslations` | Override default texts |

## 🌍 Translations

```ts
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
  instructions?: string;
}
```

## ✨ Features

- Simple gameplay
- Hot/Cold hints
- Attempts tracking
- Timer

## 🛠️ Peer Dependencies

- Angular 21+
- Angular Material

---
