import React from "react";
import Header from "./components/Header";
import Project from "./components/Project";
import Comment from "./components/Comment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProjectDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(true);
  const [comment, setComment] = useState([]);

  const getProject = async () => {
    const json = await (await fetch(`/api/projects.json?id=${id}`)).json();
    setProject(json.data.project);
  };
  const getComment = async () => {
    const json = await (await fetch(`/api/project/${id}/comment.json`)).json();
    setComment(json.data.comment);
  };
  useEffect(() => {
    getProject();
    getComment();
    setLoading(false);
  }, []);

  return (
    <div>
      <Header />
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <div>
          <Project
            name={project.name}
            body={project.body}
            project_image={project.project_image}
            skill_tag={project.skill_tag}
          />
          <hr />
          <h3>댓글</h3>
          <Comment body={comment.body} />
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
