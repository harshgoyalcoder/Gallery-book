import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  addColumn,
  addTodo,
  removeColumn,
  handleDragEnd,
} from "../helperFuncs";
import TodoItem from "./TodoItem";
import Alert, { useAlert } from "./Alert";
import { Todo } from "@/interfaces";
import ColumnHeaders from "./ColumnHeaders";
import AddRowButton from "./AddRowButton";

const TodoTable: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [columns, setColumns] = useState<string[]>([
    "Product Filter",
    "Primary Variant",
  ]);

  const { alert, showAlert } = useAlert();

  const onDragEnd = (result: any) => {
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
    return `Variant ${index}`;
  };

  const addColumnHandler = () => {
    addColumn(columns, setColumns, todos, setTodos);
    showAlert("Column added!", "success");
  };

  const addTodoHandler = () => {
    addTodo(todos, setTodos, columns);
    showAlert("Todo added!", "success");
  };

  return (
    <div>
      {alert && <Alert message={alert.message} type={alert.type} />}
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
                  <ColumnHeaders
                    columns={columns}
                    getColumnName={getColumnName}
                    handleRemoveColumn={handleRemoveColumn}
                    addColumn={addColumnHandler}
                  />

                  {/* Draggable Todos */}
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
                  <AddRowButton addTodo={addTodoHandler} />
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
