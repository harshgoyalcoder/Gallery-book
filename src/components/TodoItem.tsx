import React from "react";
// import { DraggableProvided } from "react-beautiful-dnd";
import ImageUpload from "./ImageUpload";
import { TodoItemProps } from "@/interfaces";
import TodoActions from "./ToDoActions";

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  index,
  provided,
  todos,
  setTodos,
  columnsCount,
  showAlert,
}) => {
  const handleImageUpload = (
    id: number,
    colIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTodos(
          todos.map((t) => {
            if (t.id === id) {
              const updatedValues = [...t.values];
              updatedValues[colIndex] = reader.result as string;
              return { ...t, values: updatedValues };
            }
            return t;
          })
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = (colIndex: number) => {
    document.getElementById(`file-input-${colIndex}`)?.click();
  };

  const handleImageDelete = (id: number, colIndex: number) => {
    setTodos(
      todos.map((t) => {
        if (t.id === id) {
          const updatedValues = [...t.values];
          updatedValues[colIndex] = "";
          return { ...t, values: updatedValues };
        }
        return t;
      })
    );
  };

  const handleRemoveTodo = () => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((t) => t.id !== todo.id);
      if (updatedTodos.length < prevTodos.length) {
        showAlert("Row removed!", "error");
      }
      return updatedTodos;
    });
  };

  return (
    <div
      className="flex space-x-2 items-center p-2 rounded mb-2"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <TodoActions
        handleRemoveTodo={handleRemoveTodo}
        serialNumber={todo.serialNumber}
      />
      <div className="flex gap-1">
        {todo.values.map((value, colIndex) => (
          <React.Fragment key={colIndex}>
            <ImageUpload
              value={value}
              colIndex={colIndex}
              todoId={todo.id}
              handleImageUpload={handleImageUpload}
              handleImageChange={handleImageChange}
              handleImageDelete={handleImageDelete}
            />
            {colIndex < todo.values.length - 1 && (
              <div className="mx-2 h-64 border-l border-gray-300"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TodoItem;
