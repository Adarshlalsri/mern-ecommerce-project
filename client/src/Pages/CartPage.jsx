// import React, { useEffect, useState } from "react";
// import Layout from "../components/Layout/Layout";
// import { useAuth } from "../context/auth";
// import { useCart } from "../context/cart";
// import { useNavigate } from "react-router-dom";
// import dropin from "braintree-web-drop-in";
// import axios from "axios";

// const CartPage = () => {
//   const [auth, setAuth] = useAuth();
//   const { cart, removeFromCart, updateQuantity } = useCart();
//   const [clientToken, setClientToken] = useState("");
//   const [instance, setInstance] = useState("");
//   const [loading, setLoading] = useState("");
//   const navigate = useNavigate(false);

//   // ✅ Subtotal calculation
//   const subtotal = cart.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   //get Payement gateway token
//   const getToken = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/product/braintree/token");
//       setClientToken(data?.clientToken);
//       console.log("client token", data?.clientToken);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getToken();
//   }, [auth?.token]);

//   //handle payment
//   const handlePayment = () => {};

//   useEffect(() => {
//     if (clientToken) {
//       dropin
//         .create({
//           authorization: clientToken,
//           container: "#dropin-container",
//           paypal: {
//             flow: "vault",
//           },
//         })
//         .then((dropinInstance) => {
//           setInstance(dropinInstance);
//           console.log("DropIn instance created");
//         })
//         .catch((error) => {
//           console.error("DropIn creation error", error);
//         });
//     }

//     return () => {
//       if (instance) {
//         instance.teardown();
//       }
//     };
//   }, [clientToken]);

//   return (
//     <Layout title="cart">
//       <div className="container-fluid p-4">
//         <div className="row">
//           <div className="col-md-12">
//             <h1 className="text-center bg-light p-2">
//               {`hello ${auth?.token && auth?.user?.name}`}
//             </h1>
//             <h4 className="text-center">
//               {cart?.length > 0
//                 ? auth?.token
//                   ? `You Have ${cart.length} items in your cart`
//                   : "Please login to checkout"
//                 : "Your Cart is Empty"}
//             </h4>
//           </div>
//         </div>
//         <div className="row d-flex gap-3 justify-content-center mt-5">
//           <div className="col-md-7">
//             <table className="table align-middle">
//               <thead>
//                 <tr>
//                   <th>Product</th>
//                   <th>Price</th>
//                   <th style={{ width: "150px" }}>Quantity</th>
//                   <th>Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cart?.map((p, index) => (
//                   <tr key={p._id || index}>
//                     {/* Product Image + Details */}
//                     <td className="d-flex align-items-center">
//                       <img
//                         src={`/api/v1/product/product-photo/${p._id}`}
//                         alt={p.name}
//                         className="img-fluid me-3"
//                         style={{ width: "80px" }}
//                       />
//                       <div>
//                         <h6 className="mb-1">{p.name}</h6>

//                         <br />
//                         <button
//                           className="btn btn-link text-danger p-0"
//                           onClick={() => removeFromCart(p._id)}
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     </td>

//                     {/* Price */}
//                     <td>${p.price}</td>

//                     {/* Quantity */}
//                     <td>
//                       <div className="input-group input-group-sm">
//                         <button
//                           className="btn btn-outline-secondary"
//                           onClick={() => updateQuantity(p._id, "dec")}
//                         >
//                           -
//                         </button>
//                         <input
//                           type="text"
//                           value={p.quantity || 1}
//                           readOnly
//                           className="form-control text-center"
//                         />
//                         <button
//                           className="btn btn-outline-secondary"
//                           onClick={() => updateQuantity(p._id, "inc")}
//                         >
//                           +
//                         </button>
//                       </div>
//                     </td>

//                     {/* Total */}
//                     <td>${(p.price * p.quantity).toFixed(2)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           {/* Subtotal + Checkout */}
//           <div className="col-md-3">
//             <div className="d-flex justify-content-between align-items-center  pt-3">
//               <h5>Subtotal</h5>
//               <h5>{subtotal.toFixed(2)}</h5>
//             </div>

