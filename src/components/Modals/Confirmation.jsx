import React from "react";

const ConfirmationModal = ({ message, onCancel, onConfirm }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-8 rounded shadow-lg max-w-md">
        <p className="text-lg text-gray-800 mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
