import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

//router object
const router = express.Router();

//routes
//category routes
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//Update Category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//getAll category
router.get("/get-category", categoryController);

//get single category
router.get("/getSingle-category/:slug", singleCategoryController);

// Delete Category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);
export default router;
