import React, { useState } from "react";
import Select from "react-select";
import { Range } from "../Home/getItem";

const FieldSelect = ({ before }) => {
  const [selectedField, setSelectedField] = useState(before);

  const handleSelectChange = (selectedOption) => {
    setSelectedField(selectedOption);
  };

  return (
    <Select
      value={selectedField}
      onChange={handleSelectChange}
      options={Range}
      placeholder={before}
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
