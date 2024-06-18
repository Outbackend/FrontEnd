import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Comment = ({ projectId, initialComments, user }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const filteredComments = initialComments.filter(
      (comment) => comment.projectId === projectId
    );
    setComments(filteredComments);
  }, [initialComments, projectId]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleEditCommentChange = (e) => {
    setEditCommentText(e.target.value);
  };

  //댓글 추가
  const handleAddComment = async () => {
    if (newComment.trim() !== "") {
      const newCommentObject = {
        id: comments.length + 1,
        memberId: user.id,
        body: newComment,
        projectId: projectId,
      };

      try {
        await axios.post(
          `/api/projects/${projectId}/comments/${user.id}`,
          newCommentObject
        );
        setComments([...comments, newCommentObject]);
        setNewComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment.id);
    setEditCommentText(comment.body);
  };

  //댓글 수정
  const handleSaveEditComment = async (commentId) => {
    try {
      await axios.patch(`/api/comments/${projectId}/${user.id}`, {
        body: editCommentText,
      });
      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, body: editCommentText }
            : comment
        )
      );
      setEditingComment(null);
      setEditCommentText("");
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  // 댓글 삭제
  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/api/comments/${projectId}/${user.id}`);
      setComments(comments.filter((comment) => comment.id !== commentId));
      setEditingComment(null);
      setEditCommentText("");
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="mt-8 w-full">
      <h3 className="text-2xl font-bold mb-4">댓글</h3>
      {user ? (
        <div className="mb-4 flex">
          <textarea
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="댓글을 작성해주세요."
            value={newComment}
            onChange={handleCommentChange}
          />
          <button
            className="ml-2 w-[120px] bg-blue-100 text-gray-500 font-semibold px-1 py-0 rounded-full hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
            onClick={handleAddComment}
          >
            댓글달기
          </button>
        </div>
      ) : (
        <p className="mb-10 mt-10 text-center">
          로그인 후 댓글을 작성할 수 있습니다.
        </p>
      )}
      <div className="space-y-4 mt-4">
        {comments.length === 0 ? (
          <div className="mb-10 mt-10 text-center">
            아직 댓글이 달리지 않았습니다.
          </div>
        ) : (
          <div></div>
        )}
        {comments
          .slice()
          .reverse()
          .map((c) => (
            <div
              key={c.id}
              className="p-4 flex border rounded-lg bg-white shadow-md"
            >
              <div className="flex items-center">
                <img
                  src="/UserDefault.jpg"
                  className="w-10 h-10 rounded-full mr-4"
                  alt="User Avatar"
                />
                <div
                  className="text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-500"
                  onClick={() => navigate(`/User/${c.memberId}`)}
                >
                  user {c.memberId}
                </div>
              </div>
              <div className="ml-4 flex-auto text-gray-600">
                {editingComment === c.id ? (
                  <div>
                    <textarea
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                      value={editCommentText}
                      onChange={handleEditCommentChange}
                    />
                    <button
                      className="mt-2 w-[100px] bg-blue-100 text-gray-500 font-semibold px-1 py-0 rounded-full hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      onClick={() => handleSaveEditComment(c.id)}
                    >
                      저장
                    </button>
                    <button
                      className="mt-2 ml-2 w-[100px] bg-red-100 text-gray-500 font-semibold px-1 py-0 rounded-full hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      onClick={() => handleDeleteComment(c.id)}
                    >
                      삭제
                    </button>
                  </div>
                ) : (
                  <div>{c.body}</div>
                )}
              </div>
              {user && user.id === c.memberId && editingComment !== c.id && (
                <div className="flex ml-4">
                  <button
                    className="text-blue-500 mr-2"
                    onClick={() => handleEditComment(c)}
                  >
                    수정
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Comment;
