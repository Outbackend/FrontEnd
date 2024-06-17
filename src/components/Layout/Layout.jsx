import React from 'react';
import { Outlet } from 'react-router';

import Header from './Header';

const PageLayout = (props) => {
    return(
        <div>
            <Header />
            <div className='m-w-[1400px] m-auto'>
                <Outlet />
            </div> 
        </div>
    );

}

export default PageLayout