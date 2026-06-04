import "./Signup.css";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:3002/signup",
        inputValue,
        { withCredentials: true }
      );

      console.log(data);

      if (data.success) {
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">

        <div className="signup-header">
          <h1>Create Account</h1>
          <p>Start your stock trading journey</p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="signup-btn">
            Create Account
          </button>
        </form>

        <div className="login-link">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </div>

      </div>
    </div>
  );
};

export default Signup;