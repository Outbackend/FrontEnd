import React from 'react';
import { Outlet } from 'react-router';

import Header from './Header/Header';

const PageLayout = (props) => {
    return(
        <div>
            <Header />
            <div className='w-[1180px] m-auto'>
                <Outlet />
            </div> 
        </div>
    );

}

export default PageLayout