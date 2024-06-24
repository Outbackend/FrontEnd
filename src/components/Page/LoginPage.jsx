import React, { useState } from "react";
import { SlArrowRight } from "react-icons/sl";

import LoginStore from "../../variables/States/LoginStore";

import UserInput from "./Login/LoginUserInput";
import LoginButton from "./Login/LoginButton";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = (props) => {
  const { login } = LoginStore();

  const [ loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((LoginForm) => ({
      ...LoginForm,
      [name]: value,
    }));
  };

  const loginProgcess = async () => {
    await axios.post(
      process.env.REACT_APP_API_URL + '/user/login',
      {
        email: loginForm.email,
        password: loginForm.password
      }
    )
    .then((response) => {
      login(response.data['token'], response.data['userid']);
      navigate('/');
    })
    .catch((error) => {
      alert(error.response.data['message']);
    });
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
          className="absolute bottom-0 w-[360px] h-[200px]"
          onChange={ handleInputChange }
        >
          <UserInput
            type="text"
            placeholder="이메일"
            value={ loginForm.email }
            name="email"
          />
          <UserInput
            type="password"
            placeholder="비밀번호"
            value={ loginForm.password }
            name="password"
          />
          <LoginButton text="로그인" onClick={ loginProgcess } />
          <Link to={'/'}>
            <div className="w-full text-center">
              홈으로
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
