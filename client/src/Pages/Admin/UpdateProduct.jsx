// import React, { useState, useEffect } from "react";
// import AdminMenu from "../../components/Layout/AdminMenu";
// import Layout from "../../components/Layout/Layout";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { Select } from "antd";
// import { useAuth } from "../../context/auth";
// import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// const { Option } = Select;

// const UpdateProduct = () => {
//   const [categories, setCategories] = useState([]);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState(""); // category _id
//   const [quantity, setQuantity] = useState("");
//   const [shipping, setShipping] = useState(""); // true or false
//   const [photo, setPhoto] = useState(null); // file object

//   const [auth] = useAuth(); // Get auth from context

//   const navigate = useNavigate();
//   const params = useParams();

//   //get single product
//   const getSingleProduct = async () => {
//     try {
//       const { data } = await axios.get(
//         `/api/v1/product/getSingle-product/${params.slug}`
//       );
//       if (data?.success) {
//         setName(data.product.name);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong while fetching product");
//     }
//   };

//   useEffect(() => {
//     getSingleProduct();
//     //eslint-disable-next-line
//   }, []);

//   // getAllCategories
//   const getAllCategory = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/category/get-category");
//       if (data?.success) {
//         setCategories(data.category);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong in getting category");
//     }
//   };

//   useEffect(() => {
//     getAllCategory();
//   }, []);

//   //Create product function
//   // handleCreateProduct
//   const handleCreate = async (e) => {
//     e.preventDefault();
//     try {
//       const productData = new FormData();
//       productData.append("name", name);
//       productData.append("description", description);
//       productData.append("price", price);
//       productData.append("quantity", quantity);
//       productData.append("photo", photo);
//       productData.append("category", category);
//       productData.append("shipping", shipping);

//       const { data } = await axios.post(
//         "/api/v1/product/create-product",
//         productData,
//         {
//           headers: {
//             Authorization: auth?.token,
//           },
//         }
//       );

//       if (data?.success) {
//         toast.success("Product Created Successfully");

//         // reset form
//         setName("");
//         setDescription("");
//         setPrice("");
//         setQuantity("");
//         setPhoto(null);
//         setCategory("");
//         setShipping("");
//       } else {
//         toast.error(data?.message);
//         navigate("/dashboard/admin/products");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong in creating product");
//     }
//   };

//   return (
//     <Layout title={"Dashboard - Create Product  "}>
//       <div className="container-fluid  p-5">
//         <div className="row">
//           <div className="col-md-3">
//             <AdminMenu />
//           </div>
//           <div className="col-md-9">
//             <h1>Update Product</h1>
//             <div className="m-1 w-75">
//               <Select
//                 bordered={false}
//                 placeholder="select a category"
//                 size="large"
//                 showSearch
//                 className="form-control mb-3"
//                 onChange={(value) => {
//                   setCategory(value);
//                 }}
//               >
//                 {categories?.map((c) => (
//                   <Option key={c._id} value={c._id}>
//                     {c.name}
//                   </Option>
//                 ))}
//               </Select>

//               <div className="mb-3">
//                 <label className="btn btn-outline-secondary col-md-12">
//                   {photo ? photo.name : "Upload Photo"}
//                   <input
//                     type="file"
//                     name="photo"
//                     accept="image/*"
//                     onChange={(e) => setPhoto(e.target.files[0])}
//                     hidden
//                   />
//                 </label>
//               </div>
//               <div className="mb-3">
//                 {photo && (
//                   <div className="text-center">
//                     <img
//                       src={URL.createObjectURL(photo)}
//                       alt="product photo"
//                       height={"200px"}
//                       className="img img-responsive"
//                     />
//                   </div>
//                 )}
//               </div>

//               <div className="mb-3">
//                 <input
//                   type="text"
//                   value={name}
//                   placeholder="write a name"
//                   className="form-control"
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>
//               {/* Description */}
//               <div className="mb-3">
//                 <textarea
//                   value={description}
//                   placeholder="Write a description"
//                   className="form-control"
//                   onChange={(e) => setDescription(e.target.value)}
//                 />
//               </div>

//               {/* Price */}
//               <div className="mb-3">
//                 <input
//                   type="number"
//                   value={price}
//                   placeholder="Enter price"
//                   className="form-control"
//                   onChange={(e) => setPrice(e.target.value)}
//                 />
//               </div>

//               {/* Quantity */}
//               <div className="mb-3">
//                 <input
//                   type="number"
//                   value={quantity}
//                   placeholder="Enter quantity"
//                   className="form-control"
//                   onChange={(e) => setQuantity(e.target.value)}
//                 />
//               </div>

//               {/* Shipping */}
//               <div className="mb-3">
//                 <Select
//                   bordered={false}
//                   placeholder="Select Shipping"
//                   size="large"
//                   className="form-control mb-3"
//                   onChange={(value) => {
//                     setShipping(value);
//                   }}
//                   value={shipping}
//                 >
//                   <Option value="0">No</Option>
//                   <Option value="1">Yes</Option>
//                 </Select>
//               </div>

//               {/* Submit Button */}
//               <div className="mb-3">
//                 <button className="btn btn-primary" onClick={handleCreate}>
//                   Update PRODUCT
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default UpdateProduct;

import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { Select } from "antd";
import { useAuth } from "../../context/auth";
import { useParams, useNavigate } from "react-router-dom";

const { Option } = Select;

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(""); // category _id
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(""); // true or false
  const [photo, setPhoto] = useState(null); // file object
  const [id, setId] = useState(""); // product _id

  const [auth] = useAuth(); // Get auth from context
  const navigate = useNavigate();
  const params = useParams();

  // ✅ Get Single Product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/getSingle-product/${params.slug}`
      );
      if (data?.success) {
        setName(data.products.name);
        setDescription(data.products.description);
        setPrice(data.products.price);
        setQuantity(data.products.quantity);
        setCategory(data.products.category?._id);
        setShipping(data.products.shipping ? "1" : "0");
        setId(data.products._id); // save product _id
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching product");
    }
  };

  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  // ✅ Get All Categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // ✅ Update product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      if (photo) productData.append("photo", photo); // photo only if updated
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`,
        productData,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );

      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in updating product");
    }
  };

  // ✅ Delete Product
  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;

      await axios.delete(`/api/v1/product/delete-product/${id}`, {
        headers: {
          Authorization: auth?.token,
        },
      });

      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting product");
    }
  };

  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="container-fluid  p-5">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              {/* Category */}
              <Select
                bordered={false}
                placeholder="select a category"
                size="large"
                showSearch
                className="form-control mb-3"
                onChange={(value) => setCategory(value)}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              {/* Photo Upload */}
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              {/* Show Photo */}
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/product/product-photo/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>

              {/* Name */}
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Description */}
              <div className="mb-3">
                <textarea
                  value={description}
                  placeholder="Write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Price */}
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Enter price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              {/* Quantity */}
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Enter quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              {/* Shipping */}
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping"
                  size="large"
                  className="form-control mb-3"
                  onChange={(value) => setShipping(value)}
                  value={shipping}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>

              {/* Buttons */}
              <div className="mb-3">
                <button className="btn btn-primary me-2" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
