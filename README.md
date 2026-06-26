# 🎉 HS Quiz!

A fun and interactive trivia quiz app built with React, featuring questions fetched from the Open Trivia Database (OpenTDB) with a countdown timer per question.

🌐 **Live Demo:** [triviaquiz.henriquesantos.dev](https://triviaquiz.henriquesantos.dev)

---

## 📸 Preview

> Each question comes with 4 multiple-choice options and a live countdown timer bar. Answer before time runs out!

---

## ✨ Features

- 🎲 Questions fetched from the **Open Trivia Database (OpenTDB)** API
- ⏱️ Per-question **countdown timer** with a visual progress bar
- ✅ Immediate answer feedback (correct / wrong highlight)
- 📊 Score tracking across all questions
- 🔁 Restart the quiz after completion
- 🧹 HTML entity decoding via the `he` library (for clean question text)
- 🌈 Vibrant gradient UI with a playful design

---

## 🛠️ Tech Stack

- **React 19**
- **JavaScript (ES6+)**
- **CSS3**
- **[OpenTDB API](https://opentdb.com/)** — free trivia questions
- **[he](https://github.com/mathiasbynens/he)** — HTML entity decoder
- **gh-pages** for deployment

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Henr1queSantos/hs_trivia-quiz.git

# Navigate into the project
cd hs_trivia-quiz

# Install dependencies
npm install
```

### Running locally

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

---

## 📁 Project Structure

```
hs_trivia-quiz/
├── public/
├── src/
│   ├── components/
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Henrique Santos**

- Portfolio: [henriquesantos.dev](https://henriquesantos.dev)
- GitHub: [@Henr1queSantos](https://github.com/Henr1queSantos)
