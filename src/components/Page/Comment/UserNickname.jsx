import React, { useState, useEffect } from "react";
import userDetailStore from "../../../variables/States/UserDetailStore";

const UserNickname = ({ userId }) => {
  const [nickname, setNickname] = useState(`user ${userId}`);
  const { fetchData } = userDetailStore(); // fetchData만 가져옴

  useEffect(() => {
    const loadNickname = async () => {
      try {
        const response = await fetchData(userId); // fetchData 호출 시 userId 전달
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
