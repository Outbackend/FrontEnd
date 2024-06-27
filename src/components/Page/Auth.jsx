import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SlArrowLeft } from "react-icons/sl";

import UserInput from './Login/LoginUserInput';
import LoginButton from './Login/LoginButton';

const AuthPage = () => {
    const [ authForm, setAuthForm ] = useState({
        email : "",
        password : "",
        passwordCheck : "",
        nickname : "",
    });
    const navigation = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAuthForm((authForm) => ({
            ...authForm,
            [name]: value,
        }));
    };

    const authProcess = async () => {
        const passwordRegEx = /^[A-Za-z0-9]{8,20}$/
        if (authForm.password.match(passwordRegEx) === null) {
            alert("패스워드를 양식에 맞게 입력해주세요!")
        }
        else if (authForm.password !== authForm.passwordCheck) {
            alert("비밀번호가 일치하지 않습니다!");
        }
        else {
            try {
                await axios.post(
                    process.env.REACT_APP_API_URL + '/user/auth',
                    {
                        email : authForm.email,
                        password : authForm.password,
                        nickname : authForm.nickname,
                        note : "",
                        description : "",
                        range : [],
                        position : [],
                        stack : [],
                        projectLog : []
                    }
                )
                navigation('/CheckEmail', { state : { email : authForm.email } });
            } catch (e) {
                alert(e);
            }
        }
    };
    

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="relative w-[400px] h-[500px] m-auto border-solid border-2 border-[#dfdfdf] rounded-md flex justify-center items-center">
                <Link to={'/login'}>
                    <div className='absolute w-[100px] h-[40px] top-3 left-3 flex items-center z-50'>
                        <SlArrowLeft size='15' />
                        <p className='ml-2 select-none'>로그인</p>
                    </div>
                </Link>
                <div className="absolute top-3 w-[360px] h-[150px] flex justify-center">
                    <div className="m-auto">
                    <p className="text-3xl font-bold select-none">회원가입</p>
                    </div>
                </div>
                <div
                    className="absolute bottom-0 w-[360px] h-[340px]"
                    onChange={ handleInputChange }
                >
                    <UserInput
                        type="email"
                        placeholder="이메일"
                        name="email"
                        value={ authForm.email }
                    />
                    <UserInput
                        type="password"
                        placeholder="비밀번호"
                        name="password"
                        value={ authForm.password }
                    />
                    <UserInput
                        type="password"
                        placeholder="비밀번호 확인"
                        name="passwordCheck"
                        value={ authForm.passwordCheck }
                    />
                    <div>
                        <a href="{()=>false}" className='text-xs select-none text-gray-300'>비밀번호는 영문 대소문자를 혼합하여 8자 이상으로 만들어주세요.</a>
                    </div>
                    <UserInput
                        type="text"
                        placeholder="닉네임"
                        name="nickname"
                        value={ authForm.nickname }
                    />
                    <LoginButton
                        text="회원가입"
                        onClick={ authProcess }
                    />
                    <Link to={'/'}>
                        <div className="w-full text-center select-none">
                        홈으로
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;