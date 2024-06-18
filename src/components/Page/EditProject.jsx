import React, { useState } from "react";
import AddRecruit from "./Project/AddRecruit";
import MDEditor from "@uiw/react-md-editor";
import SelectableTags from "./Project/AddTags";
import FieldSelect from "./Project/FieldSelect";
import AddImage from "./Project/AddImage";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProject = ({ project }) => {
  const [title, setTitle] = useState(project ? project.title : "");
  const [value, setValue] = useState(project ? project.content : "");
  const [skillTag, setSkillTag] = useState(project ? project.skillTagList : []);
  const [positionTag, setPositionTag] = useState(
    project ? project.positionTagList : []
  );
  const [deadline, setDeadline] = useState(project ? project.deadline : "");
  const [field, setField] = useState(project ? project.field : "");
  const [recruit, setRecruit] = useState(project ? project.recruit : []);
  const [current, setCurrent] = useState(project ? project.current : []);
  const [images, setImages] = useState(project ? project.project_image : []);
  const navigate = useNavigate();
  const isNewProject = !project;

  const skillTags = [
    { value: "javascript", label: "JavaScript" },
    { value: "html-css", label: "HTML/CSS" },
    { value: "react", label: "React" },
    { value: "java", label: "Java" },
    { value: "spring", label: "Spring" },
    { value: "nodejs", label: "Node.js" },
    { value: "vuejs", label: "Vue.js" },
    { value: "typescript", label: "TypeScript" },
    { value: "jquery", label: "jQuery" },
    // 나머지 태그들도 추가
  ];

  const positionTags = [
    { value: "Backend", label: "Backend" },
    { value: "FrontEnd", label: "FrontEnd" },
    { value: "Designer", label: "Designer" },
    { value: "DevOpsDeveloper", label: "DevOps Developer" },
  ];

  // 프로젝트 생성 및 수정
  const handleSave = async () => {
    const updatedProject = {
      title: title,
      content: value,
      deadline: deadline,
      skillTagList: skillTag,
      positionTagList: positionTag,
    };

    try {
      if (isNewProject) {
        await axios.post("/api/projects", updatedProject); // 프로젝트 생성
      } else {
        await axios.patch(
          `/api/projects/${project.project_id}`,
          updatedProject
        ); //수정
      }
      navigate(`/projects/${project.project_id}`);
    } catch (error) {
      console.error("프로젝트 저장 중 오류 발생:", error);
    }
  };

  // 프로젝트 삭제
  const handleDelete = async () => {
    if (!isNewProject) {
      try {
        await axios.delete(`/api/projects/${project.project_id}`); //삭제
        navigate("/"); // Navigate to the home page or another appropriate page
      } catch (error) {
        console.error("프로젝트 삭제 중 오류 발생:", error);
      }
    }
  };

  return (
    <div className="">
      <div className="mb-4 flex pb-5">
        <h2 className="text-3xl w-[100px] font-bold items-center text-center py-2">
          제목
        </h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border-b font-bold text-2xl border-gray-300 rounded focus:outline-none"
        />
        <button
          type="button"
          onClick={handleSave}
          className="float-right w-[100px] mt-4 px-6 py-2 text-gray-500 rounded-full hover:font-bold"
        >
          저장
        </button>
        {!isNewProject && (
          <button
            type="button"
            onClick={handleDelete}
            className="float-right w-[100px] mt-4 px-6 py-2 ml-4 text-red-500 rounded-full hover:font-bold"
          >
            삭제
          </button>
        )}
      </div>
      <div className="flex mb-6 ml-[70%]">
        <h2 className="text-2xl font-bold items-center text-center">마감일</h2>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="p-2 rounded-lg text-center items-center focus:outline-none "
        />
      </div>
      <div className="flex flex-row space-x-6">
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4 text-center">사용 스택</h3>
          <SelectableTags
            tags={skillTag}
            onTagsChange={setSkillTag}
            option={skillTags}
          />
        </div>
        <div className="border-l border-gray-300 mx-4"></div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4 text-center">모집 분야</h3>
          <SelectableTags
            tags={positionTag}
            onTagsChange={setPositionTag}
            option={positionTags}
          />
        </div>
        {/*<div className="border-l border-gray-300 mx-4"></div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4 text-center">분야</h2>
          <FieldSelect initialField={field} onFieldChange={setField} />
        </div>*/}
      </div>
      <hr className="my-8" />
      <h2 className="text-2xl font-bold mb-4">프로젝트 설명</h2>
      <AddImage image={images} onImagesChange={setImages} />
      <br />
      <MDEditor value={value} onChange={setValue} />
    </div>
  );
};

export default EditProject;
