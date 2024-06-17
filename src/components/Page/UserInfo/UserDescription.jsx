import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const UserDescription = ({ description }) => {
    return (
        <div className='w-full h-auto relative m-auto float-left border-t-2 border-b-2 border-[#dfdfdf]'>
            <div className='h-[80px] relative'>
                <div className='w-[200px] top-[22px] left-5 relative'>
                    <p className='text-2xl font-bold select-none'>설명</p>
                </div>
            </div>
            <div className='px-4 pb-8'>
                <Markdown
                    remarkPlugins={[ remarkGfm ]}
                    components={{ img: ({node, ...props}) => <img style={{maxWidth: '100%'}}{...props} alt=""/> }}
                >
                    { description }
                </Markdown>
            </div>
        </div>
    );
}

export default UserDescription;