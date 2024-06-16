import React from "react";
import axios from "axios";
import Project from "./Project/Project";
import EditProject from "./Project/EditProject";
import Comment from "./Project/Comment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProjectDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);
  const [comment, setComment] = useState([]);

  const getProject = async () => {
    const json = await axios.get(`/dummy/projects.json`);
    setProject(json.data);
  };
  const getComment = async () => {
    const json = await axios.get(`/dummy/comments.json`);
    setComment(json.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getProject();
      await getComment();
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <div className="p-8 max-w-[1170px] m-auto pt-28">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl flex-grow font-bold">{project.name}</h2>
            <button
              type="button"
              className="float-right mt-4 px-6 py-2 text-gray-500 rounded-full hover:font-bold"
            >
              수정
            </button>
            <div className="bg-gray-200 px-4 py-2 mt-4 rounded-full">
              {project.status}
            </div>
          </div>
          <Project project={project} />
          <EditProject project={project} />
          <h3 className="text-2xl font-bold mt-8 mb-4">댓글</h3>
          <Comment comments={comment} />
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
