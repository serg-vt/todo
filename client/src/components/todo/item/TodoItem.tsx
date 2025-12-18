import { useState } from 'react';
import { Todo, UpdateTodoDto } from "../../../../../shared";
import { ConfirmDialog } from "../../dialog";
import './TodoItem.scss';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: number, dto: UpdateTodoDto) => void;
  onDelete: (id: number) => void;
}

const TodoItem = ({ todo, onUpdate, onDelete }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [text, setText] = useState(todo.text);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSave = () => {
    if (title.trim() && text.trim()) {
      onUpdate(todo.id, { title: title.trim(), text: text.trim() });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setTitle(todo.title);
    setText(todo.text);
    setIsEditing(false);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    onDelete(todo.id);
    setShowDeleteConfirm(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <div className="todo-edit-form">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="todo-title-input"
            placeholder="Title"
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="todo-text-input"
            placeholder="Description"
            rows={4}
          />
          <div className="todo-actions">
            <button className="btn btn-success" onClick={handleSave}>
              Save
            </button>
            <button className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="todo-item">
        <div className="todo-content">
          <h3 className="todo-title">{todo.title}</h3>
          <p className="todo-text">{todo.text}</p>
          <div className="todo-meta">
            <span>Created: {new Date(todo.createdAt).toLocaleString()}</span>
            {todo.updatedAt !== todo.createdAt && (
              <span>Updated: {new Date(todo.updatedAt).toLocaleString()}</span>
            )}
          </div>
        </div>
        <div className="todo-actions">
          <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Delete TODO"
        message={`Are you sure you want to delete "${todo.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  );
}

export default TodoItem;
