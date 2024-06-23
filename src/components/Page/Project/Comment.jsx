import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useLoginStore from "../../../variables/States/LoginStore";

const Comment = ({ projectId, initialComments }) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [replyComment, setReplyComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  const [parentCommentId, setParentCommentId] = useState(null);
  const { user } = useLoginStore((state) => ({ user: state.user }));
  const navigate = useNavigate();

  const baseUrl = "http://47.128.234.198:5000";

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleReplyCommentChange = (e) => {
    setReplyComment(e.target.value);
  };

  const handleEditCommentChange = (e) => {
    setEditCommentText(e.target.value);
  };

  const formatDate = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleString();
  };

  // 댓글 추가
  const handleAddComment = async () => {
    if (newComment.trim() !== "") {
      const newCommentObject = {
        content: newComment,
        userId: user.id,
        projectId: projectId,
        parentId: parentCommentId,
      };

      try {
        const response = await axios.post(
          `${baseUrl}/project/${projectId}/comment`,
          newCommentObject
        );
        setComments([...comments, response.data]);
        setNewComment("");
        setParentCommentId(null);
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const handleAddReplyComment = async () => {
    if (replyComment.trim() !== "") {
      const newReplyCommentObject = {
        content: replyComment,
        userId: user.id,
        projectId: projectId,
        parentId: parentCommentId,
      };

      try {
        const response = await axios.post(
          `${baseUrl}/project/${projectId}/comment`,
          newReplyCommentObject
        );
        setComments([...comments, response.data]);
        setReplyComment("");
        setParentCommentId(null);
      } catch (error) {
        console.error("Error adding reply comment:", error);
      }
    }
  };

  const handleReplyComment = (commentId) => {
    setParentCommentId(commentId);
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment.id);
    setEditCommentText(comment.content);
  };

  // 댓글 수정
  const handleSaveEditComment = async (commentId) => {
    try {
      const updatedCommentObject = {
        content: editCommentText,
        projectId: projectId,
        parentId: comments.find((comment) => comment.id === commentId).parentId,
        userId: user.id,
      };
      await axios.put(
        `${baseUrl}/project/${projectId}/comment`,
        updatedCommentObject
      );
      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, content: editCommentText }
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
      await axios.delete(`${baseUrl}/project/${projectId}/comment`, {
        data: { commentId: commentId },
      });
      setComments(comments.filter((comment) => comment.id !== commentId));
      setEditingComment(null);
      setEditCommentText("");
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="mt-8 w-full max-w-2xl">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">댓글</h3>
      {user ? (
        <div className="mb-6">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
            placeholder="댓글을 작성해주세요."
            value={newComment}
            onChange={handleCommentChange}
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-200"
            onClick={handleAddComment}
          >
            댓글달기
          </button>
        </div>
      ) : (
        <p className="my-10 text-center text-gray-600">
          로그인 후 댓글을 작성할 수 있습니다.
        </p>
      )}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="my-10 text-center text-gray-600">
            아직 댓글이 달리지 않았습니다.
          </div>
        ) : (
          comments
            .filter((comment) => comment.parentId === null)
            .map((c) => (
              <div
                key={c.id}
                className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
              >
                <div className="flex items-center mb-2">
                  <img
                    src="/UserDefault.jpg"
                    className="w-10 h-10 rounded-full mr-3"
                    alt="User Avatar"
                  />
                  <div
                    className="text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-500 transition duration-200"
                    onClick={() => navigate(`/User/${c.userId}`)}
                  >
                    user {c.userId}
                  </div>
                </div>
                <div className="ml-13 text-gray-700">
                  {editingComment === c.id ? (
                    <div>
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
                        value={editCommentText}
                        onChange={handleEditCommentChange}
                      />
                      <div className="mt-2 space-x-2">
                        <button
                          className="px-3 py-1 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-200"
                          onClick={() => handleSaveEditComment(c.id)}
                        >
                          저장
                        </button>
                        <button
                          className="px-3 py-1 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition duration-200"
                          onClick={() => handleDeleteComment(c.id)}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-1">{c.content}</div>
                      <div className="text-xs text-gray-500">
                        {formatDate(c.datetime)}
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-2 space-x-2">
                  {user && (
                    <div className="mt-2 space-x-2">
                      {user.id === c.userId && editingComment !== c.id && (
                        <button
                          className="text-sm text-blue-500 hover:text-blue-600 transition duration-200"
                          onClick={() => handleEditComment(c)}
                        >
                          수정
                        </button>
                      )}
                      <button
                        className="text-sm text-blue-500 hover:text-blue-600 transition duration-200"
                        onClick={() => handleReplyComment(c.id)}
                      >
                        답글달기
                      </button>
                    </div>
                  )}
                </div>
                {comments
                  .filter((comment) => comment.parentId === c.id)
                  .map((reply) => (
                    <div
                      key={reply.id}
                      className="ml-8 mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg"
                    ></div>
                  ))}
              </div>
            ))
        )}
      </div>
      {user && parentCommentId && (
        <div className="mt-4 ml-8">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
            placeholder="답글을 작성해주세요."
            value={replyComment}
            onChange={handleReplyCommentChange}
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-200"
            onClick={handleAddReplyComment}
          >
            답글달기
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
