# 🟢 Simon Game (@abenzine/simon)

A classic memory game where you must reproduce an increasingly long sequence of colors.

## 📦 Installation

```bash
npm install @abenzine/simon
```

## 🚀 Usage

Import the component:

```ts
import { SimonComponent } from "@abenzine/simon";
```

Use it in your template:

```html
<simon></simon>
```

## ⚙️ Inputs

| Input            | Type                     | Description            |
| ---------------- | ------------------------ | ---------------------- |
| translations     | `SimonTranslations`      | Override default texts |
| successSoundPath | `string`                 | Success sound path     |
| errorSoundPath   | `string`                 | Error sound path       |
| tilesSoundPath   | `Map<TilesEnum, string>` | Sound per tile         |

## 🌍 Translations

```ts
export interface SimonTranslations {
  title?: string;
  startGame?: string;
  restartGame?: string;
  resumeGame?: string;
  pauseGame?: string;
  level?: string;
  gameOver?: string;
  soundEnabled?: string;
  instructions?: string;
}
```

## ✨ Features

- Increasing difficulty
- Sound support
- Pause / Resume
- Timer & levels

## 🛠️ Peer Dependencies

- Angular 21+
- Angular Material

---
