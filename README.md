# Taskified 📝

**Taskified** is a minimal and efficient task management web app where users can create tasks and subtasks with weighted completion tracking. It ensures subtasks sum up to 100%, prevents empty task entries, and provides clear feedback with toasts.

---

## 🔗 Deployed Link

[Visit Taskified](https://taskified-frontend.netlify.app/)

---

## 🚀 Key Features

- Add parent tasks and subtasks dynamically
- Auto-calculates and displays percentage completion for each task
- Prevents saving until total task completion is exactly 100%
- Subtask weight field editable; parent task weight auto-updated
- Inline deletion of tasks and subtasks
- Toast notifications for error and success (via Sonner)
- Modern, clean UI using Tailwind CSS

---

## 🛠 Tech Stack
- React.js – Frontend library for building UI
- Tailwind CSS – Utility-first CSS framework
- Lucide React – icon pack
- Sonner – Toast notification system

---

## Installation & Setup

Follow these steps to run the project locally:

```bash
# 1. Clone the repository
git clone https://github.com/abdullashahil/Frontend-round-2
cd client

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev