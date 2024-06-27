import React, { useState, useEffect } from "react";
import axios from "axios";

const AddComment = ({ projectId, user, token, onCommentAdded }) => {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    const newCommentObject = {
      content: newComment,
      projectId: Number(projectId),
      parentId: Number(projectId),
      userId: user,
      datetime: "2030-12-31 23:59:59",
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/project/${projectId}/comment`,
        newCommentObject,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onCommentAdded(newCommentObject);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="mb-6">
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
        placeholder="댓글을 작성해주세요."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-200 text-gray-600 font-semibold rounded-lg hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-200"
        onClick={handleAddComment}
      >
        댓글달기
      </button>
    </div>
  );
};

export default AddComment;
