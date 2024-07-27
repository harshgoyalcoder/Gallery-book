// AddRowButton.tsx
import React from "react";

interface AddRowButtonProps {
  addTodo: () => void;
}

const AddRowButton: React.FC<AddRowButtonProps> = ({ addTodo }) => {
  return (
    <div className="mt-2 flex">
      <button
        className="p-2 text-green-500 hover:text-green-700 border rounded border-emerald-300"
        onClick={addTodo}
      >
        Add Row
      </button>
    </div>
  );
};

export default AddRowButton;
