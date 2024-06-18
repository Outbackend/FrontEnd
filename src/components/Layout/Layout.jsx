import React from 'react';
import { Outlet } from 'react-router';

import Header from './Header';
import userDetailStore from '../../variables/States/UserDetailStore';

const PageLayout = (props) => {
    const { userInfo } = userDetailStore;
    return(
        <div>
            <Header />
            <div className='m-w-[1400px] m-auto flex justify-center'>
                <Outlet />
            </div> 
        </div>
    );

}

export default PageLayout