import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

const Home = () => {
  const [role, setRole] = useState("kitchen");

  useEffect(() => {
    // Simulating fetching the role from local storage (or API)
    const userRole = localStorage.getItem("role"); // "Admin" / "User" / "Kitchen"
    setRole(userRole);
  }, []);

  const heroStyle={
    minHeight:"62.9vh",
    paddingTop:"65px",
  }

  return (
    <div className="container" style={heroStyle}>
      {/* Hero Section */}
      <header
        className="text-white text-center py-5"
        style={{
          backgroundImage: "url('https://source.unsplash.com/1600x900/?restaurant')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "1vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="container text-black">
          <h1 className="display-4 fw-bold ">
            Welcome {role ? `, ${role}` : "to Restaurant Management System"}
          </h1>
          <p className="lead">Streamlined & Efficient Restaurant Operations</p>
          {!role ? (
            <a href="/login" className="btn btn-primary btn-lg mt-3">
              Login to Continue
            </a>
          ) : null}
        </div>
      </header>

      {/* Dynamic Section Based on Role */}
      {role && (
        <section className="container text-center my-4">
          <h2 className="mb-5 fw-bold">Quick Navigation</h2>
          <div className="row justify-content-center">
            {/* Admin Navigation */}
            {role === "admin" && (
              <div className="col-md-4">
                <div className="card shadow-lg p-3 bg-white rounded">
                  <img src="https://plus.unsplash.com/premium_photo-1661281234131-5a81d87a4d2a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                       className="card-img-top" alt="Admin" />
                  <div className="card-body">
                    <h5 className="card-title fw-bold">Admin Dashboard</h5>
                    <p className="card-text">Manage menu, track orders, and oversee restaurant operations.</p>
                    <a href="/admin/menu" className="btn btn-outline-primary">Go to Admin Panel</a>
                  </div>
                </div>
              </div>
            )}

            {/* User Navigation */}
            {role === "user" && (
              <div className="col-sm-4">
                <div className="card shadow-lg p-3 bg-white rounded">
                  <img src="https://plus.unsplash.com/premium_photo-1661431006380-ef37401c681b?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                       className="card-img-top" alt="User" />
                  <div className="card-body">
                    <h5 className="card-title fw-bold">Place an Order</h5>
                    <p className="card-text">Browse the menu, place orders, and track order status easily.</p>
                    <a href="/user/menu" className="btn btn-outline-success">Order Now</a>
                  </div>
                </div>
              </div>
            )}

            {/* Kitchen Navigation */}
            {role === "kitchen" && (
              <div className="col-md-4">
                <div className="card shadow-lg p-3 bg-white rounded">
                  <img src="https://plus.unsplash.com/premium_photo-1687697860923-2e4bb1220c82?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                       className="card-img-top" alt="Kitchen" />
                  <div className="card-body">
                    <h5 className="card-title fw-bold">Kitchen Dashboard</h5>
                    <p className="card-text">View pending orders and update their status in real-time.</p>
                    <a href="/kitchen/orders" className="btn btn-outline-warning">Go to Kitchen</a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Footer */}
      
    </div>
  );
};

export default Home;