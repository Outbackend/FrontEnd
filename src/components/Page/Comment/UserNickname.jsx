import React, { useState, useEffect } from "react";
import userDetailStore from "../../../variables/States/UserDetailStore";

const UserNickname = ({ userId }) => {
  const [nickname, setNickname] = useState(`user ${userId}`);
  const { fetchData } = userDetailStore();

  useEffect(() => {
    const loadNickname = async () => {
      try {
        const response = await fetchData(userId);
        setNickname(response);
      } catch (error) {
        console.error(`Error fetching nickname for user ${userId}:`, error);
      }
    };

    loadNickname();
  }, [userId, fetchData]);

  return <span>{nickname}</span>;
};

export default UserNickname;
