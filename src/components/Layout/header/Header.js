import React from 'react';
import LogoUser from './LogoUser';
import Navigation from './Navigation';


const Header = () => {
    return (
        <div className="bg-white flex flex-row justify-center w-full">
            <LogoUser />
            <Navigation />
        </div>
    );
}

export default Header;