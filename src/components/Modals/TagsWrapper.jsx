import React, { useState } from 'react';

const TagsWrapper = ({ toggle, name, type }) => {
    const [ isOn, toggleOn ] = useState(toggle);

    const toggleHandler = () => {
        toggleOn(!isOn);
        type(isOn, name);
    };

    return(
        <div className={`
                ${isOn ? "bg-[#7eb7ec] text-white" : "bg-white text-gray-900"}
                text-center flex items-center
                rounded-full px-5 me-2 mb-2 max-h-8
                border border-gray-300 
                font-medium text-base select-none
            `}
            onClick={ toggleHandler } 
        >
            { name }
        </div>
    );
};

export default TagsWrapper;