# Receiptify 🧾🤖

A Nuxt-based web app that lets users upload a photo of a **receipt**, and returns structured **JSON** with product data, prices, store info and more.  
Built to detect multilingual receipts (Romanian, Russian, etc.)

---

## 🧠 Features

- 🖼️ Drag & drop image interface
- 🧾 Detects if uploaded file is a real receipt
- 📤 Returns consistent JSON output
- 🚫 Gracefully handles non-receipt uploads
- ⚡ Powered by OpenAI or compatible Vision models

---

## 📦 Stack

- [Nuxt 3](https://nuxt.com) — frontend & server
- [OpenAI API](https://platform.openai.com) — for Vision / chat completions

---

## 🔧 Usage

```bash
# Install dependencies
bun install

# Run dev server
bun dev
```

Then open `http://localhost:3000`.
