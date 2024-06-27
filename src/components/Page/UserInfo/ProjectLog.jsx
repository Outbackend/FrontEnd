import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useNavigate } from 'react-router-dom';

const ProjectLog = ({ id, name, description, status, position }) => {

    const stat = status === '모집중' ? 'bg-white' : 'bg-gray-300 text-white'
    const pos = position === '' ? '' : 'bg-white shadow'
    const navigate = useNavigate();
    return(
        <div className='relative h-[150px] border-b mt-5 [border-bottom-style:solid] border-[#dfdfdf] 
            bg-gray-100 rounded-lg p-2 mb-2 shadow-md'
            onClick={()=>navigate(`/project/${id}`)}>
            <div className='relative h-[50px]'>
                <div className='absolute h-[30px] top-[50%] mt-[-15px] left-5'>
                    <p className='text-lg font-bold'>{ name }</p>
                </div>
                <div className='absolute inset-y-0 right-5 top-1 flex gap-3'>
                    <div className={`w-[120px] h-10 rounded-[25px] flex justify-center ${pos}`}>
                        <div className='m-auto'>
                            <p className={`text-base font-bold`}>{ position }</p>
                        </div>
                    </div>
                    <div className={`w-[120px] h-10 rounded-[25px] flex justify-center shadow ${stat}`}>
                        <div className='m-auto'>
                            <p className='text-base font-bold'>{ status }</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-[150px]'>
                <div className='h-[130px] px-5 text-ellipsis overflow-y-auto'>
                    <Markdown
                        remarkPlugins={[ remarkGfm ]}
                        components={{ img: ({node, ...props}) => <img style={{maxWidth: '100%'}}{...props} alt=""/> }}
                    >
                        { description }
                    </Markdown>
                </div>
            </div>
        </div>
    );
}

export default ProjectLog;