import Product from "../models/Product.js";

// ADD PRODUCT
export const addProduct = async (req, res) => {
  try {
    const { name, category } = req.body;

    if (!name || !category) {
      return res.status(400).json({
        message: "Name and category are required"
      });
    }

    const product = new Product(req.body);
    await product.save();

    res.status(201).json({
      success: true,
      message: "Product added",
      product
    });

  } catch (err) {
    console.error("Add product error:", err);

    res.status(500).json({
      message: "Failed to add product"
    });
  }
};

// GET PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.json(products);

  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch products"
    });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json({
      success: true,
      message: "Product deleted"
    });

  } catch (err) {
    res.status(500).json({
      message: "Delete failed"
    });
  }
};