# Buzzle

**Buzzle** is a simple E-Commerce app bult with MERN.
This repository contains both the frontend (`clients/` using Next.js + React) and the backend (`server/` using Express + MongoDB).

---

## 🚀 Project Structure

```
buzzle/
  clients/    # Next.js (React) frontend
  server/     # Express/Mongoose backend API
```

---

## 🛠️ Getting Started

### **Clone the Repository**

```bash
git clone https://github.com/yourusername/buzzle.git
cd buzzle
```

---

### **Environment Variables**

Create `.env` files in both `clients/` and `server/` directories for sensitive keys and config.

-   **`clients/.env.local`** (example)

    ```
    NEXT_PUBLIC_API_URL=http://localhost:3000/api
    ```

-   **`server/.env`** (example)
    ```
    MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/buzzle?retryWrites=true&w=majority
    JWT_SECRET=your_jwt_secret
    ```

---

### **Install Dependencies**

**Frontend:**

```bash
cd clients
npm install
# or yarn
```

**Backend:**

```bash
cd ../server
npm install
# or yarn
```

---

### **Running Locally**

**Backend:**

```bash
cd server
npm run dev
# Starts Express on http://localhost:5000
```

**Frontend:**

```bash
cd ../clients
npm run dev
# Starts Next.js on http://localhost:3000
```

---

## 📁 Folder Details

-   **clients/**: All frontend React/Next.js code (pages, components, styles)
-   **server/**: All backend Node/Express/Mongoose code (models, routes, controllers)

---

## 📝 Scripts

| Command         | Location | Purpose                       |
| --------------- | -------- | ----------------------------- |
| `npm run dev`   | clients/ | Start frontend dev server     |
| `npm run dev`   | server/  | Start backend dev server      |
| `npm run build` | clients/ | Build frontend for production |
| `npm start`     | server/  | Start backend in prod mode    |

---

## 🧑‍💻 Tech Stack

-   **Frontend:** Next.js, React, Tailwind CSS
-   **Backend:** Node.js, Express, MongoDB, Mongoose, JWT Auth
-   **Other:** Axios/SWR, dotenv, etc.

---

(See the `/server/routes` directory for full API docs.)

---

## 📝 License

[MIT](LICENSE)

---
