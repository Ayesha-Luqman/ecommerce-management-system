import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post("token/", {
                username,
                password,
            });

            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);

            alert("Login Successful!");

            navigate("/products");

        } catch (error) {

            alert("Invalid Username or Password");

        }

    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="form-card shadow p-4">

                        <div className="card-body">

                            <h3 className="text-center mb-2 fw-bold">
                                🔐 Login
                            </h3>

                            <p className="text-center text-muted mb-4">
    Login to continue shopping
</p>

                            <form onSubmit={handleLogin}>

                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />

                                <input
                                    type="password"
                                    className="form-control mb-3"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <button className="btn btn-primary-custom w-100">
                                    Login
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );

}

export default Login;