import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API;
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./style.css";
import { AuthProvider } from "./context/auth";
import "antd/dist/reset.css"; // latest reset style (Ant Design v5+)
import { SearchProvider } from "./context/search";
import { CartProvider } from "./context/cart";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

ReactDOM.createRoot(document.getElementById("app")).render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>,
);
