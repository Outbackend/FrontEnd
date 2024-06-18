import React, { useState } from 'react';

import UserIconModify from './UserInfoModify/UserIconModify';
import UserStackModify from './UserInfoModify/UserStackModify';
import UserDescriptionModify from './UserInfoModify/UserDescriptionModify';

const UserInfoModify = (props) => {
    return (
        <div className='pt-[100px] w-[1170px]'>
            <UserIconModify />
            <UserStackModify />
            <UserDescriptionModify />
        </div>
    );
};

export default UserInfoModify;