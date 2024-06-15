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
        <div key={c.comment_id} className="mb-4 p-4 flex border rounded-lg">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              <img
                src="/UserDefault.jpg"
                className="w-[50px] h-[50px] rounded-[70%] overflow-hidden"
              />
              <div className="block text-lg leading-tight font-medium text-black">
                user {c.userid}
              </div>
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <p className="ml-4 flex-auto text-gray-600">{c.body}</p>
            </dd>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
