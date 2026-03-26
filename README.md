# Grocy — Smart Pantry Assistant 🛒

> A lightweight, conversational grocery inventory manager built with vanilla JavaScript, CSS3, and HTML5.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen?style=flat)

---

## 🚀 Live Demo

**[▶ Try it here →](https://eylonhotam.github.io/grocy-pantry-bot)**

---

## 📸 Preview

<!-- Add a GIF here: record ~30s of usage, upload to /assets/demo.gif -->
<!-- ![Grocy Demo](assets/demo.gif) -->

---

## ✨ Features

- **Natural Language Commands** — Update inventory with conversational input like `"bought 12 eggs"` or `"used 2 milk"`. Commands support a variety of synonyms (`ate`, `consumed`, `purchased`, etc.)
- **Smart Low-Stock Alerts** — Custom per-item thresholds trigger animated visual warnings when stock runs low
- **Persistent Storage** — Backed by the Web Storage API (`localStorage`). Data survives page refreshes and browser restarts, no account required
- **Shopping List** — Type `list` to instantly generate a list of everything below threshold
- **Zero Dependencies** — Core logic uses no frameworks or external APIs. Only [Lucide](https://lucide.dev/) icons are imported for UI

---

## 🏗️ Project Structure

```
grocy-pantry-bot/
├── index.html        # App shell & markup
├── css/
│   └── style.css     # All styles (CSS variables, layout, animations)
└── js/
    ├── config.js     # Category definitions and app constants
    ├── inventory.js  # Item & Inventory classes (data model + persistence)
    ├── parser.js     # Natural language command parser (FSM-based)
    ├── ui.js         # DOM rendering helpers
    └── app.js        # Entry point — wires everything together
```

---

## ⚙️ How It Works

The parser uses a **finite-state machine (FSM)** to handle multi-turn interactions. When a new item is detected, it moves through `IDLE → WAIT_CAT → WAIT_THR` states to onboard the item before returning to idle:

```
User: "bought 5 garlic"
  → Parser: item not found → state = WAIT_CAT
Bot: "What category is garlic?"
  → User selects: "Vegetable"
  → state = WAIT_THR
Bot: "What's the minimum threshold?"
  → User: "2"
  → Item saved → state = IDLE
```

---

## 🚦 Getting Started

No build step required. Clone and open:

```bash
git clone https://github.com/eylonhotam/grocy-pantry-bot.git
cd grocy-pantry-bot
open index.html   # or just double-click it
```

---

## 🗺️ Roadmap

- [ ] **AI-powered intent recognition** — Replace regex parsing with an LLM API call (OpenAI / Gemini) for more robust understanding
- [ ] **Recipe suggestions** — Suggest recipes based on current stock
- [ ] **Export / import** — JSON backup and restore
- [ ] **PWA support** — Installable as a mobile app via Service Worker

---

## 🛠️ Tech Stack

| Layer    | Technology                              |
|----------|-----------------------------------------|
| Markup   | HTML5                                   |
| Styles   | CSS3 (Flexbox, Grid, CSS Variables)     |
| Logic    | JavaScript ES6+ (Classes, Map, Modules) |
| Storage  | Web Storage API (`localStorage`)        |
| Icons    | [Lucide](https://lucide.dev/)           |

---

## 👤 Author

**Eylon Hotam**
Developed as a personal technical challenge between semesters at the **Technion – Israel Institute of Technology**.

---

## 📄 License

[MIT](LICENSE)
