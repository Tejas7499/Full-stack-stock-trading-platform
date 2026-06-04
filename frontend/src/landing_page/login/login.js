import "./login.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:3002/login",
        inputValue,
        { withCredentials: true }
      );

      if (data.success) {
        window.location.href = "http://localhost:3001";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <p>Access your trading dashboard</p>

        <form onSubmit={handleLogin}>
          <input
            className="login-input"
            type="email"
            placeholder="Enter email"
            onChange={(e) =>
              setInputValue({
                ...inputValue,
                email: e.target.value,
              })
            }
          />

          <input
            className="login-input"
            type="password"
            placeholder="Enter password"
            onChange={(e) =>
              setInputValue({
                ...inputValue,
                password: e.target.value,
              })
            }
          />

          <button className="login-btn" type="submit">
            Login
          </button>
        </form>

        <div className="signup-link">
          <p>
            Don’t have an account? <Link to="/signup">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;