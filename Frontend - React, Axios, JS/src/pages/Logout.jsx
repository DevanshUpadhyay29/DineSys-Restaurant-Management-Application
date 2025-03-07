import React from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate  = useNavigate();
    const logoutUser = ()=>{
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        localStorage.removeItem("isLoggedIn")
        localStorage.removeItem("jwttoken")
        navigate("/login")
    }
  return (
    <div className='container' style={{minHeight:"62.9vh"}} align="center">
      <h4>Are you sure to Logout?</h4>
      <p>click here to logout</p>
      <button className='btn btn-danger' onClick={()=>logoutUser()}>LOG OUT</button>
    </div>
  )
}

export default Logout
