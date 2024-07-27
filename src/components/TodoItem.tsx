import React, { useState } from "react";
import {
  TrashIcon,
  ArrowsUpDownIcon,
  PlusIcon,
  PencilSquareIcon, // For image change
} from "@heroicons/react/24/outline";
import { Todo, TodoItemProps } from "@/interfaces";

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  index,
  provided,
  todos,
  setTodos,
  columnsCount,
  showAlert,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleImageUpload = (
    id: number,
    colIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    console.log(
      `Image upload triggered for todo id: ${id}, column index: ${colIndex}`
    );
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(
          `Image loaded for todo id: ${id}, column index: ${colIndex}`
        );
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
          updatedValues[colIndex] = ""; // Clear the image
          return { ...t, values: updatedValues };
        }
        return t;
      })
    );
  };

  const handleRemoveTodo = () => {
    console.log(`Remove todo triggered for todo id: ${todo.id}`);
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
      className="flex space-x-2 items-center p-2 rounded  mb-2"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div className="w-48 flex justify-around items-center">
        <button
          className="mr-2 p-1 text-red-500 hover:text-red-700"
          onClick={handleRemoveTodo} // Use the handleRemoveTodo function
        >
          <TrashIcon className="w-6 h-6" />
        </button>
        <span className="text-5xl font-serif">{todo.serialNumber}</span>
        <ArrowsUpDownIcon className="w-6 h-6" />
        <div className="mx-4 h-64 border-l border-gray-300"></div>
      </div>
<div className="flex gap-1">

      {todo.values.map((value, colIndex) => (
        <>
          <div
            key={colIndex}
            className={`${
              colIndex === 0 ? "w-[330px]" : "w-60"
            } h-56 border-dashed bg-white border-2 border-gray-300 rounded-md p-4 m-6 flex items-center  justify-center relative `}
            onMouseEnter={() => setHoveredIndex(colIndex)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {value ? (
              <div className="relative p-2 w-full h-full rounded-md ">
                <img
                  src={value}
                  alt="Uploaded"
                  className="object-cover w-full h-[90%] rounded-lg items-center align-middle"
                />
                <span className="text-center flex items-center font-bold justify-center p-1">
                  Anniversary Sale !!
                </span>
                {hoveredIndex === colIndex && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 text-white">
                    <button
                      onClick={() => handleImageChange(colIndex)}
                      className="p-2 mx-2"
                    >
                      <PencilSquareIcon className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => handleImageDelete(todo.id, colIndex)}
                      className="p-2 mx-2"
                    >
                      <TrashIcon className="w-6 h-6" />
                    </button>
                  </div>
                )}
              </div>
            ) : colIndex > 0 ? (
              <div className=" relative flex items-center justify-center w-full h-full">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(todo.id, colIndex, e)}
                  className="absolute rounded-lg inset-0 opacity-0 cursor-pointer"
                  id={`file-input-${colIndex}`}
                />
                <div className="flex rounded-lg items-center justify-center w-3/4 h-1/4  border bg-slate-100">
                  <PlusIcon className="w-4 h-4" />
                  <span className="text-sm">Add Image</span>
                </div>
              </div>
            ) : (
              <div className=" gap-1 flex items-center justify-center rounded-md w-3/4 h-1/4  border">
                <div className=" text-xs border-gray-300  rounded-md">
                  Product Collection {index + 1}
                </div>
              </div>
            )}
          </div>
          <div className="mx-2 h-64 border-l border-gray-300"></div>
        </>
      ))}
</div>

    </div>
  );
};

export default TodoItem;
