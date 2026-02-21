import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charset="UTF-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>{children}</main>
      <ToastContainer position="top-right" autoClose={5000} />
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecommerce app - Shop now",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "Adarsh Srivastava",
};

export default Layout;
