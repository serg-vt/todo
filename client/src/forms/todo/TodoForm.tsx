import { useState, FormEvent } from 'react';
import { CreateTodoDto } from "../../../../shared";

import './TodoForm.css';

interface TodoFormProps {
  onSubmit: (dto: CreateTodoDto) => void;
  onCancel: () => void;
}

const TodoForm = ({ onSubmit, onCancel }: TodoFormProps) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim() && text.trim()) {
      onSubmit({ title: title.trim(), text: text.trim() });
      setTitle('');
      setText('');
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <h2>Create New Item</h2>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title..."
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="text">Description</label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter description..."
          rows={4}
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-success">Create</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
