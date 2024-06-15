import React from "react";
import Recrute from "./Recrute";

const Project = ({ project }) => {
  return (
    <div className="p-8">
      <div className="flex flex-row space-x-8">
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4 text-center">원해요!</h3>
          {project.recrute.map((elem) => (
            <Recrute elem={elem}></Recrute>
          ))}
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4 text-center">이걸 써요!</h3>
          <ul className="w-full list-none text-center items-center space-y-4">
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
            <Recrute elem={elem}></Recrute>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
