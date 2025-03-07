import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const KitchenNavbar = () => {
    return (
        <>
            <li className="nav-item">
                <Link className="nav-link" to="/kitchen/orders">Kitchen Orders</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/kitchen/add-order">Add Kitchen Order</Link>
            </li>

        </>
    )
}

export default KitchenNavbar
