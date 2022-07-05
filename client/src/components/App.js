import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import LangdingPage from "./LangdingPage/LangdingPage";
import NavBar from "./NavBar/NavBar";
import Register from './Register/Register'
// import Auth from './hoc/Auth3'
import Auth from './hoc/Auth'
export default function App() {
  return (
    <Router>
      <div>
       <NavBar />
        <Routes>
          <Route path="/" element={<Auth Component={LangdingPage} option={null} adminRoute={null} />} />
          <Route path="/login" element={<Auth Component={LoginPage} option={false} adminRoute={null}/>} />
          <Route path="/register" element={<Auth Component={Register} option={false} adminRoute={null}/>} />
          {/* <Route path="/login" element={Auth(LoginPage,false)} />
          <Route path="/register" element={Auth(Register ,false)} /> */}
        </Routes>
      </div>
    </Router>
  );
}