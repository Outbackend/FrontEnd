import React, { useState } from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor'

import userDetailStore from '../../../variables/States/UserDetailStore';

const UserDescriptionModify = () => {
    const { userInfo, updateItem } = userDetailStore();

    const handleInputChange = (value) => {
        updateItem('description', value)
    }

    return (
        <div className='w-full h-auto relative m-auto float-left border-t-2 border-[#dfdfdf]'>
            <div className='h-[80px] relative'>
                <div className='w-[200px] top-[22px] left-5 relative'>
                    <p className='text-2xl font-bold select-none'>설명</p>
                </div>
            </div>
            <div className='px-4 pb-8'>
                <MarkdownEditor
                    value={ userInfo.description }
                    onChange={ handleInputChange }
                />
            </div>
        </div>
    );
};

export default UserDescriptionModify;