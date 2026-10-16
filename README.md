# 💬 GOSSIPIN — Real-Time Chat Platform

A modern, secure, full-stack real-time messaging application built with the **MERN** stack, featuring live WebSocket communication, enterprise-grade bot and rate-limit security, media sharing, and automated onboarding emails.

---

## ✨ Features

- **⚡ Real-Time Messaging**: Instant 1-on-1 chat and typing indicators powered by WebSockets (`Socket.io`).
- **🛡️ Enterprise Security (Arcjet)**:
  - **Shield Protection**: Defends against SQL/NoSQL injection and common malicious payload attacks.
  - **Bot Detection**: Distinguishes between search engines and malicious spoofed bot traffic.
  - **Sliding Window Rate Limiting**: Throttles brute-force attempts and API abuse gracefully.
- **🔐 Secure Authentication**:
  - Encrypted password hashing with `bcryptjs`.
  - Stateless JSON Web Tokens (JWT) stored in HTTP-Only, `SameSite=Strict` cookies to block XSS and CSRF attacks.
- **🖼️ Media & Image Sharing**: Integrated with `Cloudinary` for profile avatar updates and rich image message uploads.
- **✉️ Transactional Email Workflows**: Automated HTML welcome emails powered by `Resend` upon user registration.
- **👥 Contact & Chat Management**: Filter contacts, view conversation history, and fetch real-time message feeds.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS / Modern CSS
- **Icons**: Lucide Icons
- **Real-Time Client**: Socket.io-client

### Backend
- **Runtime & Framework**: Node.js, Express.js (ES Modules)
- **Database**: MongoDB with Mongoose ODM
- **Security & Rate Limiting**: Arcjet (`@arcjet/node`, `@arcjet/inspect`)
- **Authentication**: JWT (`jsonwebtoken`) & `cookie-parser`
- **Media Management**: Cloudinary SDK
- **Email Delivery**: Resend API

---

## 📁 Project Structure

```text
GOSSIPIN/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Request handlers (auth, messages)
│   │   ├── emails/         # Resend email templates & handlers
│   │   ├── lib/            # DB, Arcjet, Cloudinary, Resend & Utils configs
│   │   ├── middleware/     # Auth (JWT) & Arcjet protection middleware
│   │   ├── models/         # Mongoose schemas (User, Message)
│   │   ├── routes/         # Express API route declarations
│   │   └── server.js       # App entry point & HTTP listener
│   └── package.json
├── frontend/
│   ├── src/                # React components, pages & hooks
│   └── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB Atlas](https://www.mongodb.com/atlas) account or local MongoDB instance
- [Cloudinary](https://cloudinary.com/) account
- [Resend](https://resend.com/) account
- [Arcjet](https://arcjet.com/) account

---

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file inside `backend/` and configure your credentials:
   ```env
   PORT=3000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173

   # Database
   MONGO_URL=your_mongodb_connection_string

   # JWT
   JWT_SECRET=your_jwt_secret_key

   # Resend Email
   RESEND_API_KEY=your_resend_api_key
   EMAIL_FROM=onboarding@resend.dev
   EMAIL_FROM_NAME="GOSSIPIN"

   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_CLOUD_API=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Arcjet Security
   ARCJET_KEY=your_arcjet_api_key
   ARCJET_ENV=development
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

---

### 3. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/signup` | Register new user & dispatch welcome email | No |
| `POST` | `/api/auth/login` | Authenticate user & issue JWT cookie (Arcjet protected) | No |
| `POST` | `/api/auth/logout` | Clear auth cookie | Yes |
| `PUT` | `/api/auth/update-profile` | Update user avatar via Cloudinary | Yes |
| `GET` | `/api/auth/check` | Validate current session & user data | Yes |
| `GET` | `/api/messages/contacts` | Fetch available contacts list | Yes |
| `GET` | `/api/messages/:id` | Fetch conversation history with a user | Yes |
| `POST` | `/api/messages/send/:id` | Send a text/image message | Yes |

---

## 👨‍💻 Author

**Ayush Bhandari**
- GitHub: [@BABAA-Y](https://github.com/BABAA-Y)
- LinkedIn: [Ayush Bhandari](https://www.linkedin.com/in/ayushbhandarii/)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
