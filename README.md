# 💬 GOSSIPIN — Real-Time Chat Platform

A modern, responsive, and secure full-stack real-time chat application built with the **MERN** stack and **Socket.io**. Features live message delivery, real-time online presence, media sharing, interactive sound effects, and enterprise-grade security powered by Arcjet.

---

## ✨ Features

- **⚡ Instant Real-Time Messaging**: 1-on-1 live chat powered by `Socket.io` with auto-scrolling and optimistic UI updates.
- **🟢 Live Online/Offline Presence**: Real-time user status tracking across chat partners and contacts.
- **📸 Image & Media Sharing**: Upload and send images seamlessly in chat and update profile avatars with `Cloudinary`.
- **🔊 Interactive Sound Effects**:
  - Mechanical keyboard typing sounds when drafting messages.
  - Incoming message notification sound alerts.
  - Global audio mute/unmute toggle persisted in localStorage.
- **🛡️ Enterprise Security (Arcjet)**:
  - **Shield Protection**: Shields against common web attacks and injection attempts.
  - **Bot Detection**: Blocks malicious automated bots.
  - **Rate Limiting**: Protects login and message endpoints against abuse and brute-force.
- **🔐 Secure Authentication**:
  - Password encryption using `bcryptjs`.
  - JWT session tokens stored in secure, `SameSite=Strict`, HTTP-only cookies.
- **✉️ Transactional Welcome Emails**: Automated onboarding welcome emails powered by the `Resend` API.
- **🎨 Modern Glassmorphic UI**: Sleek dark UI built with `Tailwind CSS` and `DaisyUI` with smooth animations and toast notifications.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS, DaisyUI, Zustand, Socket.io-client, Lucide Icons, React Hot Toast |
| **Backend** | Node.js, Express.js, Socket.io, MongoDB, Mongoose |
| **Security** | Arcjet (`@arcjet/node`), JWT (`jsonwebtoken`), `bcryptjs`, `cookie-parser` |
| **Services** | Cloudinary (Media storage), Resend (Email service) |

---

## 📁 Project Structure

```text
GOSSIPIN/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Route controllers (auth, messages)
│   │   ├── emails/         # Resend email templates & sender
│   │   ├── lib/            # DB, Socket.io, Cloudinary, Arcjet & Resend configs
│   │   ├── middleware/     # Auth, Socket auth & Arcjet middlewares
│   │   ├── models/         # Mongoose schemas (User, Message)
│   │   ├── routes/         # Express API routes
│   │   └── server.js       # Server entry point & HTTP listener
│   └── package.json
├── frontend/
│   ├── public/             # Static assets & sound effects (.mp3)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks (keyboard sounds)
│   │   ├── pages/          # ChatPage, LoginPage, SignUpPage
│   │   └── store/          # Zustand state stores (UseAuthStore, UseChatStore)
│   └── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (Local instance or Atlas URI)
- [Cloudinary](https://cloudinary.com/) Account (Cloud name, API Key, API Secret)
- [Resend](https://resend.com/) Account (API Key)
- [Arcjet](https://arcjet.com/) Account (API Key)

---

### 2. Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in `backend/` with the following variables:
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
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_CLOUD_API=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret

   # Arcjet Security
   ARCJET_KEY=your_arcjet_api_key
   ARCJET_ENV=development
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

---

### 3. Frontend Setup

1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📡 API Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/signup` | Create account & dispatch welcome email | ❌ |
| `POST` | `/login` | Authenticate user & issue JWT cookie | ❌ |
| `POST` | `/logout` | Invalidate cookie & clear session | ✅ |
| `PUT` | `/update-profile` | Upload profile image to Cloudinary | ✅ |
| `GET` | `/check` | Verify user session on mount | ✅ |

### Messages (`/api/messages`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/contacts` | Fetch all registered contacts | ✅ |
| `GET` | `/chats` | Fetch conversation list with chat partners | ✅ |
| `GET` | `/:id` | Fetch conversation history with a user | ✅ |
| `POST` | `/send/:id` | Send a text and/or image message | ✅ |

---

## 👨‍💻 Author

**Ayush Bhandari**
- GitHub: [@BABAA-Y](https://github.com/BABAA-Y)
- LinkedIn: [Ayush Bhandari](https://www.linkedin.com/in/ayushbhandarii/)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
