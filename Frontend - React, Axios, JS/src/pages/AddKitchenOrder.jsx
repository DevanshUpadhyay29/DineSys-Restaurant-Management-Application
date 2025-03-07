import { useState, useEffect } from "react";
import axios from "axios";

const AddKitchenOrder = () => {
  const [tableId, setTableId] = useState("");
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [allDishes, setAllDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch all dish names from the backend with token in headers
    const fetchDishes = async () => {
      try {
        const response = await axios.get("http://localhost:8087/api/user/orders/dish", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAllDishes(response.data);
      } catch (error) {
        console.error("Failed to fetch dishes:", error);
      }
    };

    fetchDishes();
  }, [token]);

  const handleDishChange = (event) => {
    const value = event.target.value;
    setSelectedDishes((prevSelectedDishes) =>
      prevSelectedDishes.includes(value)
        ? prevSelectedDishes.filter((dish) => dish !== value)
        : [...prevSelectedDishes, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tableId || selectedDishes.length === 0) {
      setError("All fields are required!");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    const orderData = {
      tableId: parseInt(tableId),
      dishName: selectedDishes.join(", "),
      username: "On-The-House", // Always sending this value
    };

    try {
      const response = await axios.post(
        "http://localhost:8087/api/kitchen/orders",
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(`Order Placed! Order ID: ${response.data.id}`);
      setTableId("");
      setSelectedDishes([]);
    } catch (err) {
      setError(err.response ? err.response.data : "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ minHeight: '58.6vh' }}>
      <h2 className="text-center mb-4">Add Kitchen Order</h2>
      <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          {message && <div className="alert alert-success">{message}</div>}

          <div className="mb-3">
            <label className="form-label">Table Number</label>
            <input
              type="number"
              className="form-control"
              value={tableId}
              onChange={(e) => setTableId(e.target.value)}
              placeholder="Enter Table Number"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Order Details</label>
            <div className="form-control" style={{ height: "auto" }}>
              {allDishes.map((dish) => (
                <div key={dish} className="form-check">
                  <input
                    type="checkbox"
                    value={dish}
                    checked={selectedDishes.includes(dish)}
                    onChange={handleDishChange}
                    className="form-check-input"
                  />
                  <label className="form-check-label">{dish}</label>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddKitchenOrder;