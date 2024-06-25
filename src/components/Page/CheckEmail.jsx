import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import userDetailStore from '../../variables/States/UserDetailStore';

import UserInput from './Login/LoginUserInput';
import LoginButton from './Login/LoginButton';

const CheckEmail = () => {
    const { fetchData, login } = userDetailStore();

    const navigation = useNavigate();
    const location = useLocation();
    const [ verifiyCode, setVerifiyCode ] = useState('');

    const handleInputChange = (e) => {
        setVerifiyCode(e.target.value);
    }

    const resendVerifyEmail = async () => {
        try {
            const response = await axios.post(
                process.env.REACT_APP_API_URL + '/user/resend',
                { email : location.state.email }
            )
            alert("이메일을 다시 전송했습니다.")
        } catch (e) {
            alert(e);
        }
    }

    const verifyProcess = async () => {
        try {
            const response = await axios.post(
                process.env.REACT_APP_API_URL + '/user/verify',
                {
                    email : location.state.email,
                    cert_number : verifiyCode
                }
            );
            alert("가입을 환영합니다!");
            fetchData(response.data['userid']);
            navigation('/');
        } catch (e) {
            alert(e);
        }
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="relative w-[400px] h-[500px] m-auto border-solid border-2 border-[#dfdfdf] rounded-md flex justify-center items-center">
                <div className="absolute top-3 w-[360px] h-[150px] flex justify-center">
                    <div className="m-auto">
                    <p className="text-3xl font-bold">이메일 인증</p>
                    </div>
                </div>
                <div
                    className="absolute bottom-0 w-[360px] h-[320px]"
                    onChange={ handleInputChange }
                >
                    <div className='w-full h-[30px] select-none'>
                        <div 
                            className='w-[200px] absolute right-0 text-right'
                            onClick={ resendVerifyEmail }
                        >
                            <a className='text-gray-500'>이메일 다시 전송하기</a>
                        </div>
                    </div>
                    <UserInput
                        type="text"
                        placeholder="이메일 인증 번호"
                        name="verifiyCode"
                        value={ verifiyCode }
                    />
                    <LoginButton
                        text="이메일 인증"
                        onClick={ verifyProcess }
                    />
                </div>
            </div>
        </div>
    );
}

export default CheckEmail;