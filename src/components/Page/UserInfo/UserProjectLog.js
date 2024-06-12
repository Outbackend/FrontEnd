import React from 'react';

import ProjectLog from './ProjectLog';

const UserProjectLog = ({ projectList }) => {
    return( 
        <div className='relative w-full h-[1000px] m-auto float-left'>
            <div className='h-[60px] relative'>
                <div className='relative w-[200px] top-[22px] left-5'>
                    <p className='text-2xl font-bold'>프로젝트 기록</p>
                </div>
            </div>
            <div>
                {projectList.map((project) => 
                    <ProjectLog
                        name={ project.name }
                        description={ project.description }
                        status={ project.status }
                    />
                )}
            </div>
        </div>
    );
}

export default UserProjectLog;