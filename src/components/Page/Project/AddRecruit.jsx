import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import positionList from "../../../variables/PositionList";

const AddRecruit = ({ recruit = [], onRecruitChange }) => {
  const [type, setType] = useState(null);
  const [wanted, setWanted] = useState("");
  const [recruits, setRecruits] = useState(
    recruit.map((r) => ({
      type: { value: r.type, label: r.type },
      wanted: r.wanted.toString(),
    }))
  );
  const [errorMessage, setErrorMessage] = useState("");
  const Position = positionList.map((position) => ({
    value: position,
    label: position,
  }));

  const handleAddRecruit = () => {
    if (type && wanted) {
      if (recruits.length >= 5) {
        setErrorMessage("모집 분야는 최대 5개까지 추가할 수 있습니다.");
        return;
      }

      const existingRecruit = recruits.some(
        (recruit) => recruit.type.value === type.value
      );

      if (existingRecruit) {
        setErrorMessage("이미 존재하는 포지션입니다");
        return;
      }

      const newRecruits = [...recruits, { type, wanted }];
      setRecruits(newRecruits);
      onRecruitChange(
        newRecruits.map((r) => ({ type: r.type.value, wanted: r.wanted }))
      );
      setErrorMessage("");
      setType(null);
      setWanted("");
    } else {
      setErrorMessage("모든 필드를 입력하세요.");
    }
  };

  const incrementWanted = (index) => {
    setRecruits((prevRecruits) => {
      const updatedRecruits = [...prevRecruits];
      const currentWanted = parseInt(updatedRecruits[index].wanted, 10);
      updatedRecruits[index].wanted = (currentWanted + 1).toString();
      onRecruitChange(
        updatedRecruits.map((r) => ({ type: r.type.value, wanted: r.wanted }))
      );
      return updatedRecruits;
    });
  };

  const decrementWanted = (index) => {
    setRecruits((prevRecruits) => {
      const updatedRecruits = [...prevRecruits];
      const currentWanted = parseInt(updatedRecruits[index].wanted, 10);
      if (currentWanted > 1) {
        updatedRecruits[index].wanted = (currentWanted - 1).toString();
      } else {
        if (window.confirm("삭제하시겠습니까?")) {
          updatedRecruits.splice(index, 1);
        } else {
          updatedRecruits[index].wanted = "1";
        }
      }
      onRecruitChange(
        updatedRecruits.map((r) => ({ type: r.type.value, wanted: r.wanted }))
      );
      return updatedRecruits;
    });
  };

  return (
    <div>
      <ul className="space-y-4">
        {recruits.map((recruit, index) => (
          <div
            className="mb-2 flex items-center justify-between w-full"
            key={index}
          >
            <div className="px-4 py-2 bg-blue-100 rounded-full">
              <span className="font-semibold text-gray-700">
                {recruit.type.label}
              </span>
            </div>
            <div className="px-2 py-1 bg-gray-100 rounded-full flex items-center">
              <button
                onClick={() => decrementWanted(index)}
                className="px-1 py-1 text-gray-500 hover:font-bold font-semibold rounded focus:outline-none"
              >
                -
              </button>
              <span className="text-gray-700 mx-2">{recruit.wanted}명</span>
              <button
                onClick={() => incrementWanted(index)}
                className="px-1 py-1 text-gray-500 hover:font-bold font-semibold rounded focus:outline-none"
              >
                +
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
            value={type}
            onChange={(option) => setType(option)}
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
          value={wanted}
          onChange={(e) => setWanted(e.target.value)}
          className="w-24 border-none border-gray-300 rounded focus:outline-none "
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
    </div>
  );
};

export default AddRecruit;
