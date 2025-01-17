import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Project from "./Project/Project";
import EditProject from "./EditProject";
import Comment from "./Comment/Comment";
import useLoginStore from "../../variables/States/LoginStore";

const ProjectDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);
  const [comment, setComment] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useLoginStore();

  const getProject = async () => {
    try {
      if (id == null) {
        setProject(null);
        return;
      }
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/project/${id}`
      );
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
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/project/${id}/comment`
    );
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
      {loading ? (
        <div>
          <h3>잠시만 기다려주세요.</h3>
          <img src={"/Spin.gif"} alt="로딩" width="10%" />
        </div>
      ) : project ? (
        <div className="w-[60vw] min-w-[800px] pb-10">
          {isEditing ? (
            <div>
              <EditProject project={project} id={id} />
            </div>
          ) : (
            <div className="pt-32">
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
                    project.publisher === user &&
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
      ) : (
        <>
          {alert("존재하지 않는 프로젝트입니다.")}
          {navigate("/")}
        </>
      )}
    </div>
  );
};

export default ProjectDetail;
