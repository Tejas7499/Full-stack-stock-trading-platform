import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("token")
    )

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("useremail");

        setIsLoggedIn(false);

        window.location.href  = "/";
    }
    return (
        <nav
        className="navbar navbar-expand-lg border-bottom"
        style={{ backgroundColor: "#fff" }}
        >
        <div className="container">
            <Link className="nav-link active" to="/">
            <img
                src="media/images/logo.svg"
                alt="logo"
                style={{ width: "25%" }}
            />
            </Link>

            <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
            <span className="navbar-toggler-icon"></span>
            </button>

            <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
            ></div>

            <div className="d-flex">
            <ul className="navbar-nav mb-lg-0">

                <li className="nav-item">
                <Link className="nav-link active" to="/about">
                    About
                </Link>
                </li>

                <li className="nav-item">
                <Link className="nav-link active" to="/products">
                    Products
                </Link>
                </li>

                <li className="nav-item">
                <Link className="nav-link active" to="/pricing">
                    Pricing
                </Link>
                </li>

                <li className="nav-item">
                <Link className="nav-link active" to="/support">
                    Support
                </Link>
                </li>
                {isLoggedIn ? (
                <>
                    <li className="nav-item">
                    <button
                        className="nav-link active btn btn-link"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                    </li>

                    <li className="nav-item">
                    <span className="nav-link active">
                        <i class="fa-regular fa-circle-user" style={{ fontSize: "1.25rem" }}></i>
                    </span>
                    </li>
                </>
                ) : (
                <li className="nav-item">
                    <Link className="nav-link active" to="/signup">
                    Signup
                    </Link>
                </li>
                )}

            </ul>
            </div>
        </div>
        </nav>
    );
}

export default Navbar;