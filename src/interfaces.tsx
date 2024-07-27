export interface Todo {
  serialNumber: number;
  id: number;
  values: string[];
}

export interface TodoItemProps {
  todo: Todo;
  index: number;
  provided: any;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  columnsCount: number;
  showAlert: (message: string, type: "success" | "error") => void; // Added this prop
}
