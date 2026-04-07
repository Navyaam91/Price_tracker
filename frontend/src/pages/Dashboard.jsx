import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        url: "",
        current_price: "",
        target_price: "",
    });

    const token = localStorage.getItem("access");

    // 🔹 Fetch Products
    const fetchProducts = async () => {
        try {
            const res = await api.get(
                "/api/products/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setProducts(res.data);
        } catch (err) {
            console.log(err.response?.data);
            if (err.response?.status === 401) {
                alert("Session expired. Please log in again.");
                localStorage.removeItem("access");
                navigate("/");
            }
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // 🔹 Add Product
    const handleAddProduct = async () => {
        try {
            await api.post(
                "/api/products/",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Product Added ✅");
            fetchProducts(); // refresh list

            setFormData({
                title: "",
                url: "",
                current_price: "",
                target_price: "",
            });
        } catch (err) {
            console.log(err.response?.data);
            if (err.response?.status === 401) {
                alert("Session expired. Please log in again.");
                localStorage.removeItem("access");
                navigate("/");
            } else {
                alert("Error adding product ❌");
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("access");
        navigate("/");
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Dashboard</h2>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>

            <div className="card shadow-sm mb-4">
                <div className="card-header bg-primary text-white">
                    <h3 className="h5 mb-0">Add Product</h3>
                </div>
                <div className="card-body">
                    <div className="row g-3">
                        <div className="col-md-6">
                            <input
                                className="form-control"
                                placeholder="Product Title"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({ ...formData, title: e.target.value })
                                }
                            />
                        </div>
                        <div className="col-md-6">
                            <input
                                className="form-control"
                                placeholder="Product URL"
                                value={formData.url}
                                onChange={(e) =>
                                    setFormData({ ...formData, url: e.target.value })
                                }
                            />
                        </div>
                        <div className="col-md-6">
                            <input
                                className="form-control"
                                placeholder="Current Price"
                                type="number"
                                value={formData.current_price}
                                onChange={(e) =>
                                    setFormData({ ...formData, current_price: e.target.value })
                                }
                            />
                        </div>
                        <div className="col-md-6">
                            <input
                                className="form-control"
                                placeholder="Target Price"
                                type="number"
                                value={formData.target_price}
                                onChange={(e) =>
                                    setFormData({ ...formData, target_price: e.target.value })
                                }
                            />
                        </div>
                        <div className="col-12 mt-3 text-end">
                            <button className="btn btn-success" onClick={handleAddProduct}>Add Product</button>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="my-4" />

            <h3 className="mb-3">Your Products</h3>

            {products.length === 0 ? (
                <div className="alert alert-info">No products added yet.</div>
            ) : (
                <div className="row g-4">
                    {products.map((product) => (
                        <div key={product.id} className="col-md-4">
                            <div className="card shadow-sm h-100">
                                <div className="card-body">
                                    <h5 className="card-title fw-bold text-primary">{product.title}</h5>
                                    <p className="card-text mb-1"><span className="text-muted">Current Price:</span> ₹{product.current_price}</p>
                                    <p className="card-text mb-2"><span className="text-muted">Target Price:</span> <span className="text-success fw-bold">₹{product.target_price}</span></p>
                                </div>
                                <div className="card-footer bg-white border-top-0 pt-0">
                                    <a href={product.url} className="btn btn-outline-primary w-100" target="_blank" rel="noopener noreferrer">
                                        View Product
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dashboard;