# 🧠 @abenzine/memory

A lightweight **Angular Memory Game component** built with **Angular Signals**.

This library provides a ready-to-use **matching pairs (Memory) game** that is easy to integrate into any Angular application.  
It is designed to be **simple, reactive, customizable, and fully standalone**.

---

# ✨ Features

- 🧩 Classic **Memory / Matching Pairs Game**
- ⚡ Built with **Angular Signals**
- 🧱 **Standalone Angular component**
- 🌍 **Customizable translations**
- ⏱ Built-in **timer**
- 📊 **attempt counter**
- ⏸ **pause / resume game**
- 🎮 configurable number of pairs
- 🧪 designed to be **fully testable**

---

# 📦 Installation

```bash
npm install @abenzine/memory
```

or

```bash
yarn add @abenzine/memory
```

---

# 🔧 Peer Dependencies

This library requires Angular:

```
@angular/common ^21.1.0
@angular/core ^21.1.0
```

---

# 🚀 Basic Usage

Import and use the component in your template.

```html
<memory></memory>
```

The user can then start the game using the **Start Game** button.

---

# ⚙️ Configuration

## Number of pairs

You can control how many hidden numbers are generated.

```html
<memory [hiddenNumbers]="8"></memory>
```

This will generate:

```
8 numbers
x2 copies
= 16 cards
```

---

# 🌍 Translations

You can override the default UI texts using the `translations` input.

## Translation Interface

```ts
export interface MemoryTranslations {
  title?: string;
  startGame?: string;
  restartGame?: string;
  resumeGame?: string;
  pauseGame?: string;
  attemptsLabel?: string;
  gameWonMessage?: string;
}
```

## Example

```html
<memory
  [translations]="{
    title: 'Memory Game',
    startGame: 'Play',
    restartGame: 'Restart',
    pauseGame: 'Pause',
    resumeGame: 'Resume',
    attemptsLabel: 'Attempts',
    gameWonMessage: 'Congratulations!'
  }"
></memory>
```

All properties are **optional**.  
If a translation is missing, the **default text will be used**.

---

# 🃏 Card Model

Each card in the game follows this structure:

```ts
export interface Card {
  index: number;
  value: number;
  flipped: boolean;
  matched: boolean;
  disabled: boolean;
}
```

| Property   | Description                              |
| ---------- | ---------------------------------------- |
| `index`    | Position of the card in the grid         |
| `value`    | Hidden number used to match pairs        |
| `flipped`  | Whether the card is currently visible    |
| `matched`  | Whether the pair has been found          |
| `disabled` | Prevents interaction (used during pause) |

---

# 🎮 Game Flow

1. Click **Start Game**
2. Cards are generated and shuffled
3. Player flips two cards
4. If the values match → cards stay visible
5. If not → cards flip back
6. The game ends when **all cards are matched**

The component automatically handles:

- matching logic
- timer
- attempts counter
- pause/resume
- win detection

---

# 👤 Author

**Walid BENZINE**

GitHub repository:  
https://github.com/walidbenzine/mini-games

---

# 📄 License

MIT
