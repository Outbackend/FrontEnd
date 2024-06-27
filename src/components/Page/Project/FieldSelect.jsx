import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import rangeList from "../../../variables/RangeList";

const FieldSelect = ({ initialField = "", onFieldChange }) => {
  const [selectedField, setSelectedField] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (initialField) {
      const initialOption = Range.find(
        (option) => option.label === initialField
      );
      setSelectedField(
        initialOption || { value: initialField, label: initialField }
      );
    }
  }, [initialField]);

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
    onFieldChange(selectedOption.label);
    setErrorMessage("");
  };

  return (
    <div>
      <CreatableSelect
        value={selectedField}
        onChange={handleSelectChange}
        options={Range}
        styles={{
          control: (provided) => ({
            ...provided,
            border: "none",
            boxShadow: "none",
            width: "100%",
          }),
        }}
      />
      {errorMessage && (
        <div style={{ color: "red", marginTop: "5px" }}>{errorMessage}</div>
      )}
    </div>
  );
};

export default FieldSelect;
