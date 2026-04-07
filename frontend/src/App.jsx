import { useState } from "react";
import axios from "axios";
import api from "./api";
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
                const res = await api.post(
                    "/api/token/",
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
                await api.post(
                    "/api/accounts/register/",
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
        <div className="auth-bg d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-5" style={{ width: "400px", borderRadius: "15px" }}>
                <h2 className="text-center mb-4 text-dark fw-bold">Price Tracker</h2>

                <h4 className="text-center mb-4 text-secondary">{isLogin ? "Login" : "Signup"}</h4>

                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Enter Email"
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Enter Password"
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                    />
                </div>

                <button className="btn btn-primary btn-lg w-100 mt-2 rounded-pill" onClick={handleSubmit}>
                    {isLogin ? "Login" : "Signup"}
                </button>

                <div className="switch-text mt-4 text-center">
                    <span className="text-muted">{isLogin ? "Don't have an account? " : "Already have an account? "}</span>
                    <span 
                        className="text-primary fw-bold" 
                        style={{ cursor: "pointer" }} 
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? "Sign up" : "Login"}
                    </span>
                </div>
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