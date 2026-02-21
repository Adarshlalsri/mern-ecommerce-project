import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Policy from "./Pages/Policy";
import PagenotFound from "./Pages/PagenotFound";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Dashboard from "./Pages/user/Dashboard";
import PrivateRoute from "./components/Layout/Routes/Private";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import AdminRoute from "./components/Layout/Routes/AdminRoute";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import CreateCategory from "./Pages/Admin/CreateCategory";
import CreateProduct from "./Pages/Admin/CreateProduct";
import Users from "./Pages/Admin/Users";
import Profile from "./Pages/user/Profile";
import Order from "./Pages/user/Order";
import Products from "./Pages/Admin/Products";
import UpdateProduct from "./Pages/Admin/UpdateProduct";
import Search from "./Pages/Search";
import ProductDetails from "./Pages/ProductDetails";
import Categories from "./Pages/Categories";
import CategoryProduct from "./Pages/CategoryProduct";
import CartPage from "./Pages/CartPage";
import AdminOrders from "./Pages/Admin/AdminOrders";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/category/:slug" element={<CategoryProduct />} />
      <Route path="/search" element={<Search />} />
      <Route path="/cart" element={<CartPage />} />
      {/* ✅ Private Route Wrapper */}
      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="user" element={<Dashboard />} />
        <Route path="user/profile" element={<Profile />} />
        <Route path="user/orders" element={<Order />} />
      </Route>
      {/* ✅ Admin  Route Wrapper */}
      <Route path="/dashboard" element={<AdminRoute />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/create-category" element={<CreateCategory />} />
        <Route path="admin/create-product" element={<CreateProduct />} />
        <Route path="admin/products" element={<Products />} />
        <Route path="admin/update-product/:slug" element={<UpdateProduct />} />
        <Route path="admin/users" element={<Users />} />
        <Route path="admin/orders" element={<AdminOrders />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/*" element={<PagenotFound />} />
    </Routes>
  );
};

export default App;
