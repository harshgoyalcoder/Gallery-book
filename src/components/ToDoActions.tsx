import React from "react";
import { TrashIcon, ArrowsUpDownIcon } from "@heroicons/react/24/outline";

interface TodoActionsProps {
  handleRemoveTodo: () => void;
  serialNumber: number;
}

const TodoActions: React.FC<TodoActionsProps> = ({
  handleRemoveTodo,
  serialNumber,
}) => {
  return (
    <div className="w-48 flex justify-around items-center">
      <button
        className="mr-2 p-1 text-red-500 hover:text-red-700"
        onClick={handleRemoveTodo}
      >
        <TrashIcon className="w-6 h-6" />
      </button>
      <span className="text-5xl font-serif">{serialNumber}</span>
      <ArrowsUpDownIcon className="w-6 h-6" />
      <div className="mx-4 h-64 border-l border-gray-300"></div>
    </div>
  );
};

export default TodoActions;
