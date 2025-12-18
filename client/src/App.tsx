import { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { Todo, CreateTodoDto, UpdateTodoDto } from '../../shared/types';
import './App.css';

const API_URL = 'http://localhost:3001/api';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/todos`);
      if (!response.ok) throw new Error('Failed to fetch todos');
      const data = await response.json();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Failed to load todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Create a new todo
  const handleCreate = async (dto: CreateTodoDto) => {
    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
      });
      if (!response.ok) throw new Error('Failed to create todo');
      const newTodo = await response.json();
      setTodos([newTodo, ...todos]);
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError('Failed to create todo');
      console.error(err);
    }
  };

  // Update a todo
  const handleUpdate = async (id: number, dto: UpdateTodoDto) => {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
      });
      if (!response.ok) throw new Error('Failed to update todo');
      const updatedTodo = await response.json();
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
      setError(null);
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
    }
  };

  // Delete a todo
  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this todo?')) return;

    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete todo');
      setTodos(todos.filter(todo => todo.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete todo');
      console.error(err);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>TODO App</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ New TODO'}
        </button>
      </header>

      <main className="app-main">
        {error && <div className="error-message">{error}</div>}

        {showForm && (
          <TodoForm
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
          />
        )}

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <TodoList
            todos={todos}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
}

export default App;

