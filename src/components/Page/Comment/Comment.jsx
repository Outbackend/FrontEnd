import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLoginStore from "../../../variables/States/LoginStore";
import AddComment from "./AddComment";
import EditComment from "./EditComment";
import ReplyComment from "./ReplyComment";
import UserNickname from "./UserNickname";
import axios from "axios";

const formatDate = (datetime) =>
  datetime !== "2030-12-31 23:59:59"
    ? new Date(datetime).toLocaleString()
    : "방금 등록되었습니다.";

const Comment = ({ projectId, initialComments }) => {
  const [updateComments, setUpdateComments] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const { user, token } = useLoginStore();
  const navigate = useNavigate();

  const handleCommentAdded = (newComment) => {
    setUpdateComments(!updateComments);
  };

  const handleReplyAdded = (newReply) => {
    setActiveReplyId(null);
    setUpdateComments(!updateComments);
  };

  const handleCommentEdited = (editedComment) => {
    setEditingCommentId(null);
    setUpdateComments(!updateComments);
  };

  const handleDeleteComment = async (cId) => {
    try {
      const hasReplies = comments.some((comment) => comment.parentId === cId);

      if (hasReplies) {
        alert("답글이 있는 댓글은 삭제할 수 없습니다.");
        return;
      }

      await axios.delete(
        `${process.env.REACT_APP_API_URL}/project/${projectId}/comment`,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { commentId: cId },
        }
      );
      setUpdateComments(!updateComments);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/project/${projectId}/comment`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [updateComments, projectId]);

  const renderComment = (comment, isRoot = true) => {
    const hasReplies = comments.some((reply) => reply.parentId === comment.id);

    return (
      <div key={comment.id}>
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
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
              <UserNickname userId={comment.userId} />
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
          {user && (
            <div className="mt-2 space-x-2">
              {isRoot && (
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
              )}
              {user === comment.userId && (
                <>
                  <button
                    className="text-sm text-yellow-500 hover:text-yellow-600 transition duration-200"
                    onClick={() => setEditingCommentId(comment.id)}
                  >
                    수정
                  </button>
                  {!hasReplies && ( // 답글이 없는 경우에만 삭제 버튼 표시
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
          )}
        </div>
        {activeReplyId === comment.id && isRoot && (
          <ReplyComment
            parentId={Number(comment.id)}
            projectId={Number(projectId)}
            user={user}
            token={token}
            onReplyAdded={handleReplyAdded}
          />
        )}
        {isRoot && (
          <div className="mt-4 ml-8">
            {comments
              .filter((reply) => reply.parentId === comment.id)
              .sort((a, b) => new Date(b.datetime) - new Date(a.datetime))
              .map((reply) => renderComment(reply, false))}
          </div>
        )}
      </div>
    );
  };
  const sortedComments = comments
    .filter((comment) => comment.parentId === Number(projectId))
    .sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

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
        {sortedComments.length === 0 ? (
          <div className="my-10 text-center text-gray-600">
            아직 댓글이 달리지 않았습니다.
          </div>
        ) : (
          sortedComments.map((comment) => renderComment(comment, true))
        )}
      </div>
    </div>
  );
};

export default Comment;
