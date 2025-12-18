import { Todo, UpdateTodoDto } from "../../../../../shared";
import { TodoItem } from "../item";
import './TodoList.scss';

interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: number, dto: UpdateTodoDto) => void;
  onDelete: (id: number) => void;
}

function TodoList({ todos, onUpdate, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="todo-list-empty">
        <p>No todos yet. Create your first one!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TodoList;

