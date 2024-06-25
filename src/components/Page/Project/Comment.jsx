import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useLoginStore from "../../../variables/States/LoginStore";
import userDetailStore from "../../../variables/States/UserDetailStore";

const Comment = ({ projectId, initialComments }) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const { user } = useLoginStore();
  const { fetchData } = userDetailStore();
  const navigate = useNavigate();
  const nicknameCache = {};

  const formatDate = (datetime) => new Date(datetime).toLocaleString();

  const fetchNickname = async (userId) => {
    if (nicknameCache[userId]) return nicknameCache[userId];
    try {
      const response = await fetchData(userId);
      const nickname = response.userInfo.nickname;
      nicknameCache[userId] = nickname;
      return nickname;
    } catch (error) {
      console.error("Error fetching user nickname:", error);
      return "Unknown";
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    const newCommentObject = {
      content: newComment,
      projectId,
      parentId: null,
      userId: user,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/project/${projectId}/comment`,
        newCommentObject
      );
      const nickname = await fetchNickname(user);
      setComments((comments) => [{ ...response.data, nickname }, ...comments]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleAddReplyComment = async (cId) => {
    if (replyContent.trim() === "") return;

    const newReplyCommentObject = {
      content: replyContent,
      projectId,
      parentId: cId,
      userId: user,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/project/${projectId}/comment`,
        newReplyCommentObject
      );
      const nickname = await fetchNickname(user);
      setComments((comments) => [{ ...response.data, nickname }, ...comments]);
      setReplyContent("");
      setActiveReplyId(null);
    } catch (error) {
      console.error("Error adding reply comment:", error);
    }
  };

  const handleDeleteComment = async (cId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/project/${projectId}/comment`,
        { data: { commentId: cId } }
      );
      setComments((comments) =>
        comments.filter(
          (comment) => comment.id !== cId && comment.parentId !== cId
        )
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  useEffect(() => {
    const loadNicknames = async () => {
      const updatedComments = await Promise.all(
        comments.map(async (comment) => ({
          ...comment,
          nickname: await fetchNickname(comment.userId),
        }))
      );
      setComments(updatedComments);
    };

    loadNicknames();
  }, [comments]);

  const renderComment = (comment) => (
    <div
      key={comment.id}
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
          onClick={() => navigate(`/userinfo/${comment.userId}`)}
        >
          {comment.nickname || `user ${comment.userId}`}
        </div>
      </div>
      <div className="ml-13 text-gray-700">
        <div className="mb-1">{comment.content}</div>
        <div className="text-xs text-gray-500">
          {formatDate(comment.datetime)}
        </div>
      </div>
      <div className="mt-2 space-x-2">
        {user && (
          <>
            <button
              className="text-sm text-blue-500 hover:text-blue-600 transition duration-200"
              onClick={() =>
                setActiveReplyId(
                  activeReplyId === comment.id ? null : comment.id
                )
              }
            >
              답글달기
            </button>
            {user === comment.userId && (
              <button
                className="text-sm text-red-500 hover:text-red-600 transition duration-200"
                onClick={() => handleDeleteComment(comment.id)}
              >
                삭제
              </button>
            )}
          </>
        )}
      </div>
      {activeReplyId === comment.id && (
        <div className="mt-4 ml-8">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
            placeholder="답글을 작성해주세요."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-200 text-gray-700 font-semibold rounded-lg hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-200"
            onClick={() => handleAddReplyComment(comment.id)}
          >
            답글달기
          </button>
        </div>
      )}
      {comments
        .filter((reply) => reply.parentId === comment.id)
        .sort((a, b) => new Date(b.datetime) - new Date(a.datetime))
        .map((reply) => (
          <div
            key={reply.id}
            className="ml-8 mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg"
          >
            <div className="flex items-center mb-2">
              <img
                src="/UserDefault.jpg"
                className="w-8 h-8 rounded-full mr-3"
                alt="User Avatar"
              />
              <div
                className="text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-500 transition duration-200"
                onClick={() => navigate(`/userinfo/${reply.userId}`)}
              >
                {reply.nickname || `user ${reply.userId}`}
              </div>
            </div>
            <div className="ml-13 text-gray-700">
              <div className="mb-1">{reply.content}</div>
              <div className="text-xs text-gray-500">
                {formatDate(reply.datetime)}
              </div>
            </div>
            {user === reply.userId && (
              <button
                className="text-sm text-red-500 hover:text-red-600 transition duration-200"
                onClick={() => handleDeleteComment(reply.id)}
              >
                삭제
              </button>
            )}
          </div>
        ))}
    </div>
  );

  return (
    <div className="mt-8 w-full">
      <h3 className="text-xl font-bold mb-6 text-gray-800">댓글</h3>
      {user ? (
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
            .sort((a, b) => new Date(b.datetime) - new Date(a.datetime))
            .map(renderComment)
        )}
      </div>
    </div>
  );
};

export default Comment;
