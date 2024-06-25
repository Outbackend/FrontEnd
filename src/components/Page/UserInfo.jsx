import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

import userDetailStore from "../../variables/States/UserDetailStore";

import UserDescription from "./UserInfo/UserDescription";
import UserIcon from "./UserInfo/UserIcon";
import UserProjectLog from "./UserInfo/UserProjectLog";
import UserStack from "./UserInfo/UserStack";

const UserInfo = (props) => {
    const { id } = useParams();
    const { userInfo, fetchData, loading, error } = userDetailStore();
    const [ isInitialRender, setIsInitialRender ] = useState(true);

    useEffect(() => {
        if (isInitialRender) {
            setIsInitialRender(false);
            fetchData(id);
        }
    }, [isInitialRender]);

    return (
        <div className="pt-[100px] w-[1170px]">
            { loading && <p className="flex items-center justify-center">Loading...</p> }
            { error && <p className="flex items-center justify-center">Error: {error}</p> }
            { !loading && userInfo && (
                <div>
                    <UserIcon 
                        name={ userInfo.nickname }
                        note={ userInfo.note }
                    />
                    <UserStack 
                        link={ id }
                    />
                    <UserDescription 
                        description={ userInfo.description }
                    />
                    <UserProjectLog
                        projectList={ userInfo.projectLog }
                    />
                </div>
            )}
            
        </div>
    );
}

export default UserInfo;