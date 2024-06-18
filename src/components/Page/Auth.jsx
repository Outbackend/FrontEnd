import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { SlArrowLeft } from "react-icons/sl";

import UserInput from './Login/LoginUserInput';
import LoginButton from './Login/LoginButton';

const AuthPage = () => {
    const [ authForm, setAuthForm ] = useState({
        email : "",
        certnumber : "",
        password : "",
        passwordCheck : ""
    });

    const [ emailFlag, setEmailFlag ] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAuthForm((authForm) => ({
            ...authForm,
            [name]: value,
        }));
    };

    const checkEmail = () => {
        alert("인증번호를 전송했습니다.");
    };

    const checkCertnumber = () => {
        alert("인증 완료");
        setEmailFlag(true);
    };

    const authProcess = () => {
        if (!emailFlag) {
            alert("이메일 인증이 완료되지 않았습니다.");
            return;
        }
        else if (authForm.password !== authForm.passwordCheck) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        alert("완료");
    };
    

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="relative w-[400px] h-[500px] m-auto border-solid border-2 border-[#dfdfdf] rounded-md flex justify-center items-center">
                <Link to={'/login'}>
                    <div className='absolute w-[100px] h-[40px] top-3 left-3 flex items-center z-50'>
                        <SlArrowLeft size='15' />
                        <p className='ml-2'>로그인</p>
                    </div>
                </Link>
                <div className="absolute top-3 w-[360px] h-[150px] flex justify-center">
                    <div className="m-auto">
                    <p className="text-3xl font-bold">회원가입</p>
                    </div>
                </div>
                <div
                    className="absolute bottom-0 w-[360px] h-[320px]"
                    onChange={ handleInputChange }
                >
                    <div className='w-full h-[96px] my-4'>
                        <input
                            type='text'
                            className='w-[280px] h-[40px] my-2 border-solid border-2 border-[#dfdfdf] rounded-md'
                            placeholder='이메일'
                            name='email'
                            value={ authForm.email }
                        />
                        <button
                            className='float-right w-[70px] h-[40px] my-2 border-solid border-2 border-[#dfdfdf] rounded-md'
                            onClick={ checkEmail }
                        >
                            <p className='text-xs'>인증</p>
                        </button>
                        <input
                            type='text'
                            className='w-[280px] h-[40px] my-2 border-solid border-2 border-[#dfdfdf] rounded-md'
                            placeholder='인증번호'
                            name='certnumber'
                            value={ authForm.certnumber }
                        />
                        <button
                            className='float-right w-[70px] h-[40px] my-2 border-solid border-2 border-[#dfdfdf] rounded-md'
                            onClick={ checkCertnumber }
                        >
                            <p className='text-xs'>확인</p>
                        </button>
                    </div>
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
                    <LoginButton
                        text="회원가입"
                        onClick={ authProcess }
                    />
                    <Link to={'/'}>
                        <div className="w-full text-center">
                        홈으로
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;