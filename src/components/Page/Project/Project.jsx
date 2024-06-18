import React from "react";
import Recruit from "./Recruit";
import MDEditor from "@uiw/react-md-editor";
import ImageSlider from "./ImageSlider";

const Project = ({ project }) => {
  return (
    <div className="p-8">
      <div className="flex flex-row space-x-8">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4 text-center">분야</h2>
          <div className="w-full list-none text-center items-center space-y-4">
            <div className="inline-flex items-center bg-blue-100 font-semibold text-black px-4 py-2 rounded-full">
              {project.field}
            </div>
          </div>
        </div>
        <div className="border-l border-gray-300 mx-4"></div>{" "}
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4 text-center">사용 스택</h3>
          <div className="w-full list-none text-center items-center space-y-4">
            {project.skillTagList.map((skill) => (
              <div
                key={skill}
                className="inline-flex items-center font-semibold bg-blue-100 text-black px-4 py-2 rounded-full mr-2 mb-2"
              >
                {skill}
              </div>
            ))}
          </div>
          {/*<hr className="my-4" />*/}
        </div>
        <div className="border-l border-gray-300 mx-4"></div>{" "}
        {/* Vertical line */}
        {/*}
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4 text-center">모집 인원</h3>
          {project.recruit.map((elem, index) => (
            <div key={index}>
              <Recruit elem={elem.type} check={elem.wanted}></Recruit>
            </div>
          ))}
        </div>*/}
        {/* Vertical line */}
        <div className="flex-1">
          {/* <h3 className="text-2xl font-bold mb-4 text-center">현재 인원</h3>
          {project.current.map((elem, index) => (
            <div key={index}>
              <Recruit elem={elem.type} check={elem.wanted}></Recruit>
            </div>
          ))}*/}
          <h2 className="text-2xl font-bold mb-4 text-center">모집 분야</h2>
          <div className="w-full list-none text-center items-center space-y-4">
            {project.positionTagList.map((position) => (
              <div
                key={position}
                className="inline-flex items-center font-semibold bg-blue-100 text-black px-4 py-2 rounded-full mr-2 mb-2"
              >
                {position}
              </div>
            ))}
          </div>
        </div>
      </div>
      <hr className="my-8" />
      <div>
        <h2 className="text-2xl font-bold mb-4">프로젝트 설명</h2>
        <div className="flex flex-row space-x-8">
          <ImageSlider images={project.project_image} />
        </div>
        <br />
        <MDEditor.Markdown source={project.content} />
      </div>
    </div>
  );
};

export default Project;
