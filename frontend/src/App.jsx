import { useState } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function AuthPage() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async () => {
        try {
            if (isLogin) {
                const res = await axios.post(
                    "http://127.0.0.1:8000/api/token/",
                    {
                        username: formData.email,
                        password: formData.password,
                    }
                );

                localStorage.setItem("access", res.data.access);
                localStorage.setItem("user_email", formData.email);

                alert("Login Successful ✅");

                // 🔥 Redirect here
                navigate("/dashboard");
            } else {
                await axios.post(
                    "http://127.0.0.1:8000/api/accounts/register/",
                    {
                        username: formData.email,
                        email: formData.email,
                        password: formData.password,
                    }
                );

                alert("Signup Successful ✅");
                setIsLogin(true);
            }
        } catch (error) {
            console.log(error.response?.data);
            alert("Something went wrong ❌");
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Price Tracker</h2>

                <h3>{isLogin ? "Login" : "Signup"}</h3>

                <input
                    type="email"
                    placeholder="Enter Email"
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                    }
                />

                <button onClick={handleSubmit}>
                    {isLogin ? "Login" : "Signup"}
                </button>

                <p className="switch-text">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <span onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? " Sign up" : " Login"}
                    </span>
                </p>
            </div>
        </div>
    );
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
}

export default App;