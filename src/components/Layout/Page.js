import React from 'react'
import Header from './header/Header';

const Layout = ({children}) => {
    const user = null;
    //const user = getUser();
    return (
        <div>
            <Header user={user}/>
            <div>{children}</div>
        </div>
    );
}

export default Layout;