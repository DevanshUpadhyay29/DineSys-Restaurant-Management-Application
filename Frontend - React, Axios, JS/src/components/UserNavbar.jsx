import React from 'react'
import { Link } from 'react-router-dom'

const UserNavbar = () => {
    return (
        <>
            <li className="nav-item">
                <Link className="nav-link" to="/user/menu">User Menu</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/user/order">Place Order</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/user/status">Track Order</Link>
            </li>
        </>
    )
}

export default UserNavbar
