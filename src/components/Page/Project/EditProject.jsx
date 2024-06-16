import React from "react";
import Recruit from "./Recruit";
import AddRecruit from "./AddRecruit";
import SimpleImageSlider from "react-simple-image-slider";
import MDEditor from "@uiw/react-md-editor";
import SelectableTags from "./AddTags";

const EditProject = ({ project }) => {
  const [value, setValue] = React.useState(project.body);

  return (
    <div className="p-8">
      <div className="flex flex-row space-x-8">
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4 text-center">현재 구인인원</h3>
          <AddRecruit before={project.recruit} />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4 text-center">이걸 써요!</h3>
          <div className="list-none text-center items-center space-y-4">
            <SelectableTags before={project.skill_tag} />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4 text-center">
            지금 프로젝트는...
          </h3>
          <AddRecruit before={project.current} />
        </div>
      </div>
      <hr className="my-8" />
      <div>
        <h2 className="text-2xl font-bold mb-4">프로젝트 설명</h2>
        <SimpleImageSlider
          width={400}
          height={300}
          images={project.project_image}
          showBullets={true}
          showNavs={true}
        />
        <MDEditor value={value} onChange={setValue} />
      </div>
    </div>
  );
};

export default EditProject;
