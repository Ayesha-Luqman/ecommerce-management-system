import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        phone: "",
        address: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("register/", formData);

            alert("Registration Successful!");

            navigate("/login");

        } catch (error) {

            alert("Registration Failed!");

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="form-card shadow p-4">

                        <div className="card-body">

                            <h3 className="text-center mb-2 fw-bold">
                                📝 Register
                            </h3>

                            <p className="text-center text-muted mb-4">
                                Create your account to start shopping
                            </p>

                            <form onSubmit={handleSubmit}>

                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    className="form-control mb-3"
                                    onChange={handleChange}
                                />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="form-control mb-3"
                                    onChange={handleChange}
                                />

                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="form-control mb-3"
                                    onChange={handleChange}
                                />

                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone"
                                    className="form-control mb-3"
                                    onChange={handleChange}
                                />

                                <textarea
                                    name="address"
                                    placeholder="Address"
                                    className="form-control mb-3"
                                    rows="3"
                                    onChange={handleChange}
                                ></textarea>

                                <button className="btn btn-success-custom w-100">
                                    Register
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;