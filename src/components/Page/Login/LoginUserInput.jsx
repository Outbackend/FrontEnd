import React from 'react';

const UserInput = ({ type, placeholder, value, name, onChange }) => {
    return (
      <input
        className="w-full h-[40px] my-2 border-solid border-2 border-[#dfdfdf] rounded-md"
        type={ type }
        placeholder={ placeholder }
        onChange={ onChange }
        value={ value }
        name={ name }
      />
    );
  };
  
  export default UserInput;