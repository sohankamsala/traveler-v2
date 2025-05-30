---

# 🌍 traveler-v2

A personal project built as my **first React app** to use various libraries and learn **Express** and **API integration**.

This app helps users discover images and information about places around the world, including sightseeing recommendations and travel tips.

---

## 🛠 Tech Stack

* **Frontend:** Vite + React
* **Backend:** Node.js + Express

---

## ⚠️ Heads Up: Secrets in Frontend

This project was made for fun and learning purposes. Some API keys and secrets are exposed in the frontend — **not secure for production**.

For serious projects, I’ll follow best practices:

* Proper secret management (e.g., backend proxying or secure env storage)
* No direct secret exposure in client-side code

> **Not for a security reference. Just a project. 😄**

---

## 🚀 Getting Started

### Run the Frontend

```bash
cd traveler-v2-front
npm install
npm run dev
```

### Run the Backend (in project root or traveler-v2-server)

```bash
cd traveler-v2-server
npm install
node .
```

---

## 🌐 Example `.env` Files

### Backend (`traveler-v2-server/.env`)

```env
AZURE_OPENAI_ENDPOINT=https://woahevrynice.openai.azure.com/
AZURE_OPENAI_API_KEY=your_azure_openai_key_here
AZURE_OPENAI_API_VERSION=2024-05-01-preview
AZURE_OPENAI_DEPLOYMENT=info-gen
```

### Frontend (`traveler-v2-front/.env`)

```env
VITE_GOOGLE_API_KEY=your_google_api_key_here
VITE_GOOGLE_CX_FLAG=your_cx_flag
VITE_GOOGLE_CX_GENERAL=your_cx_general
VITE_OPENAI_PROXY=http://localhost:8080/openai
```
