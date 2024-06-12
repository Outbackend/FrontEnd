import React from "react";
import MDEditor from "@uiw/react-md-editor";

import ImageSlider from "./Project/ImageSlider";

const Project = ({ name, body, project_image, skill_tag }) => {
  const type = [
    { type: "백엔드", wanted: 1, current: 1 },
    { type: "프론트엔드", wanted: 2, current: 1 },
    { type: "디자이너", wanted: 3, current: 1 },
  ];
  return (
    <div>
      <div>
        <h2>{name}</h2>
        <button>수정하기</button>
        <div>모집중</div>
      </div>
      <div>
        <div>
          <h3>원해요!</h3>
          {type.map((elem) => {
            <ul>
              <div>{elem.type}</div>
              <div>{elem.wanted}</div>
            </ul>;
          })}
        </div>
        <div>
          <h3>이걸 써요!</h3>
          {skill_tag.map((skill) => {
            <ul>
              <li>{skill}</li>
            </ul>;
          })}
        </div>
        <div>
          <h3>지금 프로젝트는...</h3>
          {type.map((elem) => {
            <ul>
              <div>{elem.type}</div>
              <div>{elem.current}</div>
            </ul>;
          })}
        </div>
      </div>
      <h2>프로젝트 설명</h2>
      <hr />
      <div>
        <ImageSlider images={project_image} />
        <MDEditor.Markdown source={body} />
      </div>
    </div>
  );
};

export default Project;
