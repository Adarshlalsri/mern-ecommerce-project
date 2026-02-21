import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

//router object
const router = express.Router();

//routes

//Create Product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//get products
router.get("/get-product", getProductController);

//get Single products
router.get("/getSingle-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteProductController
);

//update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// filter products
router.post("/product-filters", productFilterController);

// get product count
router.get("/product-count", productCountController);

// get products per page (pagination)
router.get("/product-list/:page", productListController);

//Search Product
router.get("/search/:keyword", searchProductController);

//Similar Product
router.get("/related-product/:pid/:cid", relatedProductController);

//category wiseproduct
router.get("/product-category/:slug",productCategoryController);


//Payement routes
//token
router.get('/braintree/token',braintreeTokenController)

//payment
router.post('/braintree/payment',requireSignIn,braintreePaymentController)

export default router;
