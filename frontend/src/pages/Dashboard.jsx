import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
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
            const res = await axios.get(
                "http://127.0.0.1:8000/api/products/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setProducts(res.data);
        } catch (err) {
            console.log(err.response?.data);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // 🔹 Add Product
    const handleAddProduct = async () => {
        try {
            await axios.post(
                "http://127.0.0.1:8000/api/products/",
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
            alert("Error adding product ❌");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("access");
        window.location.href = "/";
    };

    return (
        <div style={{ padding: "40px" }}>
            <h2>Dashboard</h2>

            <button onClick={handleLogout}>Logout</button>

            <hr />

            <h3>Add Product</h3>

            <input
                placeholder="Product Title"
                value={formData.title}
                onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                }
            />

            <input
                placeholder="Product URL"
                value={formData.url}
                onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                }
            />

            <input
                placeholder="Current Price"
                type="number"
                value={formData.current_price}
                onChange={(e) =>
                    setFormData({ ...formData, current_price: e.target.value })
                }
            />

            <input
                placeholder="Target Price"
                type="number"
                value={formData.target_price}
                onChange={(e) =>
                    setFormData({ ...formData, target_price: e.target.value })
                }
            />

            <button onClick={handleAddProduct}>Add Product</button>

            <hr />

            <h3>Your Products</h3>

            {products.length === 0 ? (
                <p>No products added yet.</p>
            ) : (
                products.map((product) => (
                    <div
                        key={product.id}
                        style={{
                            border: "1px solid #ddd",
                            padding: "10px",
                            marginBottom: "10px",
                            borderRadius: "8px",
                        }}
                    >
                        <h4>{product.title}</h4>
                        <p>Current Price: ₹{product.current_price}</p>
                        <p>Target Price: ₹{product.target_price}</p>
                        <a href={product.url} target="_blank">
                            View Product
                        </a>
                    </div>
                ))
            )}
        </div>
    );
}

export default Dashboard;