import { useNavigate } from "react-router-dom";
import React, { useState, useCallback } from "react";
import Logo from "./header/Logo";
import UserImg from "./header/LogoUser";
import { Navigation } from "./header/Navigation";
import Container from "../Assets/Container";

const Header = ({ user }) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <>
      <div className="fixed w-full bg-white shadow-sm py-2 z-50">
        <Container>
          <div className="flex flex-row items-center justify-between">
            <div>
              <Logo />
            </div>
            <div
              className="
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
              <UserImg src={user?.profile_img} />
            </div>
          </div>
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
              <div className="flex flex-col cursor-pointer">
                {user ? (
                  <>
                    <div
                      className="px-4
                                            py-3 hover:bg-neutral-100
                                            transition 
                                            font-semibold"
                      onClick={() => navigate("/profile")}
                    >
                      Profile
                    </div>
                    <div
                      className="px-4
                                            py-3 hover:bg-neutral-100
                                            transition 
                                            font-semibold"
                      onClick={() => navigate("/create")}
                    >
                      Create Project
                    </div>
                    <hr />
                    <div
                      className="px-4
                                            py-3 hover:bg-neutral-100
                                            transition 
                                            font-semibold"
                    >
                      Logout
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="px-4
                                            py-3 hover:bg-neutral-100
                                            transition 
                                            font-semibold"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </Container>
        <Navigation />
      </div>
    </>
  );
};

export default Header;
