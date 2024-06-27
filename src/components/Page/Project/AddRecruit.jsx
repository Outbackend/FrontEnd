import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import positionList from "../../../variables/PositionList";
import ConfirmModal from "../../Modals/Confirmation";

const AddRecruit = ({ recruit = [], onRecruitChange }) => {
  const [stack, setStack] = useState(null);
  const [personal, setPersonal] = useState(0);

  // recruit 배열 초기화
  const [recruits, setRecruits] = useState(
    recruit.map((r) => ({
      stack: { value: r.stack, label: r.stack },
      personal: r.personal,
    }))
  );

  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const Position = positionList.map((position) => ({
    value: position,
    label: position,
  }));

  const handleAddRecruit = () => {
    if (stack && personal) {
      if (recruits.length >= 5) {
        setErrorMessage("모집 분야는 최대 5개까지 추가할 수 있습니다.");
        return;
      }

      const existingRecruit = recruits.some(
        (recruit) => recruit.stack.value === stack.value
      );

      if (existingRecruit) {
        setErrorMessage("이미 존재하는 포지션입니다");
        return;
      }

      const newRecruits = [...recruits, { stack, personal }];
      setRecruits(newRecruits);
      onRecruitChange(
        newRecruits.map((r) => ({ stack: r.stack.value, personal: r.personal }))
      );
      setErrorMessage("");
      setStack(null);
      setPersonal(0);
    } else {
      setErrorMessage("모든 필드를 입력하세요.");
    }
  };

  const openConfirmModal = (index) => {
    setDeleteIndex(index);
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    console.log(showConfirmModal);
  };

  const deleteRecruit = () => {
    const updatedRecruits = [...recruits];
    updatedRecruits.splice(deleteIndex, 1);
    setRecruits(updatedRecruits);
    onRecruitChange(
      updatedRecruits.map((r) => ({
        stack: r.stack.value,
        personal: r.personal,
      }))
    );
    setShowConfirmModal(false);
  };

  const incrementWanted = (index) => {
    setRecruits((prevRecruits) => {
      const updatedRecruits = [...prevRecruits];
      const currentWanted = updatedRecruits[index].personal;
      updatedRecruits[index].personal = currentWanted + 1;
      onRecruitChange(
        updatedRecruits.map((r) => ({
          stack: r.stack.value,
          personal: r.personal,
        }))
      );
      return updatedRecruits;
    });
  };

  const decrementWanted = (index) => {
    if (recruits[index].personal > 1) {
      setRecruits((prevRecruits) => {
        const updatedRecruits = [...prevRecruits];
        updatedRecruits[index].personal -= 1;
        onRecruitChange(
          updatedRecruits.map((r) => ({
            stack: r.stack.value,
            personal: r.personal,
          }))
        );
        return updatedRecruits;
      });
    }
  };

  return (
    <div>
      <ul className="space-y-4">
        {recruits.map((recruit, index) => (
          <div className="mb-2 flex items-center justify-between" key={index}>
            <div className="px-4 py-2 bg-blue-100 rounded-full">
              <span className="font-semibold text-gray-700">
                {recruit.stack.label}
              </span>
            </div>
            <div className=" flex items-center">
              <div className="bg-gray-100 rounded-full px-2 py-1">
                <button
                  onClick={() => decrementWanted(index)}
                  className="px-1 py-1 text-gray-500 hover:font-bold font-semibold rounded focus:outline-none"
                >
                  -
                </button>
                <span className="text-gray-700 mx-2">{recruit.personal}명</span>
                <button
                  onClick={() => incrementWanted(index)}
                  className="px-1 py-1 text-gray-500 hover:font-bold font-semibold rounded focus:outline-none"
                >
                  +
                </button>
              </div>
              <button
                className="text-red-500 pl-2"
                onClick={() => openConfirmModal(index)}
              >
                x
              </button>
            </div>
          </div>
        ))}
      </ul>
      <div className="flex items-center mt-6 space-x-4">
        <div className="flex-grow">
          <CreatableSelect
            className="flex-grow"
            isClearable
            options={Position}
            value={stack}
            onChange={(option) => setStack(option)}
            styles={{
              control: (provided) => ({
                ...provided,
                border: "none",
                boxShadow: "none",
                width: "full",
              }),
            }}
          />
        </div>
        <select
          value={personal}
          onChange={(e) => setPersonal(parseInt(e.target.value))}
          className="w-24 border-none border-gray-300 rounded focus:outline-none"
        >
          <option className="text-gray-400" value="">
            인원
          </option>
          {Array.from({ length: 4 }, (_, i) => (
            <option className="hover:bg-blue-100" key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
      {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
      <button
        onClick={handleAddRecruit}
        className="float-right mt-4 px-6 py-2 text-gray-500 bg-blue-100 rounded-full hover:bg-blue-200 hover:font-bold"
      >
        추가하기
      </button>

      {showConfirmModal && (
        <ConfirmModal
          title="삭제 확인"
          message={`${recruits[deleteIndex].stack.label}을 삭제하시겠습니까?`}
          onCancel={closeConfirmModal}
          onConfirm={deleteRecruit}
        />
      )}
    </div>
  );
};

export default AddRecruit;
