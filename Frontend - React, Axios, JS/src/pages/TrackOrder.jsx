import { useEffect, useState } from "react";
import axios from "axios";

const TrackOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    // Debugging logs
    console.log("Username:", username);
    console.log("Token:", token);
    if (!username || !token) {
      setError("User not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:8087/api/user/orders/by-username/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setOrders(response.data);
        console.log(response.data)
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response ? err.response.data : err.message);
        setLoading(false);
      });
  }, []); // Only run once when the component mounts

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500" style={{minHeight:"55dvh"}}>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4" style={{minHeight:"62.9dvh"}}>
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <div className="table-responsive height-100">No orders found.</div>
      ) : (
        <div className="container mt-4" style={{minHeight:'44dvh'}}>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Table Number</th>
                  <th>Dish Name</th>
                  <th>Status</th>
                  <th>Customer Name</th>
                </tr>
              </thead>
              <tbody>
                {
                  orders.map(order => {
                    const { dishName, id, status, tableId, username } = order;
                    return (
                      <tr key={id}>
                        <td>{id}</td>
                        <td>{tableId}</td>
                        <td>{dishName}</td>
                        <td>{status}</td>
                        <td>{username}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>

      )}
    </div>
  );
};

export default TrackOrder;
