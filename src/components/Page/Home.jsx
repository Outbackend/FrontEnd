import React, { useEffect, useState } from "react";

import Categories from "./Home/Category";
import ProjectList from "./Home/ProjectList";
import Container from "../Assets/Container";
import Search from "./Search/Search";

const Home = () => {
  useEffect(() => {
    window.location.reload();
  });

  return (
    <Container>
      <div className="text-center pt-32">
        <h3 className="text-2xl font-semibold">
          지금 당신을 찾고 있는 프로젝트들
        </h3>
      </div>
      <Categories />
      <Search/>
      <ProjectList/>
    </Container>
  );
};

export default Home;
