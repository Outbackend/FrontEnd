import React from "react";

const Project = ({ project }) => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">원해요!</h3>
        {project.recrute.map((elem) => (
          <ul key={elem.type} className="list-none flex items-center mb-2">
            <li className="mr-4">
              <div className="px-4 py-2 bg-gray-200 rounded-full">
                {elem.type}
              </div>
            </li>
            <li>
              <div className="px-4 py-2 bg-gray-100 rounded-full">
                {elem.wanted}명
              </div>
            </li>
          </ul>
        ))}
      </div>
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">이걸 써요!</h3>
        <ul className="list-none flex items-center space-x-4">
          {project.skill_tag.map((skill) => (
            <li key={skill} className="px-4 py-2 bg-gray-100 rounded-full">
              {skill}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-4">지금 프로젝트는...</h3>
        {project.recrute.map((elem) => (
          <ul key={elem.type} className="list-none flex items-center mb-2">
            <li className="mr-4">
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
  );
};

export default Project;
