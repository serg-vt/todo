export interface Todo {
  id: number;
  title: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoDto {
  title: string;
  text: string;
}

export interface UpdateTodoDto {
  title: string;
  text: string;
}

