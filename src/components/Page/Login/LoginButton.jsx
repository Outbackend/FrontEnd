import React from 'react';

const LoginButton = ({ text, onClick }) => {
    return (
      <button className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 select-none" onClick={ onClick }>
        { text }
      </button>
    );
  };
  
  export default LoginButton;