import React from 'react'
import axios from 'axios'
import {
  Link, useNavigate
} from "react-router-dom";


function RightMenu() {
  const navigate = useNavigate()
  const logoutHandler = () => {
    axios.get('/api/logout').then(res => {
      if (res.data.success) {
        alert('로그아웃 되었습니다.')
        navigate('/login')
      }
    })
  }
  return (
    <div className='nav-right nav-items'>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/" onClick={logoutHandler}>Logout</Link>
    </div>
  )
}
export default RightMenu 
