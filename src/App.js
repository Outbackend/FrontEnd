import React from "react";

import { Routes, Route, useParams } from "react-router-dom";
import PageLayout from "./components/Layout/Layout";
import UserInfo from "./components/Page/UserInfo";
import LoginPage from "./components/Page/LoginPage";
import UserInfoModify from "./components/Page/UserInfoModify";
import Home from "./components/Page/Home";
import ProjectPage from "./components/Page/ProjectPage";
import AuthPage from "./components/Page/Auth";

function App() {
  const { id } = useParams();

  return (
    <div className="App">
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/userinfo/:id" element={<UserInfo />}></Route>
          <Route path="/userinfomodify/:id" element={<UserInfoModify />}></Route>
          <Route path="/project/:id" element={<ProjectPage />}></Route>
          <Route path="/editproject" element={<ProjectPage />}></Route>
        </Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/auth" element={<AuthPage />}></Route>
        <Route path="/*" element={<div>404</div>}></Route>
      </Routes>
    </div>
  );
}

export default App;
