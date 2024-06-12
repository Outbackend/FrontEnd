import React from 'react';

const StackWrapper = ({ name }) => {
    return(
        <div className='text-gray-900 bg-white border border-gray-300 font-medium rounded-full text-base px-5 me-2 mb-2 max-h-8 dark:bg-gray-800 dark:text-white dark:border-gray-600'>
            { name }
        </div>
    );
}

export default StackWrapper;