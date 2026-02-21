import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import "../../style/AuthStyle.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });

      if (res && res.data.success) {
        toast.success("Registered Successfully");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(res.data.message || "Registration failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong during registration");
    }
  };

  return (
    <Layout title="Register - Ecommerce app">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="mt-4 mb-4">
          <h4 className="title">Register Form</h4>
          {/* Name */}
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="name"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-3">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="phone"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Address */}
          <div className="mb-3">
            <input
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              id="address"
              rows="3"
              placeholder="Enter your address"
              required
            />
          </div>

          {/* Answer */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              id="answer"
              placeholder="What was the name of your first school?"
              required
            />
          </div>

          {/* Submit */}

          <button type="submit" className="btn btn-primary ">
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
