import React, { useState } from "react";
import AddRecruit from "./Project/AddRecruit";
import MDEditor from "@uiw/react-md-editor";
import SelectableTags from "./Project/AddTags";
import FieldSelect from "./Project/FieldSelect";
import AddImage from "./Project/AddImage";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProject = ({ project }) => {
  const [title, setTitle] = useState(project ? project.title : ""); // 제목
  const [value, setValue] = useState(project ? project.content : ""); // 설명
  const [skillTag, setSkillTag] = useState(project ? project.skillTagList : []); // 사용 스킬
  const [deadline, setDeadline] = useState(project ? project.deadline : ""); // 마감일
  const [field, setField] = useState(project ? project.field : ""); // 프로젝트 분야
  const [recruit, setRecruit] = useState(project ? project.recruit : []); // 구인 분야 및 인원
  const [current, setCurrent] = useState(project ? project.current : []); // 현재 분야 및 인원
  const [images, setImages] = useState(project ? project.project_image : []); // 프로젝트 관련 이미지
  const navigate = useNavigate();
  const isNewProject = !project;

  // 프로젝트 생성 및 수정
  const handleSave = async () => {
    const updatedProject = {
      title: title,
      content: value,
      deadline: deadline,
      skillTagList: skillTag,
      field: field,
      recruit: recruit,
      current: current,
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
    <div className="pt-5">
      <div className="mb-4 flex pb-5 items-center text-center">
        <h2 className="text-2xl w-[100px] font-bold py-2">제목</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border-b font-bold text-2xl border-gray-300 rounded focus:outline-none"
        />
        <button
          type="button"
          onClick={handleSave}
          className=" float-right w-[100px] mt-4 px-6 py-2 text-gray-500 rounded-full hover:font-bold"
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
      <div className="flex mb-6 ml-[75%] items-center text-center ">
        <h2 className="text-2xl font-bold">마감일</h2>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="p-2 rounded-lg focus:outline-none "
        />
      </div>
      <div className="flex flex-row space-x-6 p-2">
        <div className="flex-1 pl-4">
          <h2 className="text-2xl font-bold mb-4 text-center">분야</h2>
          <FieldSelect initialField={field} onFieldChange={setField} />
          <hr className="m-4" />
          <h3 className="text-2xl font-bold mb-4 text-center">사용 스택</h3>
          <SelectableTags tags={skillTag} onTagsChange={setSkillTag} />
        </div>
        <div className="border-l border-gray-300 mx-4"></div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4 text-center">모집 인원</h3>
          <AddRecruit recruit={recruit} onRecruitChange={setRecruit} />
        </div>
        <div className="border-l border-gray-300 mx-4"></div>
        <div className="flex-1 pr-4">
          <h3 className="text-2xl font-bold mb-4 text-center">현재 인원</h3>
          <AddRecruit recruit={current} onRecruitChange={setCurrent} />
        </div>
      </div>
      <hr className="my-8" />
      <h2 className="text-2xl font-bold mb-4">프로젝트 설명</h2>
      <AddImage image={images} onImagesChange={setImages} />
      <br />
      <MDEditor value={value} onChange={setValue} />
      <div className="pb-10"></div>
    </div>
  );
};

export default EditProject;
