import React, { useEffect, useState } from "react";
import axios from "axios";
import Project from "./Project/Project";
import EditProject from "./EditProject";
import Comment from "./Project/Comment";
import useLoginStore from "../../variables/States/LoginStore";
import { useParams } from "react-router-dom";

const ProjectDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);
  const [comment, setComment] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const { isAuthenticated, user } = useLoginStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    user: state.user,
  }));

  const baseUrl = "http://47.128.234.198:5000";

  const getProject = async () => {
    try {
      if (id == null) {
        setProject(null);
        return;
      }
      //const response = await axios.get(`/dummy/projects.json`);
      const response = await axios.get(`${baseUrl}/project/${id}`);
      setProject(response.data);
    } catch (error) {
      console.log(error);
      setProject(null);
    }
  };

  const getComment = async () => {
    if (id == null) {
      setComment(null);
      return;
    }
    //const response = await axios.get(`/dummy/comments.json`);
    const response = await axios.get(`${baseUrl}/project/${id}/comment`);
    console.log(response);
    setComment(response.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getProject();
      await getComment();
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  return (
    <div>
      {id ? (
        <h1>loading...</h1>
      ) : project ? (
        <div className="max-w-[1400px] min-w-[722px] m-auto pt-32">
          {isEditing ? (
            <div>
              <EditProject project={project} id={id} />
            </div>
          ) : (
            <div className="">
              <div className="flex items-center space-x-2 pt-4">
                <div className="flex items-center space-x-2 w-full">
                  <span
                    className={`px-2 py-1 rounded-full font-semibold ${
                      project.status === "모집중"
                        ? "bg-blue-200 text-blue-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {project.status}
                  </span>
                  <h2 className="text-3xl font-bold">{project.name}</h2>
                  <div className="px-1 py-2 font-semibold text-gray-700 items-center">
                    ( ~{project.endDate} )
                  </div>
                </div>
                <div className="flex text-center justify-between items-center">
                  {isAuthenticated &&
                    project.creator_id === user.id &&
                    (!isEditing ? (
                      <button
                        type="button"
                        onClick={handleEditButtonClick}
                        className="float-right px-4 py-2 w-20 items-center text-center text-gray-500  hover:font-bold"
                      >
                        수정
                      </button>
                    ) : (
                      {}
                    ))}
                </div>
              </div>
              <Project project={project} />
              <Comment projectId={id} initialComments={comment} />
            </div>
          )}
        </div>
      ) : user ? (
        <div className="max-w-[1400px] min-w-[722px] m-auto pt-32">
          {/* <EditProject />{" "} */}
          {/* 해당 id를 가진 project가 없는 경우 프로젝트 생성*/}
        </div>
      ) : (
        {}
      )}
    </div>
  );
};

export default ProjectDetail;
