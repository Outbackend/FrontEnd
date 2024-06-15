import React from "react";

const Recrute = ({ elem }) => {
  return (
    <div>
      {/* <ul key={elem.type} className="list-none flex items-center mb-2"> */}
      <table className="mb-2 list-none items-center relative w-full">
        <tl className="px-4 py-2 bg-gray-200 rounded-full float-left">
          {elem.type}
        </tl>
        <tl className="px-4 py-2 bg-gray-100 rounded-full float-right">
          {elem.current}명
        </tl>
      </table>
      {/* </ul> */}
    </div>
  );
};

export default Recrute;
