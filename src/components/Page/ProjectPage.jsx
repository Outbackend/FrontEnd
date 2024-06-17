import React, { useEffect, useState } from "react";
import axios from "axios";
import Project from "./Project/Project";
import EditProject from "./Project/EditProject";
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
    const response = await axios.get(`/dummy/projects.json`);
    setProject(response.data);
  };

  const getComment = async () => {
    const response = await axios.get(`/dummy/comments.json`);
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

  const handleSaveButtonClick = () => {
    setIsEditing(false);
  };

  return (
    <div>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <div className="min-w-[722px] m-auto pt-32">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl flex-grow font-bold">{project.name}</h2>
            {isAuthenticated &&
              project.creator_id === user.id &&
              (!isEditing ? (
                <button
                  type="button"
                  onClick={handleEditButtonClick}
                  className="float-right mt-4 px-6 py-2 text-gray-500 rounded-full hover:font-bold"
                >
                  수정
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSaveButtonClick}
                  className="float-right mt-4 px-6 py-2 text-gray-500 rounded-full hover:font-bold"
                >
                  저장
                </button>
              ))}
            <div className="bg-gray-200 px-4 py-2 mt-4 rounded-full">
              {project.status}
            </div>
          </div>
          {isEditing ? (
            <EditProject project={project} />
          ) : (
            <div className="">
              <Project project={project} />
              <Comment comments={comment} user={user} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
