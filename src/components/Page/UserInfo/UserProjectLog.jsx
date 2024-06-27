import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ProjectLog from './ProjectLog';

const UserProjectLog = ({ projectList }) => {
    const [projects, setProjects] = useState([]);
      
        useEffect(() => {
          const fetchProjects = async () => {
            const updatedProjects = await Promise.all(
              projectList.map(async (project) => {
                try {
                  const response = await axios.get(process.env.REACT_APP_API_URL + '/project/' + project.id);
                  const { name, description, status } = response.data;
                  return {
                    id: project.id,
                    name,
                    description,
                    status,
                    position: project.position,
                  };
                } catch (error) {
                  if (error.response.status === 404 || error.response.status === 401) {
                    return {
                      id: project.id,
                      name: project.name,
                      description: project.description,
                      status: "삭제된 게시물",
                      position: project.position,
                    };
                  } else {
                    console.error('프로젝트 정보를 가져오는 중 오류 발생:', error);
                    return null;
                  }}
              })
            )
            setProjects(updatedProjects.filter((project) => project !== null).reverse());
          };
      
          fetchProjects();
        }, [projectList]);

    return( 
        <div className='relative w-full h-[1000px] m-auto float-left'>
            <div className='h-[60px] relative'>
                <div className='relative w-[200px] top-[22px] left-5'>
                    <p className='text-2xl font-bold select-none'>프로젝트 기록</p>
                </div>
            </div>
            <div>
                {projects.map((project) => 
                    <ProjectLog
                        key={ project.id }
                        id={project.id}
                        name={ project.name }
                        description={ project.description }
                        status={ project.status }
                        position={ project.position }
                    />
                )}
            </div>
        </div>
    );
}

export default UserProjectLog;