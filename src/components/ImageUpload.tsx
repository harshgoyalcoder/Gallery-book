import React, { useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { ImageUploadProps } from "@/interfaces";



const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  colIndex,
  todoId,
  handleImageUpload,
  handleImageChange,
  handleImageDelete,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={`${
        colIndex === 0 ? "w-[330px]" : "w-60"
      } h-56 border-dashed bg-white border-2 border-gray-300 rounded-md p-4 m-6 flex items-center justify-center relative`}
      onMouseEnter={() => setHoveredIndex(colIndex)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {value ? (
        <div className="relative p-2 w-full h-full rounded-md">
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
                onClick={() => handleImageDelete(todoId, colIndex)}
                className="p-2 mx-2"
              >
                <TrashIcon className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      ) : colIndex > 0 ? (
        <div className="relative flex items-center justify-center w-full h-full">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(todoId, colIndex, e)}
            className="absolute rounded-lg inset-0 opacity-0 cursor-pointer"
            id={`file-input-${colIndex}`}
          />
          <div className="flex rounded-lg items-center justify-center w-3/4 h-1/4 border bg-slate-100">
            <PlusIcon className="w-4 h-4" />
            <span className="text-sm">Add Image</span>
          </div>
        </div>
      ) : (
        <div className="gap-1 flex items-center justify-center rounded-md w-3/4 h-1/4 border">
          <div className="text-xs border-gray-300 rounded-md">
            Product Collection
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
