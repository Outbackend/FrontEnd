import React from "react";

const Project = ({ project }) => {
  return (
    <div className="p-8">
      <div className="flex flex-row space-x-8">
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4 text-center">원해요!</h3>
          {project.recrute.map((elem) => (
            <ul key={elem.type} className="list-none flex items-center mb-2">
              <li className="mb-2 left ">
                <div className="px-4 py-2 bg-gray-200 rounded-full">
                  {elem.type}
                </div>
              </li>
              <li className="px-4 py-2 bg-gray-100 rounded-full">
                {elem.wanted}명
              </li>
            </ul>
          ))}
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4 text-center">이걸 써요!</h3>
          <ul className="list-none flex flex-col items-center space-y-4">
            {project.skill_tag.map((skill) => (
              <li
                key={skill}
                className="px-4 py-2 flex bg-gray-100 rounded-full"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4 text-center">
            지금 프로젝트는...
          </h3>
          {project.recrute.map((elem) => (
            <ul key={elem.type} className="list-none flex items-center mb-2">
              <li className="mb-2">
                <div className="px-4 py-2 bg-gray-200 rounded-full">
                  {elem.type}
                </div>
              </li>
              <li>
                <div className="px-4 py-2 bg-gray-100 rounded-full">
                  {elem.current}명
                </div>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
