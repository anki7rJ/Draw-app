# 🎨 Draw App

A real-time collaborative drawing application inspired by Excalidraw, where multiple users can join a room and draw together instantly.

## 🚀 Features

- 🔐 User Authentication (Signup/Login)
- 🍪 JWT Authentication using HTTP-only Cookies
- 🏠 Create and Join Drawing Rooms
- ✏️ Real-time Collaborative Drawing
- ⚡ WebSocket-based communication
- 🎯 Canvas-based drawing interface
- 📱 Responsive UI built with Next.js and Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- Axios
- HTML5 Canvas API

### Backend
- Node.js
- Express.js
- WebSocket (`ws`)
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Cookie Parser

---

## 📂 Project Structure





---

## 🏗️ Architecture


Client
   |
   | HTTP Request (Authentication, Room APIs)
   ↓
HTTP Backend (Express)
   |
   | Stores Data
   ↓
PostgreSQL

Client
   |
   | WebSocket Connection
   ↓
WS Backend
   |
   | Broadcast Drawing Events
   ↓
Other Connected Clients



## 🔄 Application Flow

1. User signs up or logs in.
2. JWT token is stored in an HTTP-only cookie.
3. User creates or joins a room.
4. Frontend establishes a WebSocket connection.
5. User sends drawing events.
6. WebSocket server broadcasts events to all users in the room.
7. Every connected user sees the drawing in real time.

---

## 📸 Features Demo

- Create Room
- Join Existing Room
- Draw Shapes
- Real-time Collaboration
- Multiple Users in Same Room

---

## 🔮 Future Improvements

- Undo / Redo
- Shape Selection and Resizing
- Eraser Tool
- Different Colors and Stroke Sizes
- Save Canvas to Database
- Export as PNG/PDF
- Cursor Presence Indicators
- Redis Pub/Sub for Horizontal Scaling

---



## 📄 License

This project is licensed under the MIT License.



## 👨‍💻 Author

**Ankit Raj**

- GitHub: https://github.com/AnkitRaj05
- LinkedIn: https://www.linkedin.com/in/ankitraj-cse

⭐ If you liked this project, consider giving it a star!
