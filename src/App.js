import React from "react";
import { Routes, Route } from 'react-router-dom';

import PageLayout from "./components/Layout/Layout";
import UserInfo from "./components/Page/UserInfo";
import LoginPage from "./components/Page/LoginPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PageLayout/>}>
          <Route path="/" element={<UserInfo/>}></Route>
          <Route path="/userinfo" element={<UserInfo/>}></Route>
        </Route>
        <Route path="/login" element={<LoginPage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
