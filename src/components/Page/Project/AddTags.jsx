import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";

const Tags = [
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

const SearchableTags = ({ tags = [], onTagsChange }) => {
  const [selectedTags, setSelectedTags] = useState(tags);
  const [errorMessage, setErrorMessage] = useState("");

  const handleTagSelect = (selectedOption) => {
    if (
      selectedOption &&
      !selectedTags.some((tag) => tag === selectedOption.value)
    ) {
      const updatedTags = [...selectedTags, selectedOption.value];
      setSelectedTags(updatedTags);
      onTagsChange(updatedTags);
      setErrorMessage("");
    } else {
      setErrorMessage("이미 존재하는 태그입니다");
    }
  };

  const handleTagRemove = (tagToRemove) => {
    const updatedTags = selectedTags.filter((tag) => tag !== tagToRemove);
    setSelectedTags(updatedTags);
    onTagsChange(updatedTags);
  };

  return (
    <div>
      <div className="flex-1 mt-4 space-x-2 space-y-2 overflow-auto max-h-[220px]">
        {selectedTags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center font-semibold bg-blue-100 text-black px-4 py-2 rounded-full mr-2 mb-2"
          >
            {tag}
            <button
              className="ml-2 text-gray-600 hover:text-gray-800"
              onClick={() => handleTagRemove(tag)}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
      <div className="mt-4"></div>
      <CreatableSelect
        isClearable
        options={Tags}
        onChange={handleTagSelect}
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
