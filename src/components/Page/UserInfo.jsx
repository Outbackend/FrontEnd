import React from "react";

import UserDescription from "./UserInfo/UserDescription";
import UserIcon from "./UserInfo/UserIcon";
import UserProjectLog from "./UserInfo/UserProjectLog";
import UserStack from "./UserInfo/UserStack";

const UserInfo = (props) => {
    const projectList = [
        {
            name: "프로젝트 이름",
            description:"저는 현재 리액트에서 \`react-markdown\`를 이용하여 **마크다운**을 랜더링하고 있습니다.\n",
            status: "진행중"
        },
        {
            name: "프로젝트 이름",
            description:"저는 현재 리액트에서 \`react-markdown\`를 이용하여 **마크다운**을 랜더링하고 있습니다.\n",
            status: "진행중"
        },
        {
            name: "프로젝트 이름",
            description:"저는 현재 리액트에서 \`react-markdown\`를 이용하여 **마크다운**을 랜더링하고 있습니다.\n",
            status: "진행중"
        },
    ]
    return (
        <div>
            <UserIcon 
                name="닉네임"
                note="소개글입니다."
            />
            <UserStack />
            <UserDescription 
                description="저는 현재 리액트에서 \`react-markdown\`를 이용하여 **마크다운**을 랜더링하고 있습니다.\n"
            />
            <UserProjectLog
                projectList={ projectList }
            />
        </div>
    );
}

export default UserInfo;