import React, { useState } from "react";
import AddRecruit from "./Project/AddRecruit";
import MDEditor from "@uiw/react-md-editor";
import SelectableTags from "./Project/AddTags";
import FieldSelect from "./Project/FieldSelect";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../Modals/Confirmation";
import StatusSelect from "./Project/StatusSelect"; // 새로운 StatusSelect 컴포넌트를 임포트
import LoginStore from "../../variables/States/LoginStore";

const EditProject = ({ project, id }) => {
  const [title, setTitle] = useState(project ? project.name : ""); // 제목
  const [value, setValue] = useState(project ? project.description : ""); // 설명
  const [skillTag, setSkillTag] = useState(project ? project.stack : []); // 사용 스킬
  const [deadline, setDeadline] = useState(project ? project.endDate : ""); // 마감일
  const [field, setField] = useState(project ? project.category : ""); // 프로젝트 분야
  const [recruit, setRecruit] = useState(project ? project.wanted : []); // 구인 분야 및 인원
  const [current, setCurrent] = useState(project ? project.inNow : []); // 현재 분야 및 인원
  const [status, setStatus] = useState(project ? project.status : "");
  const { user, token } = LoginStore();

  const navigate = useNavigate();
  const isNewProject = !project;
  const [showConfirmation, setShowConfirmation] = useState(false);

  // 프로젝트 저장
  const handleSave = async () => {
    const updatedProject = {
      name: title,
      description: value,
      endDate: deadline,
      stack: skillTag,
      category: field,
      wanted: recruit,
      inNow: current,
      status: status,
      publisher: user, //user id
    };

    try {
      if (isNewProject) {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/project/add`,
          updatedProject,
          { headers: { Authorization: `Bearer ${token}` } }
        ); // 프로젝트 생성
      } else {
        console.log(updatedProject);
        await axios.post(
          process.env.REACT_APP_API_URL + "/project/" + id,
          updatedProject,
          { headers: { Authorization: `Bearer ${token}` } }
        ); // 수정
        window.location.reload();
      }
    } catch (error) {
      console.error("프로젝트 저장 중 오류 발생:", error);
    }
  };

  // 프로젝트 삭제
  const handleDelete = async () => {
    if (!isNewProject) {
      setShowConfirmation(true);
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(process.env.REACT_APP_API_URL + "/project/" + id, {
        headers: { Authorization: `Bearer ${token}` },
      }); // 삭제
      navigate("/"); // 홈 페이지로 이동
    } catch (error) {
      console.error("프로젝트 삭제 중 오류 발생:", error);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="pt-32">
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
      <div className="flex-1 items-center justify-between mb-6">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold">모집 상태</h2>
            <StatusSelect status={status} onStatusChange={setStatus} />
          </div>
          <div className="flex items-center space-x-4 float-right">
            <h2 className="text-2xl font-bold">마감일</h2>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="p-2 rounded-lg  border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
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
      <br />
      <MDEditor value={value} onChange={setValue} />
      <div className="pb-10"></div>

      {showConfirmation && (
        <ConfirmationModal
          message="정말로 삭제하시겠습니까?"
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default EditProject;
