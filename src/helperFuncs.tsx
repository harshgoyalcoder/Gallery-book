import { Todo } from "./interfaces";

export const removeTodo = (
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  id: number
) => {
  setTodos(todos.filter((todo) => todo.id !== id));
};

export const addColumn = (
  columns: string[],
  setColumns: React.Dispatch<React.SetStateAction<string[]>>,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
) => {
  const newColumnName = `Column ${columns.length + 1}`;
  setColumns([...columns, newColumnName]);
  setTodos(todos.map((todo) => ({ ...todo, values: [...todo.values, ""] })));
};

export const removeColumn = (
  index: number,
  columns: string[],
  setColumns: React.Dispatch<React.SetStateAction<string[]>>,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
) => {
  setColumns(columns.filter((_, colIndex) => colIndex !== index));
  setTodos(
    todos.map((todo) => ({
      ...todo,
      values: todo.values.filter((_, colIndex) => colIndex !== index),
    }))
  );
};

export const addTodo = (
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  columns: string[]
) => {
  const newTodo = {
    serialNumber: todos.length + 1,
    id: Date.now(),
    values: columns.map(() => ""),
  };
  setTodos([...todos, newTodo]);
};

export const handleDragEnd = (
  result: any,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
) => {
  const { source, destination } = result;

  if (!destination) return;

  const reorderedTodos = Array.from(todos);
  const [removed] = reorderedTodos.splice(source.index, 1);
  reorderedTodos.splice(destination.index, 0, removed);

  const renamedTodos = reorderedTodos.map((todo, index) => ({
    ...todo,
    serialNumber: index + 1,
  }));
  setTodos(renamedTodos);
};
