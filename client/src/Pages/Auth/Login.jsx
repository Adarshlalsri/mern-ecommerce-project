// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Layout from "../../components/Layout/Layout";
// import { toast } from "react-toastify";
// import axios from "axios";
// import "../../style/AuthStyle.css";
// import { useAuth } from "../../context/auth";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [auth, setAuth] = useAuth();

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("/api/v1/auth/login", {
//         email,
//         password,
//       });

//       if (res && res.data.success) {
//         toast.success("Login Successfully");
//         setAuth({
//           ...auth,
//           user: res.data.user,
//           token: res.data.token,
//         });
//         localStorage.setItem("auth", JSON.stringify(res.data));
//         setTimeout(() => {
//           navigate("/");
//         }, 1000);
//       } else {
//         toast.error(res.data.message || "Login failed");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong during login");
//     }
//   };

//   return (
//     <Layout title="Login - Ecommerce app">
//       <div className="form-container">
//         <form onSubmit={handleSubmit} className="mt-2 mb-2">
//           <h4 className="title">Login Form</h4>

//           {/* Email */}
//           <div className="mb-3">
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="form-control"
//               id="email"
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div className="mb-3">
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="form-control"
//               id="password"
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           {/* Submit */}

//           <button type="submit" className="btn btn-primary ">
//             Login
//           </button>
//         </form>
//       </div>
//     </Layout>
//   );
// };

// export default Login;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Layout from "../../components/Layout/Layout";
// import { toast } from "react-toastify";
// import axios from "axios";
// import "../../style/AuthStyle.css";
// import { useAuth } from "../../context/auth";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [auth, setAuth] = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("/api/v1/auth/login", {
//         email,
//         password,
//       });

//       if (res && res.data.success) {
//         toast.success("Login Successfully");

//         const userData = {
//           user: res.data.user,
//           token: res.data.token,
//         };

//         setAuth(userData);
//         localStorage.setItem("auth", JSON.stringify(userData));
//         // ✅ Don't navigate here; use useEffect instead
//       } else {
//         toast.error(res.data.message || "Login failed");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong during login");
//     }
//   };

//   // ✅ Redirect after auth.user is set
//   useEffect(() => {
//     if (auth?.user) {
//       navigate("/");
//     }
//   }, [auth?.user, navigate]);

//   return (
//     <Layout title="Login - Ecommerce app">
//       <div className="form-container">
//         <form onSubmit={handleSubmit}>
//           <h4 className="title">Login Form</h4>

//           <div className="mb-3">
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="form-control"
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="form-control"
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           <button type="submit" className="btn btn-primary">
//             Login
//           </button>
//         </form>
//       </div>
//     </Layout>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import "../../style/AuthStyle.css";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });

      if (res && res.data.success) {
        const userData = {
          user: res.data.user,
          token: res.data.token,
        };

        setAuth(userData);
        localStorage.setItem("auth", JSON.stringify(userData));

        // ✅ Show toast and navigate after slight delay
        toast.success("Login Successfully");

        // Delay to allow toast to appear before redirect
        setTimeout(() => {
          navigate(location.state || "/");
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
    <Layout title="Login - Ecommerce app">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">Login Form</h4>

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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
          {/* 🔗 Forgot Password Link */}
          <div className="mt-3 text-center">
            <Link to="/forgot-password" className="text-primary">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
