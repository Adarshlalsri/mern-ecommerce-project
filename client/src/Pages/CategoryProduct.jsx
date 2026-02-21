import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const getProductByCategory = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`,
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProductByCategory();
  }, [params?.slug]);

  return (
    <Layout>
      <div className="container-fluid p-0 pb-4 ">
        <div style={{ position:"relative" , width: "100%", height: "300px" }}>
          {/* Banner Image */}
          <img
            src="/images/ban8.jpg"
            alt="Banner"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* Text on Image */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
              textAlign: "center",
            }}
          >
            <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>
              {category?.name}
            </h1>
            
          </div>
        </div>

       
        <p
          style={{
          position:"relative",
            textAlign: "center",
            marginBottom: "30px",
            marginTop: "50px"
          }}
        >
          {products?.length} result found
        </p>
        <div className="row">
          <div className="d-flex mt-2 gap-4 justify-content-center">
            {products?.map((p) => (
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt="photo"
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title">₹{p.price}</h5>
                  <p>{p.description.split(" ").slice(0, 10).join(" ")}...</p>
                  <div>
                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button className="btn btn-secondary ms-1">
                      Add To CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
