import React from "react";

import userDetailStore from "../../variables/States/UserDetailStore";

import UserDescription from "./UserInfo/UserDescription";
import UserIcon from "./UserInfo/UserIcon";
import UserProjectLog from "./UserInfo/UserProjectLog";
import UserStack from "./UserInfo/UserStack";

const UserInfo = (props) => {
    const { userInfo, fetchData, updateItem } = userDetailStore();

    return (
        <div className="pt-[100px] max-w-[1170px]">
            <UserIcon 
                name={ userInfo.name }
                note={ userInfo.note }
            />
            <UserStack />
            <UserDescription 
                description={ userInfo.description }
            />
            <UserProjectLog
                projectList={ userInfo.projectList }
            />
        </div>
    );
}

export default UserInfo;