import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from "react-router-dom";

import userDetailStore from '../../variables/States/UserDetailStore';
import LoginStore from '../../variables/States/LoginStore';

import UserIconModify from './UserInfoModify/UserIconModify';
import UserStackModify from './UserInfoModify/UserStackModify';
import UserDescriptionModify from './UserInfoModify/UserDescriptionModify';

const UserInfoModify = () => {
    const { id } = useParams();
    const { isAuthenticated, user } = LoginStore();
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
                </div>
            )}
        </div>
    );
};

export default UserInfoModify;