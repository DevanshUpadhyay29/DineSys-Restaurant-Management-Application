import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../components/Footer";

const UserMenu = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8087/api/user/orders/menu", {
        headers: { Authorization: token },
      })
      .then((response) => {
        setMenu(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="alert alert-info text-center">Loading menu...</div>;
  if (error) return <div className="alert alert-danger text-center">Error: {error}</div>;

  return (
    <>
    <div className="container mt-4">
      <h2 className="text-center mb-4">Restaurant Menu</h2>
      <div className="table-responsive">
        <table className="table table-hover table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>Dish Name</th>
              <th>Price (₹)</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item) => (
              <tr key={item.id}>
                <td>{item.dishName}</td>
                <td>{item.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
</>
  );
};

export default UserMenu;
