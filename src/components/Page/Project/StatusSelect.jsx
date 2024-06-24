import React from "react";

const StatusToggle = ({ status, onStatusChange }) => {
  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      <button
        onClick={() => onStatusChange("모집중")}
        className={`px-4 py-2 text-sm font-medium rounded-l-md border ${
          status === "모집중"
            ? "bg-blue-100 text-blue-700 border-blue-300"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
        }`}
      >
        모집중
      </button>
      <button
        onClick={() => onStatusChange("모집 완료")}
        className={`px-4 py-2 text-sm font-medium rounded-r-md border-t border-b border-r ${
          status === "모집 완료"
            ? "bg-blue-100 text-blue-700 border-blue-300"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
        }`}
      >
        모집 완료
      </button>
    </div>
  );
};

export default StatusToggle;
