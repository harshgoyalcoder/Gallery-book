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

export interface AlertProps {
  message: string;
  type: "success" | "error";
}
export interface ImageUploadProps {
  value: string;
  colIndex: number;
  todoId: number;
  handleImageUpload: (
    id: number,
    colIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleImageChange: (colIndex: number) => void;
  handleImageDelete: (id: number, colIndex: number) => void;
}
