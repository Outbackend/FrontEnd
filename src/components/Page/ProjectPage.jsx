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

  const getProject = async () => {
    try {
      if (id == null) {
        setProject(null);
        return;
      }
      //const response = await axios.get(`/dummy/projects.json`);
      const response = await axios.get(`/api/projects/${id}`);
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
    const response = await axios.get(`api/projects/${id}/comments`);
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
      {loading ? (
        <h1>loading...</h1>
      ) : project ? (
        <div className="max-w-[1400px] min-w-[722px] m-auto pt-32">
          {isEditing ? (
            <div>
              <EditProject project={project} />
            </div>
          ) : (
            <div className="">
              <div className="flex items-center">
                <h2 className="text-3xl flex-grow font-bold">
                  {project.title}
                </h2>
                <div className="flex text-center justify-between items-center">
                  {isAuthenticated &&
                    project.creator_id === user.id &&
                    (!isEditing ? (
                      <button
                        type="button"
                        onClick={handleEditButtonClick}
                        className="float-right mt-4 px-6 py-2 items-center text-center text-gray-500  hover:font-bold"
                      >
                        수정
                      </button>
                    ) : (
                      {}
                    ))}
                </div>
                <div className="bg-gray-200 px-4 py-2 mt-4 rounded-full font-semibold float-right">
                  ~{project.deadline}
                </div>
              </div>
              <Project project={project} />
              <Comment
                projectId={project.project_id}
                initialComments={comment}
                user={user}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-[1400px] min-w-[722px] m-auto pt-32">
          <EditProject />{" "}
          {/* 해당 id를 가진 project가 없는 경우 프로젝트 생성*/}
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
