import React from 'react';

const ModifyButton = ( { placeholder, onclick } ) => {
    return(
        <div>
            <button type="button" 
                className="w-[100px] h-[45px] py-2.5 px-5 me-2 mb-2 text-xl font-bold text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 
                 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={ onclick }
            >
                { placeholder }
            </button>
        </div>
    );
};

export default ModifyButton;