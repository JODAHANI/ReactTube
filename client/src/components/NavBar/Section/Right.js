import React from 'react'
// import axios from 'axios's
import {
  Link, useNavigate
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '../../../_actions/user_actions';


function RightMenu() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout()).then(res => { 
      console.log(res)
      alert('로그아웃 되었습니다.')
      navigate('/login')
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
