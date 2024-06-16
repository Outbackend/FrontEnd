import React from "react";

const Recruit = ({ elem, check }) => {
  return (
    <div>
      <table className="mb-2 list-none items-center relative w-full">
        <tl className="px-4 py-2 bg-blue-100 font-semibold rounded-full float-left">
          {elem}
        </tl>
        <tl className="px-4 py-2 bg-gray-100 rounded-full float-right">
          {check}명
        </tl>
      </table>
    </div>
  );
};

export default Recruit;
