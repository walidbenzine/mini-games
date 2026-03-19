# 🎮 Mini Games Demo (Angular)

This project is a demo application showcasing a collection of Angular mini-game libraries.

---

## 📦 Included Games

- 🟢 Simon
- 🔐 Crack The Code
- 🔢 Guess The Number
- 🧠 Memory

Each game is developed as an independent Angular library and integrated into this demo app.

---

## 🧱 Project Structure

```text
projects/
  ├── simon/
  ├── crack-the-code/
  ├── guess-the-number/
  ├── memory/
src/
  ├── app/
      ├── pages/
      ├── components/
      ├── services/
      ├── enums/
```

---

## 🧭 Navigation

The app uses Angular Router with lazy-loaded standalone components:

- `/crack-the-code`
- `/guess-the-number`
- `/memory`
- `/simon`

A side menu allows easy navigation between games.

---

## 🌍 Internationalization

The app uses **@ngx-translate/core**.

### Supported languages:

- 🇫🇷 French (default)
- 🇬🇧 English

Language can be changed dynamically via the UI.

---

## 🎨 Theme System

A built-in theme system allows switching between:

- 🌞 Light mode
- 🌙 Dark mode
- 🖥️ System preference

The theme is persisted in `localStorage`.

---

## 🧩 Features

- Standalone Angular components
- Lazy loading
- Reactive state using Angular signals
- Modular architecture (one library per game)
- Reusable UI (menu, selectors)
- Translation system
- Theme management

---

## ▶️ Run the project

```bash
npm install
ng run start
```

Then open:

```text
http://localhost:4200
```

---

## 🛠️ Tech Stack

- Angular 21+
- Angular Material
- @ngx-translate/core
- Signals API

---

## 👤 Author

**Walid BENZINE**

- GitHub: https://github.com/walidbenzine
- LinkedIn: https://www.linkedin.com/in/benzine/

---

## 📄 License

MIT
