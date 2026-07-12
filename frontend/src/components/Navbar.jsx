import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

   const handleLogout = () => {

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    alert("Logged Out Successfully");

    navigate("/login");

}; 

    return (
        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
            <div className="container">

                <Link className="navbar-brand" to="/">
                    🛒 Ecommerce
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">

                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/products">
                                Products
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">
                                Cart
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/orders">
                                Orders
                            </Link>
                        </li>

                        {localStorage.getItem("access") ? (

    <>
        <li className="nav-item">

            <button
                className="btn btn-light ms-2"
                onClick={handleLogout}
            >
                Logout
            </button>

        </li>
    </>

) : (

    <>
        <li className="nav-item">

            <Link className="nav-link" to="/login">
                Login
            </Link>

        </li>

        <li className="nav-item">

            <Link className="nav-link" to="/register">
                Register
            </Link>

        </li>
    </>

)}
                    </ul>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;