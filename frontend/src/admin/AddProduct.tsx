import { useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";

const AddProduct = () => {

  const [product, setProduct] = useState({
    name: "",
    category: "",
    image: "",
    price250: "",
    price500: "",
    price1kg: "",
    spiceLevel: "",
    shelfLife: "",
    stock: "",
    description: "",
    ingredients: "",
  });

  const handleChange = (e: any) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const newProduct = {
      name: product.name,
      category: product.category,
      image: product.image,
      weightOptions: ["250g", "500g", "1kg"],
      prices: {
        "250g": Number(product.price250),
        "500g": Number(product.price500),
        "1kg": Number(product.price1kg)
      },
      spiceLevel: product.spiceLevel,
      shelfLife: product.shelfLife,
      stock: Number(product.stock),
      rating: 4.5,
      badges: ["Homemade"],
      description: product.description,
      ingredients: product.ingredients.split(",")
    };

    try {

      const res = await axios.post(
        "http://localhost:5000/api/products/add",
        newProduct
      );

      alert("Product Added Successfully ✅");

      console.log(res.data);

    } catch (err) {

      console.error(err);
      alert("Error adding product");

    }
  };

  return (

    <AdminLayout>

      <h1 className="text-2xl font-display text-spice-brown mb-6">
        Add Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-card shadow-card border-2 border-gray-300 hover:border-orange-400 transition p-6 rounded-xl max-w-2xl space-y-4"
      >

        <input
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          className="w-full border border-input rounded-lg p-2 bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        />

        <input
          name="category"
          placeholder="Category (pickles / sweets)"
          onChange={handleChange}
          className="w-full border border-input rounded-lg p-2 bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        />

        <input
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
          className="w-full border border-input rounded-lg p-2 bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        />

        <div className="grid grid-cols-3 gap-3">

          <input
            name="price250"
            placeholder="250g Price"
            onChange={handleChange}
            className="border border-input rounded-lg p-2 bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />

          <input
            name="price500"
            placeholder="500g Price"
            onChange={handleChange}
            className="border border-input rounded-lg p-2 bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />

          <input
            name="price1kg"
            placeholder="1kg Price"
            onChange={handleChange}
            className="border border-input rounded-lg p-2 bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />

        </div>

        <input
          name="spiceLevel"
          placeholder="Spice Level (mild / medium / hot)"
          onChange={handleChange}
          className="w-full border border-input rounded-lg p-2 bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        />

        <input
          name="shelfLife"
          placeholder="Shelf Life (ex: 10 months)"
          onChange={handleChange}
          className="w-full border border-input rounded-lg p-2 bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        />

        <input
          name="stock"
          placeholder="Stock"
          onChange={handleChange}
          className="w-full border border-input rounded-lg p-2 bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        />

        <textarea
          name="description"
          placeholder="Product Description"
          onChange={handleChange}
          className="w-full border border-input rounded-lg p-2 bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        />

        <input
          name="ingredients"
          placeholder="Ingredients (comma separated)"
          onChange={handleChange}
          className="w-full border border-input rounded-lg p-2 bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        />

        <button
          className="w-full py-2 rounded-lg gradient-saffron text-white font-medium shadow-warm hover:shadow-hover transition"
        >
          Add Product
        </button>

      </form>

    </AdminLayout>

  );

};

export default AddProduct;