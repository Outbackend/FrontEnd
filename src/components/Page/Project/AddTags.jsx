import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";

const tags = [
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

const SearchableTags = ({ before }) => {
  const [selectedTags, setSelectedTags] = useState(before || []);
  const [errorMessage, setErrorMessage] = useState("");

  const handleTagSelect = (selectedOption) => {
    if (selectedOption) {
      setSelectedTags((prevSelected) => {
        const existingSelectedIndex = prevSelected.findIndex(
          (elem) => elem.value === selectedOption.value
        );
        if (existingSelectedIndex !== -1) {
          setErrorMessage("이미 존재하는 태그입니다");
          return [...prevSelected];
        } else {
          setErrorMessage("");
          return [...prevSelected, selectedOption];
        }
      });
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setSelectedTags((prevSelected) =>
      prevSelected.filter((tag) => tag.value !== tagToRemove.value)
    );
  };

  return (
    <div>
      <div className="mt-4 space-x-2 space-y-2">
        {selectedTags.map((tag) => (
          <span
            key={tag.value}
            className="inline-flex items-center bg-blue-100 text-black px-2 py-2 rounded-full mr-2 mb-2"
          >
            {tag.label || tag}
            <button
              className="ml-2 text-gray-600 hover:text-gray-800"
              onClick={() => handleTagRemove(tag)}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
      <CreatableSelect
        isClearable
        options={tags}
        onChange={handleTagSelect}
        placeholder="추가할 태그를 선택하세요"
        styles={{
          control: (provided) => ({
            ...provided,
            width: "full",
            border: "none",
            boxShadow: "none",
          }),
        }}
      />
      {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default SearchableTags;
