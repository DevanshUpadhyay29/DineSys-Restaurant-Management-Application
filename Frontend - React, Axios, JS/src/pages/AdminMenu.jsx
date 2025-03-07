// 


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";

const AdminMenu = () => {
    const [menu, setMenu] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [currentDish, setCurrentDish] = useState({ id: "", name: "", price: "", category: "" });
    const [newDish, setNewDish] = useState({ dishName: "", price: "", category: "NORTH_INDIAN" });

    // Fetch menu items from the backend
    useEffect(() => {
        fetchMenu();
    }, []);

    // Function to get JWT token from localStorage
    const getAuthHeaders = () => {
        const token = localStorage.getItem("token"); 
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    };

    const fetchMenu = async () => {
        try {
            const response = await axios.get("http://localhost:8087/api/admin", getAuthHeaders());
            setMenu(response.data);
        } catch (error) {
            console.error("Error fetching menu:", error);
        }
    };

    // Handle delete functionality
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8087/api/admin/${id}`, getAuthHeaders());
            fetchMenu(); // Refresh the menu list after deletion
        } catch (error) {
            console.error("Error deleting dish:", error);
        }
    };

    // Handle edit button click (opens modal)
    const handleEdit = (dish) => {
        setCurrentDish(dish);
        setShowModal(true);
    };

    // Handle update functionality
    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:8087/api/admin/${currentDish.id}`, currentDish, getAuthHeaders());
            setShowModal(false);
            fetchMenu(); // Refresh the menu list after update
        } catch (error) {
            console.error("Error updating dish:", error);
        }
    };

    // Handle add dish functionality
    const handleAddDish = async () => {
        try {
            await axios.post("http://localhost:8087/api/admin", newDish, getAuthHeaders());
            setShowAddModal(false);
            fetchMenu();
            setNewDish({ dishName: "", price: "", category: "NORTH_INDIAN" });
        } catch (error) {
            console.error("Error adding dish:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Admin Menu</h2>
            <Button variant="primary" onClick={() => setShowAddModal(true)} className="mb-3">
                Add Dish
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Dish Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {menu.map((dish) => (
                        <tr key={dish.id}>
                            <td>{dish.id}</td>
                            <td>{dish.dishName}</td>
                            <td>₹ {dish.price}</td>
                            <td>{dish.category}</td>
                            <td>
                                <Button variant="warning" className="me-2" onClick={() => handleEdit(dish)}>
                                    Edit
                                </Button>
                                <Button variant="danger" onClick={() => handleDelete(dish.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Edit Dish Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Dish</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Dish Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={currentDish.dishName}
                                onChange={(e) => setCurrentDish({ ...currentDish, dishName: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                value={currentDish.price}
                                onChange={(e) => setCurrentDish({ ...currentDish, price: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Add Dish Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Dish</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Dish Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={newDish.dishName}
                                onChange={(e) => setNewDish({ ...newDish, dishName: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                value={newDish.price}
                                onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                value={newDish.category}
                                onChange={(e) => setNewDish({ ...newDish, category: e.target.value })}
                            >
                                <option value="NORTH_INDIAN">NORTH INDIAN</option>
                                <option value="SOUTH_INDIAN">SOUTH INDIAN</option>
                                <option value="CHINESE">CHINESE</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddDish}>
                        Add Dish
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminMenu;







