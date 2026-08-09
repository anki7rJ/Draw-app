# 🎨 Draw App

A collaborative drawing app inspired by Excalidraw — jump into a room with friends or teammates and sketch together on a shared canvas, live.

## 🚀 What it does

- **Auth that works** — sign up, log in, and stay logged in with JWT stored in HTTP-only cookies (no messing around with localStorage tokens)
- **Rooms** — spin up a new drawing room or join an existing one
- **Live drawing** — every stroke shows up on everyone else's screen instantly, powered by WebSockets
- **Canvas-based editor** — built on the HTML5 Canvas API for smooth, responsive drawing
- **Clean, responsive UI** — built with Next.js and Tailwind, works well on different screen sizes

## 🛠️ Tech Stack

**Frontend**
- Next.js
- TypeScript
- Tailwind CSS
- Axios
- HTML5 Canvas API

**Backend**
- Node.js + Express
- WebSocket (`ws`)
- Prisma ORM
- PostgreSQL
- JWT Auth + Cookie Parser

## 🏗️ How it's put together

There are two separate flows happening under the hood:

**Regular HTTP traffic** (auth, room creation, etc.) goes through the Express backend, which talks to PostgreSQL via Prisma.

```
Client → HTTP → Express Backend → PostgreSQL
```

**Drawing events** go over a WebSocket connection. Once you're in a room, every stroke you draw gets broadcast to everyone else connected to that same room.

```
Client → WebSocket → WS Server → broadcasts to other clients in the room
```

## 🔄 How a session plays out

1. You sign up or log in
2. A JWT gets issued and stored in an HTTP-only cookie
3. You create a room or join one that already exists
4. The frontend opens a WebSocket connection for that room
5. You start drawing — every stroke fires off as an event
6. The server broadcasts it to everyone else in the room
7. Everyone sees your drawing appear on their screen, live

## 📸 What you can try out

- Creating a room
- Joining an existing one
- Drawing shapes on the canvas
- Watching changes sync in real time across multiple users in the same room

## 🔮 What's next

There's plenty of room to grow this into something more full-featured:

- Undo / redo
- Selecting and resizing shapes
- An eraser tool
- More colors and stroke width options
- Saving canvases to the database so they persist
- Exporting as PNG or PDF
- Live cursor presence, so you can see where others are pointing
- Redis pub/sub, to scale WebSocket broadcasting across multiple servers

## 📄 License

MIT — do what you want with it.

## 👨‍💻 Author

**Ankit Raj**
- GitHub: [AnkitRaj05](https://github.com/AnkitRaj05)
- LinkedIn: [ankitraj-cse](https://www.linkedin.com/in/ankitraj-cse)

---

If this project's useful to you, a star on GitHub goes a long way ⭐
