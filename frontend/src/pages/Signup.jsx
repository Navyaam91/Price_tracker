import { useState } from "react";
import API from "../api";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            await API.post("register/", {
                email,
                password,
            });

            alert("Signup Successful! Please Login");
        } catch (error) {
            console.log(error.response.data);
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <input
                    type="email"
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <input
                    type="password"
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button type="submit">Signup</button>
            </form>
        </div>
    );
}

export default Signup;