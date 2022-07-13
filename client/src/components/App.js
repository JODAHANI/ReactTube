import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import LangdingPage from "./LangdingPage/LangdingPage";
import NavBar from "./NavBar/NavBar";
import Register from './Register/Register'
import VideoUploadPage from "./VideoUploadPage/VideoUploadPage";
import Auth from './hoc/Auth'
export default function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <Router>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<Auth Component={LangdingPage} option={null} adminRoute={null} />} />
            <Route path="/login" element={<Auth Component={LoginPage} option={false} adminRoute={null} />} />
            <Route path="/register" element={<Auth Component={Register} option={false} adminRoute={null} />} />
            <Route path="/video/upload" element={<Auth Component={VideoUploadPage} option={true} adminRoute={null} />} />
            {/* <Route path="/login" element={Auth(LoginPage,false)} />
          <Route path="/register" element={Auth(Register ,false)} /> */}
          </Routes>
        </div>
      </Router>
    </Suspense>
  );
}