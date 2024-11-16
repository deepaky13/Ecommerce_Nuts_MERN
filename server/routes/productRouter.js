import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { authenticateUser } from "../middlewares/authenticateMiddleware.js";

const router = Router();

// Product routes
router.post("/", authenticateUser, createProduct); // Create a new product
router.get("/", getAllProducts); // Get all products
router.get("/category/:category", getProductsByCategory); // Get products by category
router.patch("/:id", authenticateUser, updateProduct); // Update product by ID
router.delete("/:id", authenticateUser, deleteProduct); // Delete product by ID

export default router;
