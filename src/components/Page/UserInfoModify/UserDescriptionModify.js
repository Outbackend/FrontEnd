import React, { useState } from 'react';

import MarkdownEditor from '@uiw/react-markdown-editor'

const UserDescriptionModify = ( { description } ) => {
    return (
        <div className='w-full h-auto relative m-auto float-left border-t-2 border-[#dfdfdf]'>
            <div className='h-[80px] relative'>
                <div className='w-[200px] top-[22px] left-5 relative'>
                    <p className='text-2xl font-bold'>설명</p>
                </div>
            </div>
            <div className='h-[1000px] px-4 pb-8'>
                <MarkdownEditor
                    value={ description }
                />
            </div>
        </div>
    );
};

export default UserDescriptionModify;