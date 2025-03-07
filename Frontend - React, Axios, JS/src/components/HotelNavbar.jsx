import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserNavbar from './UserNavbar'
import KitchenNavbar from './KitchenNavbar'

const HotelNavbar = () => {
  return (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/admin/menu">Admin Menu</Link>
      </li>
      <UserNavbar/>
      <KitchenNavbar/>
    </>
  )
}

export default HotelNavbar
