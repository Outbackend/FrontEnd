import React from "react";
import {Link} from "react-router-dom"
import Container from "../../Assets/Container"
import searchWindow from "../../Page/Home/searchOpen"

export const Navigation = () => {

  const window = searchWindow();

  return (
    <Container>
        <div className="flex justify-center items-center gap-6 font-medium text-white">
          <div>
            <Link to="/" onClick={window.onClose}>HOME</Link>
          </div>
          <div onClick={window.onOpen}
            className="cursor-pointer">
            SEARCH
          </div>
        </div>
    </Container>
  );
};
