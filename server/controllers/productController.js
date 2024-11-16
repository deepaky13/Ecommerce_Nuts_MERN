import Product from "../models/productModel.js";

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, imageUrl } = req.body;

    // Validate the required fields
    if (!name || !price || !stock || !category) {
      return res
        .status(400)
        .json({ msg: "Please provide all required fields" });
    }

    // Create and save the product
    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
      imageUrl,
    });

    const createdProduct = await newProduct.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get products by category

export const getProductsByCategory = async (req, res) => {
  const { category } = req.params; // Extract the category from the URL parameter

  try {
    // Find products with the exact category string
    const products = await Product.find({ category });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ msg: `No products found for category: ${category}` });
    }

    res.status(200).json(products); // Return the matching products
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
