import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";

const Search = () => {
  const [values,setValues] = useSearch();

  return (
    <Layout title={"search-results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values.results && values.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
        </div>

        {/* Card Layout */}
        <div className="d-flex mt-2 gap-4 flex-wrap">
          {values.results?.map((p) => (
            <div className="card" style={{ width: "18rem" }} key={p._id}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <h5 className="card-title">₹{p.price}</h5>
                <p>{p.description.split(" ").slice(0, 10).join(" ")}...</p>
                <div>
                  <button className="btn btn-primary ms-1">More Details</button>
                  <button className="btn btn-secondary ms-1">
                    Add To CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
