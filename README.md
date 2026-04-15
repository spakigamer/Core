# CORE — Task Management System

CORE is a high-end, minimalist full-stack application designed for efficient task tracking. It features a scalable Node.js/Express backend and a premium, industrial-style React frontend.

## 💎 Features

### 🔒 Backend (Secure & Scalable)
- **Engine**: Node.js & Express with MongoDB/Mongoose.
- **Security**: JWT Authentication + Bcrypt password hashing.
- **RBAC**: Role-Based Access Control (Admin vs. User).
- **Architecture**: Modular folder structure for separation of concerns.
- **REST APIs**: Full CRUD for tasks with versioned endpoints (`/api/v1`).
- **Health Monitoring**: Integrated `/health` endpoint for uptime monitoring (Render/Cron).
- **API Documentation**: Interactive **Swagger UI** available at `/api-docs`.

### 🎨 Frontend (Premium UI)
- **Aesthetic**: Extreme minimalist monochrome design (Industrial Neutral).
- **Core Stacks**: React (Vite) + Axios + React Router.
- **Animations**: Subtle, precise transitions powered by Framer Motion.
- **Auth Flow**: Secure registration, login, and protected dashboard routes.
- **Responsiveness**: Fully adaptive grid system for all device sizes.

## 🛠️ Tech Stack
- **Backend**: Node.js, Express, MongoDB, JSON Web Token, Bcrypt, Swagger, Morgan.
- **Frontend**: React 18, Vite, Framer Motion, Lucide Icons, Axios.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (Running locally or via Atlas)

### 1. Backend Setup
```bash
cd backend
npm install
# Configure your .env (PORT, MONGODB_URI, JWT_SECRET)
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
# Configure your .env (VITE_API_URL)
npm run dev
```

## 🌐 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Create a new account |
| `POST` | `/api/v1/auth/login` | Authenticate user |
| `GET` | `/api/v1/auth/me` | Get current user profile |
| `GET` | `/api/v1/tasks` | List all tasks (User's own or all for Admin) |
| `POST` | `/api/v1/tasks` | Create a new task |
| `GET` | `/api/v1/health` | Service health status |

## 📦 Scalability & Deployment
- **CORS**: Pre-configured for Vercel deployments.
- **Monitoring**: Ready for third-party status checkers via `/health`.
- **Note**: For high-traffic loads, it is recommended to implement Redis caching and containerization (Docker).

---
Built with focus and precision.
