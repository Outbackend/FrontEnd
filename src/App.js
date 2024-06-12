import React from "react";
import { Routes, Route } from 'react-router-dom';
import PageLayout from "./components/Layout/Layout";
import UserInfo from "./components/Page/UserInfo";
import LoginPage from "./components/Page/LoginPage";
import UserInfoModify from "./components/Page/UserInfoModify";
import Home from "./components/Page/Home"
import ProjectDetail from "./components/Page/ProjectDetail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/userinfo" element={<UserInfo />}></Route>
          <Route path="/userinfomodify" element={<UserInfoModify />}></Route>
          <Route path='/project' element={<ProjectDetail />}></Route>
        </Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/*" element={<div>404</div>}></Route>
      </Routes>
    </div>
  );
}

export default App;