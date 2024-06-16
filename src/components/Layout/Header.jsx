import { useNavigate } from "react-router-dom";
import React, { useState, useCallback } from "react";
import Logo from "./header/Logo";
import UserImg from "./header/LogoUser";
import { Navigation } from "./header/Navigation";
import Container from "../Assets/Container";
import MenuItem from "../Assets/MenuItem";

const Header = ({ user }) => {
  const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() =>{
        setIsOpen(value => !value)
    }, []);
    
    return(
        <div className="fixed w-full bg-white py-2 Z-100">
            <Container>
            <div className="relative flex flex-row items-center justify-between pb-2">
                <div>
                    <Logo />
                </div>
                <div className="
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
                    onClick={toggleOpen}>
                    <UserImg src={user?.profile_img} />
                    {isOpen && (
                        <div className="
                            absolute
                            rounded-xl 
                            shadow-md
                            w-40
                            bg-white 
                            right-0 
                            top-12 
                            text-sm
                            ">
                            <div className="flex flex-col cursor-pointer">
                                {user ? (
                                        <>
                                            <MenuItem 
                                                onClick={()=>navigate('/profile')}
                                                label="Profile"
                                            />
                                            <MenuItem 
                                                onClick={()=>navigate('/create')}
                                                label="Create Project"
                                            />
                                            <hr />
                                            <MenuItem 
                                                onClick={()=>navigate('/logout')}
                                                label="Logout"
                                            />
                                        </>
                                        ) : (
                                        <>
                                            <MenuItem 
                                                onClick={()=>navigate('/login')}
                                                label="Login"
                                            />
                                        </>
                                    )
                                }   
                            </div>   
                        </div>
                    )}
                </div>
            </div>
            </Container>
            <div className="shadow-md bg-[#5C9CDD] p-2 -mb-4">
                <Navigation/>
            </div>
        </div>
);
}

export default Header;
