// import React from 'react'
// import Layout from '../components/Layout/Layout'

// import useCategory from '../hooks/useCategory';
// import { Link } from 'react-router-dom';

// const Categories = () => {
//     const Categories = useCategory();
//   return (
//     <Layout title={'All Categories'}>
//     <div className='container-fluid p-0 pb-4'>
//      <div style={{ position:"relative" , width: "100%", height: "300px" }}>
//           {/* Banner Image */}
//           <img
//             src="/images/Ban3.webp"
//             alt="Banner"
//             style={{
//               width: "100%",
//               height: "100%",
//               objectFit: "cover",
//             }}
//           />

//           {/* Text on Image */}
//           <div
//             style={{
//               position: "absolute",
//               top: "40%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               color: "white",
//               textAlign: "center",
//             }}
//           >
//             <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>
//               All Categories
//             </h1>

//           </div>
//         </div>

//     <div className="row p-4">
//     {Categories.map((c)=>(
//         <div className='col-md-6 mt-5 mb-3 gx-3 gy-3'>
//         <Link className="btn btn-primary" to={`/category/${c.slug}`}>
//         {c.name}
//         </Link>
//         </div>
//     ))}

//     </div>
//     </div>

//     </Layout>
//   )
// }

// export default Categories

import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      {/* ===== Banner ===== */}
      <div className="container-fluid p-0">
        <div style={{ position: "relative", width: "100%", height: "300px" }}>
          <img
            src="/images/Ban3.webp"
            alt="Banner"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
              textAlign: "center",
            }}
          >
            <h1 style={{ fontSize: "48px" }}>All Categories</h1>
          </div>
        </div>
      </div>

      {/* ===== Categories Grid ===== */}
      <div className="container my-5">
        <div className="row g-4">
          {categories.map((c) => (
            <div key={c._id} className="col-lg-4 col-md-6 col-sm-12">
              <Link to={`/category/${c.slug}`} className="text-decoration-none">
                <div
                  className="card h-100 border-0 shadow-sm"
                  style={{ overflow: "hidden" }}
                >
                  {/* Category Image */}
                  <img
                    src={`/images/${c.slug}.png`}
                    alt={c.name}
                    style={{
                      height: "270px",
                      objectFit: "cover",
                      width: "100%",
                    }}
                  />

                  {/* Category Name */}
                  <div className="card-body text-center">
                    <h4 className="text-dark text-capitalize">{c.name}</h4>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
