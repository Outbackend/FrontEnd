import React from "react";

import UserDescription from "./UserInfo/UserDescription";
import UserIcon from "./UserInfo/UserIcon";
import UserProjectLog from "./UserInfo/UserProjectLog";
import UserStack from "./UserInfo/UserStack";

const UserInfo = (props) => {
    return (
        <div>
            <UserIcon />
            <UserStack />
            <UserDescription />
            <UserProjectLog />
        </div>
    );
}

export default UserInfo;