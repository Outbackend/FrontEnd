import React, { useState } from 'react';

import UserInfoInput from './UserInfoInput';

const UserIconModify = (props) => {
    const [ userInfo, setUserInfo ] = useState({
        name: '',
        note: '',
    });

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUserInfo(userInfo => ({
            ...userInfo,
            [name]: value
        }));
    }

    return(
        <div className='w-1/3 h-[530px] m-auto relative float-left'>
            <div className='w-full h-[380px] flex justify-center items-center'>
                <div className='w-[250px] h-[250px] bg-[#d9d9d9] rounded-[125px] m-auto'></div>
            </div>
            <div className='w-full h-[150px]'>
                <div className='w-3/4 h-auto text-center mx-auto' onChange={handleInputChange}>
                    <UserInfoInput 
                        type="text"
                        placeholder="닉네임을 입력해주세요."
                        value={ userInfo.name }
                        name="name"
                    />
                </div>
                <div className='w-3/4 h-auto text-center mx-auto'>
                    <UserInfoInput 
                        type="text"
                        placeholder="소개글을 입력해주세요."
                        value={ userInfo.note }
                        name="note"
                    />
                </div>
            </div>

        </div>
    );
};

export default UserIconModify;