import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import rangeList from "../../../variables/RangeList";

const FieldSelect = ({ initialField = "", onFieldChange }) => {
  const [selectedField, setSelectedField] = useState(initialField);
  const [errorMessage, setErrorMessage] = useState("");

  const Range = rangeList.map((range) => ({
    value: range,
    label: range,
  }));

  const handleSelectChange = (selectedOption) => {
    if (!selectedOption) {
      setErrorMessage("분야를 선택해주세요");
      return;
    }
    setSelectedField(selectedOption);
    onFieldChange(selectedOption.value);
    setErrorMessage("");
  };

  return (
    <CreatableSelect
      value={selectedField}
      onChange={handleSelectChange}
      options={Range}
      placeholder={initialField}
      isClearable
      styles={{
        control: (provided) => ({
          ...provided,
          border: "none",
          boxShadow: "none",
          width: "full",
        }),
      }}
    />
  );
};

export default FieldSelect;
