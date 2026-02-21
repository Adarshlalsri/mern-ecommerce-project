import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();

  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // ✅ useEffect to load user data into form fields
  useEffect(() => {
    if (auth?.user) {
      const { email, name, phone, address } = auth?.user;

      setName(name);
      setEmail(email);
      setPhone(phone);
      setAddress(address);
    }
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "/api/v1/auth/profile",
        {
          name,
          email,
          password,
          phone,
          address,
        },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );

      if (data?.error) {
        console.log(error);
        toast.error("Something went wrong");
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("profile updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong during registration");
    }
  };

  return (
    <Layout title={"Dashboard - Your Profile "}>
      <div className="container-fluid p-5 ">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container">
              <div>
                <form onSubmit={handleSubmit} className="mt-4 mb-4">
                  <h4 className="title">USER PROFILE</h4>
                  {/* Name */}
                  <div className="mb-3">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                      id="name"
                      placeholder="Enter your name"
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
                    />
                  </div>

                  {/* Submit */}

                  <button type="submit" className="btn btn-primary ">
                    UPDATE
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
