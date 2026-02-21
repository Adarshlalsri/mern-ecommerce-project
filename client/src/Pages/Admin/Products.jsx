"use client";

import { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProduct] = useState([]);

  // get All Products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      if (data?.success) {
        setProduct(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("data not get");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container-fluid  p-5">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products List</h1>
            <div className="d-flex flex-wrap m-2 gap-4">
              {products?.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/update-product/${p.slug}`}
                  className="product-link"
                >
                  <div className="card" style={{ width: "18rem" }}>
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt="photo"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <h5 className="card-title">₹{p.price}</h5>
                      {p.description.split(" ").slice(0, 10).join(" ")}...
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
