import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import userDetailStore from '../../variables/States/UserDetailStore';
import LoginStore from '../../variables/States/LoginStore';

import UserIconModify from './UserInfoModify/UserIconModify';
import UserStackModify from './UserInfoModify/UserStackModify';
import UserDescriptionModify from './UserInfoModify/UserDescriptionModify';

const UserInfoModify = () => {
    const { id } = useParams();
    const { isAuthenticated, user, token } = LoginStore();
    const naviation = useNavigate();
    const { userInfo, fetchData, loading, error } = userDetailStore();
    const [ isInitialRender, setIsInitialRender ] = useState(true);
    const [ isUser, setIsUser ] = useState(false);

    useEffect(() => {
        if (!isAuthenticated || id != user) {
            alert(id + ", " + user)
            alert("잘못된 접근입니다.");
            naviation('/');
        }
        else {
            setIsUser(true)
            if (isInitialRender) {
                setIsInitialRender(false);
                fetchData(id)
            }
        }
    }, [isInitialRender]);

    const withdrawHandler = async (e) => {
        e.preventDefault();
        if (window.confirm('정말 회원에서 탈퇴하시겠습니까?')) {
            try {
                await axios
                .delete (
                    `${process.env.REACT_APP_API_URL}/user/${id}`,
                    {
                        headers: { Authorization: `Bearer  ${token}` },
                    }
                )
                .then(() => {
                    localStorage.clear();
                    alert('그동안 이용해주셔서 감사합니다.');
                    naviation('/');
                })
                .catch((err) => alert(err.response));
            } catch (err) {
                alert("탈퇴에 실패했습니다.");
            }
        } else {
            return;
        }
    }
    
    return (
        <div className='pt-[100px] w-[1170px]'>
            { loading && <p className="flex items-center justify-center">Loading...</p> }
            { error && <p className="flex items-center justify-center">Error: {error}</p> }
            { !loading && userInfo && isUser && isAuthenticated && (
                <div>
                    <UserIconModify />
                    <UserStackModify 
                        link={ id }
                    />
                    <UserDescriptionModify />
                    <div className='w-full h-auto relative m-auto float-left border-t-2 border-[#dfdfdf]'>
                        <div className='mt-5'>
                            <button type="button" 
                                className="w-[100px] h-[45px] py-2.5 px-5 me-2 mb-2 text-xl font-bold text-white focus:outline-none bg-[#d63e3e] rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-[#d63e3e]"
                                onClick={ withdrawHandler }
                            >
                                탈퇴
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserInfoModify;