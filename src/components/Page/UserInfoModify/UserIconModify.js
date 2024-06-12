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
            <div className='absolute w-[250px] h-[250px] top-[77px] left-[67px] bg-[#d9d9d9] rounded-[125px]'>
                <div></div>
            </div>
            <div className='absolute w-[250px] h-[45px] top-[380px] left-[72px] text-center' onChange={handleInputChange}>
                <UserInfoInput 
                    type="text"
                    placeholder="닉네임을 입력해주세요."
                    value={ userInfo.name }
                    name="name"
                />
            </div>
            <div className='absolute w-[250px] h-auto top-[440px] left-[72px] text-center'>
                <UserInfoInput 
                    type="text"
                    placeholder="소개글을 입력해주세요."
                    value={ userInfo.note }
                    name="note"
                />
            </div>
        </div>
    );
};

export default UserIconModify;