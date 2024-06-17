import React, { useState } from "react";

import { SlArrowRight } from "react-icons/sl";

import UserInput from "./Login/LoginUserInput";
import LoginButton from "./Login/LoginButton";
import { Link } from "react-router-dom";

const LoginPage = (props) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((userInfo) => ({
      ...userInfo,
      [name]: value,
    }));
  };

  const loginProgcess = () => {
    let email = userInfo.email;
    let password = userInfo.password;
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="relative w-[400px] h-[500px] m-auto border-solid border-2 border-[#dfdfdf] rounded-md flex justify-center items-center">
        <Link to={'/auth'}>
            <div className='absolute w-[100px] h-[40px] top-3 right-0 flex items-center z-50'>
                <p className='mr-2'>회원가입</p>
                <SlArrowRight size='15' />
            </div>
        </Link>
        <div className="absolute top-3 w-[360px] h-[280px] flex justify-center">
          <div className="m-auto">
            <p className="text-3xl font-bold">로그인 하기</p>
          </div>
        </div>
        <div
          className="absolute bottom-0 w-[360px] h-[180px]"
          onChange={ handleInputChange }
        >
          <UserInput
            type="text"
            placeholder="이메일"
            value={ userInfo.email }
            name="email"
          />
          <UserInput
            type="password"
            placeholder="비밀번호"
            value={ userInfo.password }
            name="password"
          />
          <LoginButton text="로그인" onClick={ loginProgcess } />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
