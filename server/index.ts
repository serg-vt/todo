import express from 'express';
import cors from 'cors';
import path from 'path';
import { initDatabase, getDatabase, saveDatabase } from './database';
import { Todo, CreateTodoDto, UpdateTodoDto } from '../shared';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Get all todos
app.get('/api/todos', (req, res) => {
  try {
    const db = getDatabase();
    const result = db.exec('SELECT * FROM todos ORDER BY id DESC');

    const todos: Todo[] = result.length > 0
      ? result[0].values.map((row: any[]) => ({
          id: row[0],
          title: row[1],
          text: row[2],
          createdAt: row[3],
          updatedAt: row[4],
        }))
      : [];

    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// Create a new todo
app.post('/api/todos', (req, res) => {
  try {
    const { title, text } = req.body as CreateTodoDto;

    if (!title || !text) {
      return res.status(400).json({ error: 'Title and text are required' });
    }

    const db = getDatabase();
    const now = new Date().toISOString();

    db.run(
      'INSERT INTO todos (title, text, createdAt, updatedAt) VALUES (?, ?, ?, ?)',
      [title, text, now, now]
    );

    // Get the last inserted row ID immediately after insert
    const lastIdResult = db.exec('SELECT last_insert_rowid() as id');

    if (!lastIdResult.length || !lastIdResult[0].values.length) {
      console.error('Failed to get last inserted ID', lastIdResult);
      return res.status(500).json({ error: 'Failed to get last inserted ID' });
    }

    const lastId = lastIdResult[0].values[0][0] as number;

    // Get the newly created todo
    const result = db.exec(`SELECT * FROM todos WHERE id = ${lastId}`);

    if (!result.length || !result[0].values.length) {
      console.error('Failed to retrieve created todo', result);
      return res.status(500).json({ error: 'Failed to retrieve created todo' });
    }

    const row = result[0].values[0];

    // Save database after we've retrieved the data
    saveDatabase();

    const newTodo: Todo = {
      id: row[0] as number,
      title: row[1] as string,
      text: row[2] as string,
      createdAt: row[3] as string,
      updatedAt: row[4] as string,
    };

    res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// Update a todo
app.put('/api/todos/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { title, text } = req.body as UpdateTodoDto;

    if (!title || !text) {
      return res.status(400).json({ error: 'Title and text are required' });
    }

    const db = getDatabase();
    const now = new Date().toISOString();

    db.run(
      'UPDATE todos SET title = ?, text = ?, updatedAt = ? WHERE id = ?',
      [title, text, now, id]
    );

    saveDatabase();

    // Get the updated row
    const result = db.exec(`SELECT * FROM todos WHERE id = ${id}`);

    if (!result.length || !result[0].values.length) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    const row = result[0].values[0];
    const updatedTodo: Todo = {
      id: row[0] as number,
      title: row[1] as string,
      text: row[2] as string,
      createdAt: row[3] as string,
      updatedAt: row[4] as string,
    };

    res.json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  try {
    const { id } = req.params;
    const db = getDatabase();

    // Check if todo exists
    const checkResult = db.exec(`SELECT id FROM todos WHERE id = ${id}`);
    if (!checkResult.length || !checkResult[0].values.length) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    db.run(`DELETE FROM todos WHERE id = ${id}`);
    saveDatabase();

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// Initialize database and start server
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to initialize database:', error);
  process.exit(1);
});

