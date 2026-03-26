Grocy | Smart Pantry Assistant 

A lightweight, intelligent grocery inventory manager built with JavaScript, CSS3, and HTML5. This project was developed as a personal technical challenge in between semesters at the Technion – Israel Institute of Technology.

## 🚀 Key Features

- **Natural Language Parsing:** Update your inventory using intuitive commands like *"bought 5 milk"* or *"ate 2 eggs"*.
- **Data Persistence:** Integrated with the **Web Storage API (localStorage)**. Your pantry data stays saved on your device even after closing the browser or restarting your computer.
- **Smart Threshold Alerts:** Automatic visual indicators (low-stock badges) when items fall below a custom defined threshold.
- **Dynamic UI:** A responsive, "glassmorphism" inspired dashboard with real-time inventory updates and category-based quick actions.
- **Zero-Dependency:** Built entirely with standard web technologies—no heavy frameworks or external APIs required for the core logic.

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3 (Flexbox/Grid), JavaScript (ES6+ Classes)
- **Icons:** [Lucide-Express](https://lucide.dev/)
- **Storage:** Browser `localStorage`

## 📖 How to Use

1. **Launch:** Click "Open My Pantry" on the landing page.
2. **Add Items:** Type a command like "12 eggs". If the item is new, the bot will ask you to assign a category and a minimum stock threshold.
3. **Update Stock:** Simply type "bought 2" or "used 1" followed by the item name.
4. **Shopping List:** Type "list" to see everything that is currently below your alert threshold.

## 🏗️ Future Roadmap

- [ ] **AI Integration:** Implementing OpenAI's GPT API for advanced intent recognition and recipe suggestions based on current stock.


---
*Created by Eylon Hotam*
