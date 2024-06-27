import React, { useState } from "react";
import axios from "axios";

const EditComment = ({ comment, token, onCommentEdited, onCancelEdit }) => {
  const [editContent, setEditContent] = useState(comment.content);

  const handleEditComment = async () => {
    if (editContent.trim() === "") return;

    const editwCommentObject = {
      content: editContent,
      id: Number(comment.id),
      projectId: Number(comment.projectId),
      parentId: Number(comment.parentId),
      userId: Number(comment.userId),
    };

    try {
        await axios.patch(
        `${process.env.REACT_APP_API_URL}/project/${comment.projectId}/comment`,
        editwCommentObject,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onCommentEdited({ ...comment, content: editContent });
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  return (
    <div>
      <textarea
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
        value={editContent}
        onChange={(e) => setEditContent(e.target.value)}
      />
      <button
        className="mt-2 mr-2 text-sm text-gray-500 hover:text-gray-600 transition duration-200"
        onClick={handleEditComment}
      >
        수정완료
      </button>
      <button
        className="mt-2 text-sm text-gray-500 hover:text-gray-600 transition duration-200"
        onClick={onCancelEdit}
      >
        취소
      </button>
    </div>
  );
};

export default EditComment;
