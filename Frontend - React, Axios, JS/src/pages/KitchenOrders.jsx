import { useEffect, useState } from "react";
import axios from "axios";

const KitchenOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  
  // Fetch pending orders
  const fetchOrders = () => {
    if (!token) {
      setError("User not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:8087/api/kitchen/pending-orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response ? err.response.data : err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status
  const updateOrderStatus = (id, status) => {
    const url = status === "Preparing Food"
      ? `http://localhost:8087/api/kitchen/updateAs-Preparing/${id}`
      : `http://localhost:8087/api/kitchen/updateAs-Served/${id}`;

    axios
      .put(url, {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        fetchOrders(); // Refresh the table after status update
      })
      .catch((err) => {
        console.error("Error updating status:", err);
      });
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-danger" style={{minHeight:"62.9dvh"}}>Error: {error}</p>;

  

  return (
    <div className="container mt-4" >
      <h2 className="text-center mb-4">Kitchen Orders</h2>
      {orders.length === 0 ? (
        <div style={{minHeight:"100dvh"}}>
            <p className="text-center">No pending orders.</p>
        </div>
      ) : (
        <div className="table-responsive" style={{minHeight:"52dvh"}}>
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>Table Number</th>
                <th>Dish Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.tableId}</td>
                  <td>{order.dishName}</td>
                  <td>{order.status}</td>
                  <td>
                    {order.status === "Accepted" && (
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => updateOrderStatus(order.id, "Preparing Food")}
                      >
                        Mark as Preparing
                      </button>
                    )}
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => updateOrderStatus(order.id, "Served")}
                    >
                      Mark as Served
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default KitchenOrders;