import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import {
  removeTodo,
  addColumn,
  addTodo,
  removeColumn,
  handleDragEnd,
} from "../helperFuncs"; // Adjust the import path as needed
import TodoItem from "./TodoItem"; // Adjust import path if needed
import { Todo } from "@/interfaces";

const TodoTable: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [columns, setColumns] = useState<string[]>([
    "Product Filter",
    "Primary Variant",
    "Column 3",
  ]);
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showAlert = (message: string, type: "success" | "error") => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  const onDragEnd = (result: any) => {
    console.log("onDragEnd called with result:", result);
    handleDragEnd(result, todos, setTodos);
  };

  const handleRemoveColumn = (index: number) => {
    if (index >= 2) {
      removeColumn(index, columns, setColumns, todos, setTodos);
      showAlert("Column removed!", "error");
    }
  };

  const getColumnName = (index: number) => {
    if (index === 0) return "Product Filter";
    if (index === 1) return "Primary Variant";
    return `Variant ${index}`; // For Column 3 and onwards
  };

  return (
    <div>
      {alert && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 text-white rounded shadow-lg ${
            alert.type === "success"
              ? "border border-emerald-300  bg-green-500"
              : "border border-red-500  bg-red-600"
          }`}
        >
          {alert.message}
        </div>
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-todos" direction="vertical">
          {(provided) => (
            <div
              className="p-4"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div className="overflow-x-auto">
                <div className="min-w-max">
                  <div className="flex items-center mb-2">
                    <div className=" w-80"></div>
                    <div className="flex-grow flex items-center">
                      {columns.map((_, index) => (
                        <div
                          key={index}
                          className={`flex justify-start  items-center font-bold text-gray-500 ${
                            index === 0 ? "w-[380px]" : "w-80"
                          }`}
                        >
                          <span className="flex items-center justify-center">
                            {getColumnName(index)}
                          </span>
                          {index >= 2 && ( // Show delete button only for Column 3 and onwards
                            <button
                              className="ml-2 p-1 text-red-500 hover:text-red-700"
                              onClick={() => handleRemoveColumn(index)}
                            >
                              <TrashIcon className="w-6 h-6" />
                            </button>
                          )}
                        </div>
                      ))}

                      <button
                        className="ml-2 p-1 text-blue-500 hover:text-blue-700 border rounded border-blue-300"
                        onClick={() => {
                          addColumn(columns, setColumns, todos, setTodos);
                          showAlert("Column added!", "success");
                        }}
                      >
                        Add Column
                      </button>
                    </div>
                  </div>
                  {todos.map((todo, index) => (
                    <Draggable
                      key={todo.id}
                      draggableId={todo.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <TodoItem
                          key={todo.id}
                          todo={todo}
                          index={index}
                          provided={provided}
                          todos={todos}
                          setTodos={setTodos}
                          columnsCount={columns.length}
                          showAlert={showAlert}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <div className="mt-2 flex">
                    <button
                      className="p-2 text-green-500 hover:text-green-700 border rounded border-emerald-300"
                      onClick={() => {
                        addTodo(todos, setTodos, columns);
                        showAlert("Todo added!", "success");
                      }}
                    >
                      Add Row
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TodoTable;
