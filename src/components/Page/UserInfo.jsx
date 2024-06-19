import React, { useEffect } from "react";

import userDetailStore from "../../variables/States/UserDetailStore";

import UserDescription from "./UserInfo/UserDescription";
import UserIcon from "./UserInfo/UserIcon";
import UserProjectLog from "./UserInfo/UserProjectLog";
import UserStack from "./UserInfo/UserStack";

const UserInfo = (props) => {
    const { userInfo, fetchData, loading, error} = userDetailStore();

    return (
        <div className="pt-[100px] w-[1170px]">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {userInfo && (
                <div>
                    <UserIcon 
                        name={ userInfo.nickName }
                        note={ userInfo.intro }
                    />
                    <UserStack />
                    <UserDescription 
                        description={ userInfo.about }
                    />
                    <UserProjectLog
                        projectList={ userInfo.projectList }
                    />
                </div>
            )}
            
        </div>
    );
}

export default UserInfo;