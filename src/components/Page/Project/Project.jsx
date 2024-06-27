import React from "react";
import Recruit from "./Recruit";
import MDEditor from "@uiw/react-md-editor";
import ImageSlider from "./ImageSlider";

const Project = ({ project }) => {
  return (
    <div className="">
      <span className="font-semibold mb-2 text-sm text-gray-400">
        최종 수정 일시 {project.modifiedDate}
      </span>
      <div className="my-6" />
      <div className="flex flex-row space-x-8">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4 text-center">분야</h2>
          <div className="w-full list-none text-center items-center space-y-4">
            <div className="inline-flex items-center bg-blue-100 font-semibold text-black px-4 py-2 rounded-full">
              {project.category}
            </div>
          </div>
          <hr className="my-4" />
          <h3 className="text-2xl font-bold mb-4 text-center">사용 스택</h3>
          <div className="w-full list-none text-center items-center space-y-4">
            {project.stack.map((skill) => (
              <div
                key={skill}
                className="inline-flex items-center font-semibold bg-blue-100 text-black px-4 py-2 rounded-full mr-2 mb-2"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
        <div className="border-l border-gray-300 mx-4"></div>{" "}
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4 text-center">모집 인원</h3>
          {project.wanted.map((elem, index) => (
            <div key={index}>
              <Recruit elem={elem.stack} personal={elem.personal}></Recruit>
            </div>
          ))}
        </div>
        <div className="border-l border-gray-300 mx-4"></div>{" "}
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4 text-center">현재 인원</h3>
          {project.inNow.map((elem, index) => (
            <div key={index}>
              <Recruit elem={elem.stack} personal={elem.personal}></Recruit>
            </div>
          ))}
        </div>
      </div>
      <hr className="my-8" />
      <div>
        <h2 className="text-2xl font-bold">프로젝트 설명</h2>
        {/* <div className="flex flex-row space-x-8">
          <ImageSlider images={project.project_image} />
        </div> */}
        <br />
        <MDEditor.Markdown source={project.description} />
      </div>
    </div>
  );
};

export default Project;
