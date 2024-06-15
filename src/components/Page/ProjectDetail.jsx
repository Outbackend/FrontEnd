import React from "react";
import axios from "axios";
import Project from "./Project/Project";
import Comment from "./Project/Comment";
import MDEditor from "@uiw/react-md-editor";
import ImageSlider from "./Project/ImageSlider";
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
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">{project.name}</h2>
            <button className="border-b-2 border-black px-4 py-2">
              수정하기
            </button>
            <div className="bg-gray-200 px-4 py-2 rounded-full">모집중</div>
          </div>
          <Project project={project} />
          <hr className="my-8" />
          <div>
            <h2 className="text-2xl font-bold mb-4">프로젝트 설명</h2>
            <ImageSlider images={project.project_image} />
            <MDEditor.Markdown source={project.body} />
          </div>
          <h3 className="text-2xl font-bold mt-8 mb-4">댓글</h3>
          <Comment comments={comment} />
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
