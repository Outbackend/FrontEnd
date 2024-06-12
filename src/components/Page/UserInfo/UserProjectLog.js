import React from 'react';

import ProjectLog from './ProjectLog';

const UserProjectLog = () => {
    return( 
        <div className='relative w-full h-[1000px] m-auto float-left'>
            <div className='h-[60px] relative'>
                <div className='relative w-[200px] top-[22px] left-5'>
                    <p className='text-2xl font-bold'>프로젝트 기록</p>
                </div>
            </div>
            <div>
                <ProjectLog
                    name="프로젝트 이름"
                    description="저는 현재 리액트에서 \`react-markdown\`를 이용하여 **마크다운**을 랜더링하고 있습니다.\n"
                    status="진행중"
                />
                <ProjectLog
                    name="프로젝트 이름"
                    description="저는 현재 리액트에서 \`react-markdown\`를 이용하여 **마크다운**을 랜더링하고 있습니다.\n"
                    status="진행중"
                />
                <ProjectLog
                    name="프로젝트 이름"
                    description="저는 현재 리액트에서 \`react-markdown\`를 이용하여 **마크다운**을 랜더링하고 있습니다.\n"
                    status="진행중"                
                />
            </div>
        </div>
    );
}

export default UserProjectLog;