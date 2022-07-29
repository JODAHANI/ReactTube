import React from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';

import {
  Link, useNavigate
} from "react-router-dom";
import { message } from 'antd';



function RightMenu() {
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  const logoutHandler = () => {
    axios.get('/api/users/logout').then(res => {
      if (res.data.success) {
        message.success('로그아웃 되었습니다.',1)
        navigate('/login')
      }
    })
  }
  if (user.userData && user.userData.isAuth) {
    return (
      <div className='nav-right nav-items'>
        <Link to="/">Home</Link>
        <Link to="/video/upload">Upload</Link>
        <Link to="/" onClick={logoutHandler}>Logout</Link>
      </div>
    )
  } else {
    return (
      <div className='nav-right nav-items'>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    )
  }
}
export default RightMenu 
