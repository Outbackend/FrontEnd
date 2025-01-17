import React, { useState } from "react";
import axios from "axios";

const ReplyComment = ({ parentId, projectId, user, token, onReplyAdded }) => {
  const [replyContent, setReplyContent] = useState("");

  const handleAddReplyComment = async () => {
    if (replyContent.trim() === "") return;

    const newReplyCommentObject = {
      content: replyContent,
      projectId: Number(projectId),
      parentId: Number(parentId),
      userId: user,
      datetime: "2030-12-31 23:59:59",
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/project/${projectId}/comment`,
        newReplyCommentObject,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onReplyAdded(newReplyCommentObject);
      setReplyContent("");
    } catch (error) {
      console.error("Error adding reply comment:", error);
    }
  };

  return (
    <div className="mt-4 ml-8">
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
        placeholder="답글을 작성해주세요."
        value={replyContent}
        onChange={(e) => setReplyContent(e.target.value)}
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-200 text-gray-700 font-semibold rounded-lg hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-200"
        onClick={handleAddReplyComment}
      >
        답글달기
      </button>
    </div>
  );
};

export default ReplyComment;
