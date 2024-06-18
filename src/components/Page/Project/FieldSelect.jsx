import React, { useState } from "react";
import Select from "react-select";
import { Range } from "../Home/getItem";

const FieldSelect = ({ initialField = "", onFieldChange }) => {
  const [selectedField, setSelectedField] = useState(initialField);

  const handleSelectChange = (selectedOption) => {
    setSelectedField(selectedOption);
    onFieldChange(selectedOption.value);
  };

  return (
    <Select
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
