import React, { useState } from "react";
import AddRecruit from "./AddRecruit";
import MDEditor from "@uiw/react-md-editor";
import SelectableTags from "./AddTags";
import FieldSelect from "./FieldSelect";
import AddImage from "./AddImage";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProject = ({ project }) => {
  const [title, setTitle] = useState(project ? project.title : "");
  const [value, setValue] = useState(project ? project.content : "");
  const [skillTag, setSkillTag] = useState(project ? project.skillTagList : []);
  const [positionTag, setPositionTag] = useState(
    project ? project.positionTagList : []
  );
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

  const handleSave = async () => {
    const updatedProject = {
      title: title,
      content: value,
      skillTagList: skillTag,
      positionTagList: positionTag,
      field: field,
      recruit: recruit,
      current: current,
      project_image: images,
    };

    try {
      navigate(`/project`);
      if (isNewProject) {
        await axios.post("/api/projects", updatedProject);
      } else {
        await axios.put(`/api/projects/${project.project_id}`, updatedProject);
      }
      navigate(`/projects/${project.project_id}`);
    } catch (error) {
      console.error("프로젝트 저장 중 오류 발생:", error);
    }
  };

  return (
    <div className="">
      <div className="mb-4 flex pb-10 ">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border-b font-bold text-3xl border-gray-300 rounded focus:outline-none"
        />
        <button
          type="button"
          onClick={handleSave}
          className="float-right w-[100px] mt-4 px-6 py-2 text-gray-500 rounded-full hover:font-bold"
        >
          저장
        </button>
      </div>

      <div className="flex flex-row space-x-6">
        <div className="flex-1 ">
          <h3 className="text-2xl font-bold mb-4 text-center">사용 스택</h3>

          <SelectableTags
            tags={skillTag}
            onTagsChange={setSkillTag}
            option={skillTags}
          />
          {/* <hr className="my-4" /> */}
          {/* <h2 className="text-2xl font-bold mb-4 text-center">분야</h2>
          <FieldSelect initialField={field} onFieldChange={setField} /> */}
        </div>
        <div className="border-l border-gray-300 mx-4"></div>
        <div className="flex-1">
          {/* <h3 className="text-2xl font-bold mb-4 text-center">모집 인원</h3>
          <AddRecruit recruit={recruit} onRecruitChange={setRecruit} /> */}
          <h3 className="text-2xl font-bold mb-4 text-center">모집 분야</h3>
          <SelectableTags
            tags={positionTag}
            onTagsChange={setPositionTag}
            option={positionTags}
          />
        </div>
        <div className="border-l border-gray-300 mx-4"></div>
        <div className="flex-1">
          {/* <h3 className="text-2xl font-bold mb-4 text-center">현재 인원</h3>
          <AddRecruit recruit={current} onRecruitChange={setCurrent} /> */}
          <h2 className="text-2xl font-bold mb-4 text-center">분야</h2>
          <FieldSelect initialField={field} onFieldChange={setField} />
        </div>
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
