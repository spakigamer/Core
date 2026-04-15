# Intern Assignment: Scalable Task Management API & Dashboard

A full-stack application built for a Backend Developer Internship assignment. It features a scalable Node.js/Express backend with MongoDB and a modern React frontend.

## 🚀 Features

### Backend (Core Focus)
- **User Authentication**: Secure registration and login using JWT and bcrypt password hashing.
- **RBAC (Role-Based Access Control)**: Support for 'Admin' and 'User' roles.
- **Task Management**: Full CRUD operations for tasks (Title, Description, Status).
- **Security**: JWT protection, input validation, and secure error handling.
- **Documentation**: Interactive API docs via Swagger.
- **Database**: MongoDB integration using Mongoose models.

### Frontend
- **Modern UI**: Dark-themed dashboard with Glassmorphism aesthetics.
- **Animations**: Smooth transitions using Framer Motion.
- **Auth Flow**: Complete Login, Register, and Protected Dashboard routes.
- **Responsive**: Fully functional on mobile and desktop.

## 🛠️ Tech Stack
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt, Morgan, Swagger.
- **Frontend**: React (Vite), Axios, React Router, Lucide Icons, Framer Motion.

## 📦 Getting Started

### Prerequisites
- Node.js installed
- MongoDB installed locally or a MongoDB Atlas URI

### Backend Setup
1. Navigate to the backend folder: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file (one is already provided with defaults):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/intern-assignment
   JWT_SECRET=supersecretkey123
   NODE_ENV=development
   ```
4. Start the server: `npm run dev`
5. API Docs: Visit `http://localhost:5000/api-docs`

### Frontend Setup
1. Navigate to the frontend folder: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Access the app: `http://localhost:5173`

## 📝 Scalability Note
To scale this application further:
1. **Caching**: Implement Redis to cache frequent Task queries and user sessions.
2. **Microservices**: Decouple Auth and Task management into separate services.
3. **Load Balancing**: Use Nginx or a cloud load balancer to distribute traffic.
4. **Docker**: Containerize the app for consistent deployment.
5. **Validation**: Use `joi` or `express-validator` for more rigorous input sanitization.

---
Built by [Your Name/AI Assistant] for the Backend Developer (Intern) Assignment.
