import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../components/Footer";

const PlaceOrder = () => {
  const [tableNumber, setTableNumber] = useState("");
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [allDishes, setAllDishes] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Fetch all dish names from the backend with token in headers
    const fetchDishes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8087/api/user/orders/dish", {
          headers: { Authorization: token },
        });
        setAllDishes(response.data);
      } catch (error) {
        console.error("Failed to fetch dishes:", error);
      }
    };

    fetchDishes();
  }, []);

  const handleDishChange = (event) => {
    const value = event.target.value;
    setSelectedDishes(prevSelectedDishes =>
      prevSelectedDishes.includes(value)
        ? prevSelectedDishes.filter(dish => dish !== value)
        : [...prevSelectedDishes, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const token = localStorage.getItem("token");
      const dishNameString = selectedDishes.join(", ");
      await axios.post(
        "http://localhost:8087/api/user/orders",
        {
          tableId: tableNumber,
          dishName: dishNameString,
          username: localStorage.getItem("username") || "Devansh",
        },
        { headers: { Authorization: token } }
      );
      setMessage({ type: "success", text: "Order placed successfully!" });
      setTableNumber("");
      setSelectedDishes([]);
    } catch (error) {
      setMessage({ type: "error", text: "Failed to place order." });
    }
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
          <h2 className="text-center mb-4">Place Order</h2>
          {message && (
            <div className={`alert ${message.type === "error" ? "alert-danger" : "alert-success"} text-center`}>
              {message.text}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Table Number:</label>
              <input
                type="number"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="form-control"
                required
                placeholder="Enter your table number"
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Order Details:</label>
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
            <button type="submit" className="btn btn-primary w-100">
              Place Order
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
