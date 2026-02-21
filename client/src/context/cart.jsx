import { useState, useEffect, useContext, createContext } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ LocalStorage se cart restore karein
  useEffect(() => {
    const existingCart = localStorage.getItem("cart");
    if (existingCart) setCart(JSON.parse(existingCart));
  }, []);

  //  ✅ Add to cart function
  const addToCart = (product) => {
    const existing = cart.find((item) => item._id === product._id);

    let updatedCart;
    if (existing) {
      // Agar product already cart me hai, to uski quantity +1
      updatedCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // Agar product new hai, to quantity: 1 ke sath add karo
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success(`${product.name} added to cart`, {
      position: "top-center",
      autoClose: 2000,
    });
  };

  // ✅ Remove from cart function
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.error("Item removed from cart");
  };

  // ✅ Update quantity function
  const updateQuantity = (id, action) => {
    const updatedCart = cart.map((item) => {
      if (item._id === id) {
        let newQuantity = item.quantity || 1;
        if (action === "inc") newQuantity++;
        if (action === "dec" && newQuantity > 1) newQuantity--;
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom hook for consuming cart
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
