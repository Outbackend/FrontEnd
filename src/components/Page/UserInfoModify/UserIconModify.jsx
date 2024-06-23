import React, { useState } from 'react';

import userDetailStore from '../../../variables/States/UserDetailStore';

import UserInfoInput from './UserInfoInput';

const UserIconModify = () => {
    const { userInfo, updateItem } = userDetailStore();

    const handleInputChange = (key, e) => {
        const { value } = e.target;
        updateItem(key, value)
    }

    return(
        <div className='w-1/3 h-[530px] m-auto relative float-left'>
            <div className='w-full h-[380px] flex justify-center items-center'>
                <div className='w-[250px] h-[250px] bg-[#d9d9d9] rounded-[125px] m-auto'></div>
            </div>
            <div className='w-full h-[150px]'>
                <div className='w-3/4 h-auto text-center mx-auto'>
                    <UserInfoInput 
                        type="text"
                        placeholder={ userInfo.nickname }
                        value={ userInfo.nickname }
                        name="nickname"
                        onChange={(e) => handleInputChange('nickname', e)}
                    />
                </div>
                <div className='w-3/4 h-auto text-center mx-auto'>
                    <UserInfoInput 
                        type="text"
                        placeholder={ userInfo.note }
                        value={ userInfo.note }
                        name="note"
                        onChange={(e) => handleInputChange('note', e)}
                    />
                </div>
            </div>

        </div>
    );
};

export default UserIconModify;