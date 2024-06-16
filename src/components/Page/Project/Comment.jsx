import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Comment = ({ comments: initialComments }) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const newCommentObject = {
        comment_id: comments.length + 1,
        userid: "currentUser",
        body: newComment,
      };
      setComments([...comments, newCommentObject]);
      setNewComment("");
    }
  };

  return (
    <div className="p-8">
      <h3 className="text-2xl font-bold mb-4">댓글</h3>
      <div className="mb-4">
        <textarea
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="댓글을 작성해주세요."
          value={newComment}
          onChange={handleCommentChange}
        />
        <button
          className="mt-2 bg-blue-100 text-gray-500 font-semibold px-4 py-2 rounded-full hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
          onClick={handleAddComment}
        >
          댓글달기
        </button>
      </div>
      <div className="space-y-4">
        {comments
          .slice()
          .reverse()
          .map((c) => (
            <div
              key={c.comment_id}
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
                  onClick={() => navigate(`/User/${c.userid}`)}
                >
                  user {c.userid}
                </div>
              </div>
              <div className="ml-4 flex-auto text-gray-600">{c.body}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Comment;