//             <div className="mt-3">
//               <button className="btn btn-dark w-100 mb-2">Checkout</button>
//               <a href="/cart" className="d-block text-center">
//                 View Cart
//               </a>
//             </div>
//             {auth?.user?.address ? (
//               <>
//                 <div className="mt-3 text-center">
//                   <h4>Current Address</h4>
//                   <h5>{auth?.user?.address}</h5>
//                   <button
//                     className="btn btn-outline-warning"
//                     onClick={() => navigate("/dashboard/user/profile")}
//                   >
//                     Update Address
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="mt-3 text-center">
//                   {auth?.token ? (
//                     <button
//                       className="btn btn-outline-warning"
//                       onClick={() => navigate("/dashboard/user/profile")}
//                     >
//                       {" "}
//                     </button>
//                   ) : (
//                     <button
//                       className="btn btn-outline-warning"
//                       onClick={() =>
//                         navigate("/login", {
//                           state: "/cart",
//                         })
//                       }
//                     >
//                       Please Login to checkOut
//                     </button>
//                   )}
//                 </div>
//               </>
//             )}
//             <div>
//               <p>Client Token: {clientToken ? "Available" : "Not Available"}</p>
//             </div>
//             <div id="dropin-container" className="mt-2 text-center">
//               {/* DropIn will be automatically rendered here by the library */}
//             </div>

//             <button
//               className="btn btn-primary mt-2"
//               onClick={handlePayment}
//               disabled={!instance || loading}
//             >
//               {loading ? "Processing..." : "Make Payment"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CartPage;

import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import dropin from "braintree-web-drop-in";
import axios from "axios";
import { toast } from "react-toastify";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const { cart, setCart, removeFromCart, updateQuantity } = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Subtotal calculation
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // ✅ Get client token from backend
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token", {
        headers: {
          Authorization: auth?.token,
        },
      });
      setClientToken(data?.clientToken);
      console.log("Client token received:", data.clientToken);
    } catch (error) {
      console.error("Error fetching client token:", error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getToken();
    }
  }, [auth?.token]);

  // ✅ Initialize DropIn UI
  useEffect(() => {
    if (clientToken) {
      if (instance) {
        instance.teardown();
      }
      dropin.create(
        {
          authorization: clientToken,
          container: "#dropin-container",
          paypal: {
            flow: "vault",
          },
        },
        (error, dropinInstance) => {
          if (error) {
            console.error("DropIn creation error:", error);
            return;
          }
          setInstance(dropinInstance);
          console.log("DropIn instance created");
        }
      );
    }
    return () => {
      if (instance) {
        instance.teardown();
      }
    };
  }, [clientToken]);

  // ✅ Handle payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        "/api/v1/product/braintree/payment",
        {
          nonce,
          cart,
        },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout title="Cart Page">
      <div className="container-fluid p-4">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2">
              Hello {auth?.token ? auth.user.name : "Guest"}
            </h1>
            <h4 className="text-center">
              {cart.length > 0
                ? auth?.token
                  ? `You have ${cart.length} items in your cart`
                  : "Please login to checkout"
                : "Your cart is empty"}
            </h4>
          </div>
        </div>

        <div className="row d-flex gap-3 justify-content-center mt-5">
          <div className="col-md-7">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((p, index) => (
                  <tr key={p._id || index}>
                    <td className="d-flex align-items-center">
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        alt={p.name}
                        className="img-fluid me-3"
                        style={{ width: "80px" }}
                      />
                      <div>
                        <h6 className="mb-1">{p.name}</h6>
                        <button
                          className="btn btn-link text-danger p-0"
                          onClick={() => removeFromCart(p._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                    <td>${p.price.toFixed(2)}</td>
                    <td>
                      <div className="input-group input-group-sm">
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => updateQuantity(p._id, "dec")}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={p.quantity}
                          readOnly
                          className="form-control text-center"
                        />
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => updateQuantity(p._id, "inc")}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>${(p.price * p.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="col-md-3">
            <div className="d-flex justify-content-between align-items-center pt-3">
              <h5>Subtotal</h5>
              <h5>${subtotal.toFixed(2)}</h5>
            </div>

            <div className="mt-3">
              <button className="btn btn-dark w-100 mb-2" disabled>
                Checkout
              </button>
              <a href="/cart" className="d-block text-center">
                View Cart
              </a>
            </div>

            {auth?.user?.address ? (
              <div className="mt-3 text-center">
                <h4>Current Address</h4>
                <h5>{auth.user.address}</h5>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              </div>
            ) : (
              <div className="mt-3 text-center">
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate("/login", { state: "/cart" })}
                >
                  Please Login to checkout
                </button>
              </div>
            )}

            <div className="mt-2 text-center">
              {clientToken ? (
                <div>
                  <div
                    id="dropin-container"
                    style={{ marginBottom: "10px" }}
                  ></div>
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={!instance || loading || !auth?.user?.address}
                  >
                    {loading ? "Processing..." : "Make Payment"}
                  </button>
                </div>
              ) : (
                <p>Loading payment options...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
