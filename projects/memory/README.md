# 🧠 Memory Game (@abenzine/memory)

A classic card matching game where you must find all pairs.

## 📦 Installation

```bash
npm install @abenzine/memory
```

## 🚀 Usage

```ts
import { MemoryComponent } from "@abenzine/memory";
```

```html
<memory></memory>
```

## ⚙️ Inputs

| Input         | Type                 | Description            |
| ------------- | -------------------- | ---------------------- |
| translations  | `MemoryTranslations` | Override default texts |
| hiddenNumbers | `number`             | Number of pairs        |
| cardWidth     | `string`             | Card size              |

## 🌍 Translations

```ts
export interface MemoryTranslations {
  title?: string;
  startGame?: string;
  restartGame?: string;
  resumeGame?: string;
  pauseGame?: string;
  attemptsLabel?: string;
  gameWonMessage?: string;
  instructions?: string;
}
```

## ✨ Features

- Configurable difficulty
- Card matching logic
- Attempts counter
- Timer

## 🛠️ Peer Dependencies

- Angular 21+
- Angular Material

---
