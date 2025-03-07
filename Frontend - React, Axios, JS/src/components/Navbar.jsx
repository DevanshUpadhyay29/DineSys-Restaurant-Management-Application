import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HotelNavbar from "./HotelNavbar";
import UserNavbar from "./UserNavbar";
import KitchenNavbar from "./KitchenNavbar";

const Navbar = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(localStorage.getItem("role") ? localStorage.getItem("role") : "");

  useEffect(()=>{
    setUserRole(localStorage.getItem("role")?localStorage.getItem("role"):"user")
    setIsLoggedIn(localStorage.getItem("isLoggedIn")?localStorage.getItem("isLoggedIn"):false);
  })

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          RMS
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {
              isLoggedIn ? (
                <>{
                  userRole === "admin" ? (
                  <>
                    <HotelNavbar />
                  </>
                  ) : (
                  <>
                    {
                      userRole === "kitchen" ? (
                        <>
                          <KitchenNavbar />
                        </>
                      ) : (
                        <UserNavbar />
                      )
                    }
                  </>
                  )
                }
                <button className="btn btn-danger" onClick={()=>navigate("/logout")}>Log Out</button>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                </>
              )
            }

          </ul>
        </div >
      </div >
    </nav >
  );
};

export default Navbar;
