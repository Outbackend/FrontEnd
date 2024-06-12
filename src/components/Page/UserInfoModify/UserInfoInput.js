import React from 'react';

const UserInfoInput = ({ type, placeholder, value, name, onChange }) => {
    return(
        <input
            className="w-full h-[40px] my-2 border-solid border-b-2 border-[#dfdfdf]"
            type={ type }
            placeholder={ placeholder }
            onChange={ onChange }
            value={ value }
            name={ name }
        />
    );
};

export default UserInfoInput;