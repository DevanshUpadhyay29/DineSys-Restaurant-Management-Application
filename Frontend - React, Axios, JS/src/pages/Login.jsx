import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordWarning, setPasswordWarning] = useState("");
    const [usernameWarning, setUsernameWarning] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.length < 3) {
            setUsernameWarning("Username should be longer than 3 characters");
        } else if (password.length < 6) {
            setPasswordWarning("Password should be longer than 6 characters");
        } else {
            const user = { username, password };
            axios.post("http://localhost:8087/auth/authenticate", user)
                .then(res => {
                    console.log("Login successful", res.data);
                    localStorage.setItem("token", res.data.jwttoken);
                    localStorage.setItem("username", res.data.username);
                    localStorage.setItem("role", res.data.role);
                    localStorage.setItem("isLoggedIn", true);
                    navigate("/");
                })
                .catch(err => {
                    localStorage.setItem("isLoggedIn", false);
                    if (err.response && err.response.status === 403) {
                        setErrorMessage("Invalid credentials. Please try again.");
                    }
                    console.log(err);
                });
        }
    };

    const styleLogin = {
        minHeight: '62.9vh'
    };

    return (
        <div className="container w-75" style={styleLogin}>
            <form onSubmit={handleSubmit} className="pt-5 d-flex flex-column shadow p-3 mb-5 bg-body-secondary rounded align-items-center">
                <h2 className="mb-4">Login</h2>
                {errorMessage && 
                    <div style={{ color: "red", border: "1px solid red", padding: "10px", borderRadius: "5px", backgroundColor: "#ffe6e6", marginBottom: "20px" }}>
                        {errorMessage}
                    </div>
                }
                <div className="mb-3 col-md-7">
                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" onChange={(e) => {
                        setUsername(e.target.value);
                        setUsernameWarning("");
                        setErrorMessage("");
                    }} />
                    {usernameWarning && <p style={{ color: "red" }}>{usernameWarning}</p>}
                </div>
                <div className="mb-5 col-md-7">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordWarning("");
                        setErrorMessage("");
                    }} />
                    {passwordWarning && <p style={{ color: "red" }}>{passwordWarning}</p>}
                </div>
                <button type="submit" className="btn btn-primary col-md-5 mb-5">Submit</button>
            </form>
        </div>
    );
};

export default Login;
