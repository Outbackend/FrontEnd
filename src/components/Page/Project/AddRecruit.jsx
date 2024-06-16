import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { Position } from "../Home/getItem";

const AddRecruit = ({ before }) => {
  const [type, setType] = useState("");
  const [wanted, setWanted] = useState("");
  const [recruits, setRecruits] = useState(before);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddRecruit = () => {
    if (type && wanted) {
      setRecruits((prevRecruits) => {
        const existingRecruitIndex = prevRecruits.findIndex(
          (recruit) => recruit.type.value === type.value
        );
        const existingRecruitIndex2 = prevRecruits.findIndex(
          (recruit) => recruit.type === type.value
        );
        if (existingRecruitIndex !== -1 || existingRecruitIndex2 !== -1) {
          setErrorMessage("이미 존재하는 포지션입니다");
          return [...prevRecruits];
        } else {
          setErrorMessage("");
          return [...prevRecruits, { type, wanted }];
        }
      });
      setType(""); // Resetting the select input
      setWanted(""); // Resetting the number input
    } else {
      setErrorMessage("모든 필드를 입력하세요.");
    }
  };

  const incrementWanted = (index) => {
    setRecruits((prevRecruits) => {
      const updatedRecruits = [...prevRecruits];
      const currentWanted = parseInt(updatedRecruits[index].wanted, 10);
      updatedRecruits[index].wanted = (currentWanted + 1).toString();
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
      return updatedRecruits;
    });
  };

  return (
    <div className="">
      <ul className="space-y-4">
        {recruits.map((recruit, index) => (
          <table
            className="mb-2 list-none items-center relative w-full"
            key={index}
          >
            <tl className="px-4 py-2 bg-blue-100 rounded-full float-left">
              <span className="font-medium text-gray-700">
                {recruit.type?.label || recruit.type}
              </span>
            </tl>
            <tl className="px-2 py-1 bg-gray-100 rounded-full float-right">
              <button
                onClick={() => decrementWanted(index)}
                className="px-1 py-1 text-gray-500 hover:font-bold font-semibold rounded focus:outline-none"
              >
                -
              </button>
              <span className="font-medium text-gray-700">
                {recruit.wanted}명
              </span>
              <button
                onClick={() => incrementWanted(index)}
                className="px-1 py-1 text-gray-500 hover:font-bold font-semibold rounded focus:outline-none"
              >
                +
              </button>
            </tl>
          </table>
        ))}
      </ul>
      <div className="flex items-center mt-6 space-x-4">
        <div className="flex-grow">
          <CreatableSelect
            className="flex-grow"
            isClearable
            options={Position}
            value={type}
            onChange={setType}
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
          <option className="text-gray-400">인원</option>
          {Array.from({ length: 4 }, (_, i) => (
            <option className="hover:bg-blue-100 " key={i + 1} value={i + 1}>
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
