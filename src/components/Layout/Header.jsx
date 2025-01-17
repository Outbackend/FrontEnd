import { useNavigate } from "react-router-dom";
import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";

import LoginStore from "../../variables/States/LoginStore";
import Logo from "./header/Logo";
import UserImg from "./header/LogoUser";
import { Navigation } from "./header/Navigation";
import Container from "../Assets/Container";
import MenuItem from "../Assets/MenuItem";
import userDetailStore from "../../variables/States/UserDetailStore";

const Header = () => {
  const { isAuthenticated, user, token, logout } = LoginStore();
  const { userInfo, fetchData } = userDetailStore();
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      if (user !== null) {
        fetchData(user);
      }
    }
  }, [isInitialRender]);

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleLogout = async () => {
    try{
        await axios.post(process.env.REACT_APP_API_URL + '/user/logout',null, 
          {headers: {Authorization: 'Bearer ' + token}})
        await logout()
        window.location.reload()
      } catch(e){
      alert(e)
    }
  };

  return (
    <div className="fixed w-full bg-white py-2 z-50">
      <Container>
        <div className="relative flex flex-row items-center justify-between pb-2">
          <div>
            <Logo />
          </div>
          <div
            className="
                        hidden
                        md:flex
                        p-4
                        md:py-1
                        md:px-1
                        border-[1px] 
                        border-neutral-200 
                        rounded-full 
                        cursor-pointer 
                        hover:shadow-md 
                        transition
                        "
            onClick={toggleOpen}
          >
            <UserImg src={userInfo?.profile_img} />
            {isOpen && (
              <div
                className="
                            absolute
                            rounded-xl 
                            shadow-md
                            w-40
                            bg-white 
                            right-0 
                            top-12 
                            text-sm
                            "
              >
                <div className="flex flex-col">
                  {isAuthenticated ? (
                    <>
                      <div className = "px-4 py-3 rounded-xl font-semibold">
                        {userInfo.nickname} 님
                      </div>
                      <hr />
                      <MenuItem
                        onClick={() => navigate(`/userinfo/${user}`)}
                        label="Profile"
                      />
                      <MenuItem
                        onClick={() => navigate("/editproject")}
                        label="Create Project"
                      />
                      <MenuItem onClick={handleLogout} label="Logout" />
                    </>
                  ) : (
                    <>
                      <MenuItem
                        onClick={() => navigate("/login")}
                        label="Login"
                      />
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
      <div className="shadow-md bg-[#5C9CDD] p-2 -mb-4">
        <Navigation />
      </div>
    </div>
  );
};

export default Header;
