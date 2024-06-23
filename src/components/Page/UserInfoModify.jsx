import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import userDetailStore from '../../variables/States/UserDetailStore';

import UserIconModify from './UserInfoModify/UserIconModify';
import UserStackModify from './UserInfoModify/UserStackModify';
import UserDescriptionModify from './UserInfoModify/UserDescriptionModify';

const UserInfoModify = () => {
    const { id } = useParams();
    const { userInfo, fetchData, loading, error } = userDetailStore();
    const [ isInitialRender, setIsInitialRender ] = useState(true);

    useEffect(() => {
        if (isInitialRender) {
            setIsInitialRender(false);
            fetchData(id)
        }
    }, [isInitialRender]);
    
    return (
        <div className='pt-[100px] w-[1170px]'>
            { loading && <p className="flex items-center justify-center">Loading...</p> }
            { error && <p className="flex items-center justify-center">Error: {error}</p> }
            { !loading && userInfo && (
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