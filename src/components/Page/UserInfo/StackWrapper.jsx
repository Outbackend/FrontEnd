import React from 'react';

const StackWrapper = ({ name }) => {
    return(
        <div className='
            text-center flex items-center
            rounded-full px-5 me-2 mb-2 max-h-8
            border border-gray-300 
            font-medium text-base select-none
            text-gray-900 dark:text-white
            bg-white dark:bg-gray-800 dark:border-gray-600'
        >
            { name }
        </div>
    );
}

export default StackWrapper;