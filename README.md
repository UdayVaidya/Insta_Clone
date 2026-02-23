# 📸 Instagram Clone

A full-stack Instagram-inspired social media application built with **React**, **Node.js**, **Express**, and **MongoDB**.

---

## 🚀 Features

- **Authentication** — Register and login with JWT-based sessions
- **Posts** — Create posts with image uploads (via ImageKit), like, and save posts
- **Social** — Follow / unfollow users, view followers & following
- **Protected Routes** — Auth-guarded pages on the frontend

---

## 🏗️ Tech Stack

| Layer     | Technology                                       |
| --------- | ------------------------------------------------ |
| Frontend  | React 19, React Router v7, Tailwind CSS v4, Vite |
| Backend   | Node.js, Express 5, MongoDB, Mongoose            |
| Auth      | JWT, bcryptjs, cookie-parser                     |
| Media     | Multer, ImageKit                                 |
| Dev Tools | Nodemon, ESLint                                  |

---

## 📁 Project Structure

```
Project/
├── Backend/
│   ├── server.js            # Entry point
│   └── src/
│       ├── app.js           # Express app setup
│       ├── config/          # DB connection
│       ├── controller/      # Route controllers (auth, post, user)
│       ├── middlewares/     # Auth middleware
│       ├── models/          # Mongoose models (User, Post, Like)
│       └── routes/          # API routes (auth, post, user)
└── Frontend/
    ├── index.html
    └── src/
        ├── App.jsx          # Root component
        ├── main.jsx         # React mounting point
        ├── auth.routes.jsx  # Main routing configuration
        ├── index.css        # Styling and Tailwind imports
        └── Features/        # Feature-based folder structure
            ├── auth/        # Authentication module
            │   ├── components/
            │   ├── hooks/       # e.g., useAuth.js
            │   ├── pages/       # AuthPage.jsx, Login.jsx, Register.jsx
            │   ├── services/    # auth.api.js
            │   └── auth.context.jsx
            └── Post/        # Posts and Feed module
                ├── components/  # Post.jsx
                ├── hooks/       # e.g., usePost.js
                ├── pages/       # Feed.jsx
                ├── services/    # post.api.js
                └── post.context.jsx
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js ≥ 18
- MongoDB (local or Atlas)
- An [ImageKit](https://imagekit.io/) account

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Project
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

Start the backend dev server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../Frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`.

---

## 📡 API Endpoints

### Auth — `/api/auth`

| Method | Endpoint    | Description       |
| ------ | ----------- | ----------------- |
| POST   | `/register` | Register new user |
| POST   | `/login`    | Login user        |
| POST   | `/logout`   | Logout user       |

### Posts — `/api/posts`

| Method | Endpoint    | Description        |
| ------ | ----------- | ------------------ |
| POST   | `/`         | Create a post      |
| GET    | `/`         | Get all posts      |
| POST   | `/:id/like` | Like / unlike post |
| POST   | `/:id/save` | Save / unsave post |

### Users — `/api/users`

| Method | Endpoint            | Description      |
| ------ | ------------------- | ---------------- |
| POST   | `/:username/follow` | Follow a user    |
| GET    | `/:username`        | Get user profile |

---

## 🧑‍💻 Author

**Uday Vaidya**
