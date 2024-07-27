import { AlertProps } from "@/interfaces";
import React, { useState } from "react";

const Alert: React.FC<AlertProps> = ({ message, type }) => {
  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 text-white rounded shadow-lg ${
        type === "success"
          ? "border border-emerald-300 bg-green-500"
          : "border border-red-500 bg-red-600"
      }`}
    >
      {message}
    </div>
  );
};

export const useAlert = () => {
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

  return { alert, showAlert };
};

export default Alert;
