import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminMenu from "./pages/AdminMenu";
import UserMenu from "./pages/UserMenu";
import PlaceOrder from "./pages/PlaceOrder";
import TrackOrder from "./pages/TrackOrder";
import KitchenOrders from "./pages/KitchenOrders";
import AddKitchenOrder from "./pages/AddKitchenOrder";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Logout from "./pages/Logout";

const AppRouter = () => {
  return (
    <Router>
      <Layout>
        <Routes>

      <Route exact path="/" element={<Home />} />


        {/* Admin Routes */}
        <Route path="/admin/menu" element={<AdminMenu/>} />
       
          {/* User Routes */}
          <Route path="/user/menu" element={<UserMenu/>} />
          <Route path="/user/order" element={<PlaceOrder/>} />
          <Route path="/user/status" element={<TrackOrder/>} />

          {/* Kitchen Routes */}
          <Route path="/kitchen/orders" element={<KitchenOrders/>} />
          <Route path="/kitchen/add-order" element={<AddKitchenOrder/>} />

          {/* Authentication Routes */}
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/logout" element={<Logout/>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRouter;