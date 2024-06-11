import React from "react";

const Comment = ({ comment }) => {
  return (
    <div>
      {comment.map((c) => {
        <p>{c}</p>;
      })}
    </div>
  );
};

export default Comment;
