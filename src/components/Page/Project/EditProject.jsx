import React, { useState } from "react";
import AddRecruit from "./AddRecruit";
import MDEditor from "@uiw/react-md-editor";
import SelectableTags from "./AddTags";
import ImageSlider from "./ImageSlider";
import FieldSelect from "./FieldSelect";

const EditProject = ({ project, onSave }) => {
  const [value, setValue] = useState(project.body);

  return (
    <div className="p-8">
      <div className="flex flex-row space-x-8">
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4 text-center">사용 스택</h3>
          <div className="list-none text-center items-center space-y-4">
            <SelectableTags before={project.skill_tag} />
          </div>
          <hr className="my-4" />
          <h2 className="text-2xl font-bold mb-4 text-center">분야</h2>
          <FieldSelect before={project.field} />
        </div>
        <div className="border-l border-gray-300 mx-4"></div>{" "}
        {/* Vertical line */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4 text-center">모집 인원</h3>
          <AddRecruit before={project.recruit} />
        </div>
        <div className="border-l border-gray-300 mx-4"></div>{" "}
        {/* Vertical line */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4 text-center">현재 인원</h3>
          <AddRecruit before={project.current} />
        </div>
      </div>
      <hr className="my-8" />
      <h2 className="text-2xl font-bold mb-4">프로젝트 설명</h2>
      <div className="flex flex-row space-x-8">
        <ImageSlider images={project.project_image} />
      </div>
      <br />
      <MDEditor value={value} onChange={setValue} />
      <button
        type="button"
        onClick={onSave}
        className="mt-4 px-6 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-700"
      >
        저장
      </button>
    </div>
  );
};

export default EditProject;
