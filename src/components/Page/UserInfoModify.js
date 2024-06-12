import React from 'react';

import UserIconModify from './UserInfoModify/UserIconModify';
import UserStackModify from './UserInfoModify/UserStackModify';
import UserDescriptionModify from './UserInfoModify/UserDescriptionModify';

const UserInfoModify = (props) => {
    return (
        <div>
            <UserIconModify />
            <UserStackModify />
            <UserDescriptionModify />
        </div>
    );
};

export default UserInfoModify;