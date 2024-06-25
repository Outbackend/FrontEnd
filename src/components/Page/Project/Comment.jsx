import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLoginStore from "../../../variables/States/LoginStore";
import userDetailStore from "../../../variables/States/UserDetailStore";
import AddComment from "./AddComment";
import EditComment from "./EditComment";
import ReplyComment from "./ReplyComment";
import axios from "axios";

const Comment = ({ projectId, initialComments }) => {
  const [comments, setComments] = useState(initialComments);
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const { user, token } = useLoginStore();
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

  const handleCommentAdded = async (newComment) => {
    const nickname = await fetchNickname(user);
    setComments((prevComments) => [
      { ...newComment, nickname },
      ...prevComments,
    ]);
  };

  const handleReplyAdded = async (newReply) => {
    const nickname = await fetchNickname(user);
    setComments((prevComments) => [{ ...newReply, nickname }, ...prevComments]);
    setActiveReplyId(null);
  };

  const handleCommentEdited = (editedComment) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === editedComment.id ? editedComment : comment
      )
    );
    setEditingCommentId(null);
  };

  const handleDeleteComment = async (cId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/project/${projectId}/comment`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { commentId: cId },
        }
      );
      setComments((prevComments) =>
        prevComments.filter(
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
  }, []);

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
        {editingCommentId === comment.id ? (
          <EditComment
            comment={comment}
            token={token}
            onCommentEdited={handleCommentEdited}
            onCancelEdit={() => setEditingCommentId(null)}
          />
        ) : (
          <>
            <div className="mb-1">{comment.content}</div>
            <div className="text-xs text-gray-500">
              {formatDate(comment.datetime)}
            </div>
          </>
        )}
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
              <>
                <button
                  className="text-sm text-yellow-500 hover:text-yellow-600 transition duration-200"
                  onClick={() => setEditingCommentId(comment.id)}
                >
                  수정
                </button>
                <button
                  className="text-sm text-red-500 hover:text-red-600 transition duration-200"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  삭제
                </button>
              </>
            )}
          </>
        )}
      </div>
      {activeReplyId === comment.id && (
        <ReplyComment
          parentId={comment.id}
          projectId={projectId}
          user={user}
          token={token}
          onReplyAdded={handleReplyAdded}
        />
      )}
      {comments
        .filter((reply) => reply.parentId === comment.id)
        .sort((a, b) => new Date(b.datetime) - new Date(a.datetime))
        .map(renderComment)}
    </div>
  );

  return (
    <div className="mt-8 w-full">
      <h3 className="text-xl font-bold mb-6 text-gray-800">댓글</h3>
      {user ? (
        <AddComment
          projectId={projectId}
          user={user}
          token={token}
          onCommentAdded={handleCommentAdded}
        />
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
