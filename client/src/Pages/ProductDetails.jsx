import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const [product, setProducts] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  const params = useParams();

  //inital product detail
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //get products
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/getSingle-product/${params.slug}`
      );
      setProducts(data?.products);
      getSimilarProduct(data?.products._id, data?.products.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container-fluid p-4">
        <div className="row mt-3 d-flex justify-content-center ">
          <div className="col-md-4">
            <div className="card" style={{ width: "25rem" }}>
              <img
                src={`/api/v1/product/product-photo/${product._id}`}
                className="card-img-top"
                alt={product.name}
              />
            </div>
          </div>
          <div className="col-md-6 ">
            <h1 className="text-center">Product detail</h1>
            <h5>{product.name}</h5>
            <h6>{product.description}</h6>
            <h5>₹{product.price}</h5>
            <h5>{product?.category?.name}</h5>
            <button className="btn btn-secondary w-100 ms-1">
              Add To CART
            </button>
          </div>
        </div>
        <hr className="mt-5"/>
        <div className="row">
          <h3 className="text-center">Similar Product</h3>
          {relatedProducts.length < 1 && <p>No similar Products found</p>}
          <div className="d-flex flex-wrap mt-2 gap-4">
            {relatedProducts?.map((p) => (
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
                    <button className="btn btn-secondary w-100 ms-1">
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

export default ProductDetails;
