import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

interface ColumnHeadersProps {
  columns: string[];
  getColumnName: (index: number) => string;
  handleRemoveColumn: (index: number) => void;
  addColumn: () => void;
}

const ColumnHeaders: React.FC<ColumnHeadersProps> = ({
  columns,
  getColumnName,
  handleRemoveColumn,
  addColumn
}) => {
  return (
    <div className="flex items-center mb-2">
      <div className="w-80"></div>
      <div className="flex-grow flex items-center">
        {columns.map((_, index) => (
          <div
            key={index}
            className={`flex justify-start items-center font-bold text-gray-500 ${index === 0 ? "w-[380px]" : "w-80"}`}
          >
            <span className="flex items-center justify-center">
              {getColumnName(index)}
            </span>
            {index >= 2 && (
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
          onClick={addColumn}
        >
          Add Column
        </button>
      </div>
    </div>
  );
};

export default ColumnHeaders;
