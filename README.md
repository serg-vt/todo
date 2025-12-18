# TODO App

A full-stack TODO application built with React (frontend) and Node.js + Express (backend), using SQLite as the database.

## Features

- ✅ Create new TODO items with title and description
- ✅ View all TODO items in a clean, single-column layout
- ✅ Edit existing TODO items
- ✅ Delete TODO items
- ✅ Automatic timestamps for creation and updates
- ✅ Minimalistic, responsive UI

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- CSS3

### Backend
- Node.js
- Express
- TypeScript
- SQLite (better-sqlite3)

## Project Structure

```
todo/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── App.tsx      # Main App component
│   │   └── main.tsx     # Entry point
│   ├── index.html
│   └── package.json
├── server/              # Express backend
│   ├── index.ts         # API server
│   └── database.ts      # Database configuration
├── shared/              # Shared TypeScript types
│   └── types.ts
└── package.json         # Root package.json
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Install all dependencies:

```bash
npm run install:all
```

This will install dependencies for both the root project and the client.

### Development

Run both frontend and backend in development mode:

```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:3001`
- Frontend dev server on `http://localhost:3000`

The frontend is configured to proxy API requests to the backend.

### Building for Production

Build both frontend and backend:

```bash
npm run build
```

### Running in Production

After building, start the production server:

```bash
npm start
```

The server will serve the React app and handle API requests on port 3001 (or the PORT environment variable).

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Database

The app uses SQLite with the `sql.js` driver (a JavaScript implementation that doesn't require native compilation). The database file (`todos.db`) is automatically created in the root directory on first run.

### Database Schema

```sql
CREATE TABLE todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  text TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
)
```

## Future Enhancements

- User authentication and multi-user support
- Todo categories/tags
- Due dates and reminders
- Search and filter functionality
- Todo priority levels
- Dark mode
- Mobile app

## License

MIT

