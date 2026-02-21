import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Layout/Routes/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import Hero from "./Hero";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loding, setLoading] = useState(false);

  const navigate = useNavigate();
  const { addToCart } = useCart();

  // get Products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/product-list/1?limit=9`,
      );
      setLoading(false);
      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, []);

  // getAllCategories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // get total product count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //Load More
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/product-list/${page}?limit=3`,
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //filter By category
  const handleCategoryFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //get Filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked, // selected categories
        radio, // selected price range
      });

      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Products - Best offers"}>
    <div className="mt-24">
        <Hero />
        
      </div>
      <div className="container-fluid p-4">
        <div className="row">
          <div className="col-md-3 ">
            {" "}
            <h4 className="text-center">Filter By Category</h4>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) =>
                    handleCategoryFilter(e.target.checked, c._id)
                  }
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            {/* price filter */}
            <h4 className="text-center mt-4">Filter By Price</h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column mt-2">
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
              >
                Reset Filters
              </button>
            </div>
          </div>
          <div className="col-md-9">
            <div className="text-center">
              <h1>All Products</h1>
            </div>

            <div className="d-flex flex-wrap mt-2 gap-4">
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
                      <button
                        className="btn btn-secondary ms-1"
                        onClick={() => addToCart(p)}
                      >
                        Add To CART
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loding ? "Loading ..." : "Loadmore"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
