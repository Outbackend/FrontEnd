import React from 'react';
import LogoUser from './LogoUser';
import Navigation from './Navigation';


const Header = () => {
    return (
        <div className="bg-black flex flex-row justify-center w-full h-[150px]">
            <LogoUser />
            <Navigation />
        </div>
    );
}

export default Header;