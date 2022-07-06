import React from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { Menu} from 'antd';

import {
  Link, useNavigate
} from "react-router-dom";



function RightMenu() {
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  const logoutHandler = () => {
    axios.get('/api/logout').then(res => {
      if (res.data.success) {
        alert('로그아웃 되었습니다.')
        navigate('/login')
      }
    })
  }
  if (user.userData && user.userData.isAuth) {
    return (
      <div className='nav-right nav-items'>
        <Menu.Item key="cart">
          <Link to="/">Home</Link>
        </Menu.Item>
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
