import React from "react";

const Comment = ({ comments }) => {
  return (
    <div className="mt-8">
      <div className="mb-4">
        <textarea
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="댓글을 작성해주세요."
        />
        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          댓글달기
        </button>
      </div>
      {comments.map((c) => (
        <div key={c.comment_id} className="mb-4 p-4 border rounded-lg">
          <div className="font-bold flex flex-row">{c.userid}</div>
          <p className="flex flex-row text-gray-600">{c.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Comment;
