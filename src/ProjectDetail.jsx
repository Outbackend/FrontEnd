import React from "react";
import Header from "./components/Header";
import Project from "./components/Project";
import Comment from "./components/Comment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProjectDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState(true);
  const [body, setBody] = useState(true);
  const [img, setImg] = useState([]);
  const [skills, setSkills] = useState([]);
  const [comment, setComment] = useState([]);

  const getName = async () => {
    const json = await (await fetch(`/api/projects.json?id=${id}`)).json();
    setName(json.data.name);
  };
  const getBody = async () => {
    const json = await (await fetch(`/api/projects.json?id=${id}`)).json();
    setBody(json.data.body);
  };
  const getImg = async () => {
    const json = await (await fetch(`/api/projects.json?id=${id}`)).json();
    setImg(json.data.project_image);
  };
  const getSkills = async () => {
    const json = await (await fetch(`/api/projects.json?id=${id}`)).json();
    setSkills(json.data.skill_tag);
  };
  const getComment = async () => {
    const json = await (await fetch(`/api/project/${id}/comment.json`)).json();
    setComment(json.data.body);
  };

  useEffect(() => {
    getName();
    getBody();
    getImg();
    getSkills();
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
            name={name}
            body={body}
            project_image={img}
            skill_tag={skills}
          />
          <hr />
          <h3>댓글</h3>
          <Comment comment={comment} />
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
