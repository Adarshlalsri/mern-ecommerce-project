import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import "../../style/AuthStyle.css";
import { useAuth } from "../../context/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });

      if (res && res.data.success) {
        toast.success("Password update Successfully");

        // Delay to allow toast to appear before redirect
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong during login");
    }
  };

  return (
    <Layout title="Forgot Password - Ecommerce app">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">Reset Paswword</h4>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              placeholder="Enter your secret answer"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setnewPassword(e.target.value)}
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Reset
          </button>

          <p className="mt-3">
            Remembered your password? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
