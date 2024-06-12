import React, { useState } from 'react';

import UserInput from './Login/LoginUserInput';
import LoginButton from './Login/LoginButton';

const LoginPage = (props) => {
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = event => {
    const { name, value } = event.target;
        setUserInfo(userInfo => ({
            ...userInfo,
            [name]: value,
        }));
    };

    const loginProgcess = () => {
        let email = userInfo.email;
        let password = userInfo.password;
    }

    return(
        <div className='h-screen flex justify-center items-center'>
            <div className="relative w-[400px] h-[500px] m-auto border-solid border-2 border-[#dfdfdf] rounded-md flex justify-center items-center">
                <div className='absolute top-3 w-[360px] h-[280px] flex justify-center'>
                    <div className='m-auto'>
                        <p className='text-3xl font-bold'>로그인 하기</p>
                    </div>
                </div>
                <div className="absolute bottom-0 w-[360px] h-[200px]" onChange={handleInputChange}>
                    <UserInput
                        type="text"
                        placeholder="이메일"
                        value={userInfo.email}
                        name="email"
                    />
                    <UserInput
                        type="password"
                        placeholder="비밀번호"
                        value={userInfo.password}
                        name="password"
                    />
                    <LoginButton
                        text="로그인"
                        onClick={loginProgcess}
                    />
                    <div className="flex justify-center">
                        <button className="">
                            회원 가입
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;