import { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";

const Products = () => {

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(res.data);

    } catch (err) {

      console.error("Error loading products", err);

    }

  };

  const deleteProduct = async (id: string) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );

      setProducts(products.filter(p => p._id !== id));

    } catch (err) {

      console.error("Delete error", err);

    }

  };

  const resetStock = () => {

    localStorage.removeItem("products");

    alert("Stock reset successfully!");

  };

  return (

    <AdminLayout>

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">

        <h1 className="text-2xl font-display text-spice-brown">
          Products
        </h1>

        <button
          onClick={resetStock}
          className="px-4 py-2 rounded bg-secondary text-white w-fit"
        >
          Reset Stock
        </button>

      </div>

      {/* ================= MOBILE VIEW ================= */}
      <div className="grid gap-4 md:hidden">

        {products.map((product: any) => (

          <div
            key={product._id}
            className="bg-card shadow-card border-2 border-gray-300 hover:border-orange-400 transition rounded-xl p-4 flex items-center gap-4"
          >

            <img
              src={product.image}
              alt={product.name}
              className="w-14 h-14 rounded object-cover"
            />

            <div className="flex-1">

              <p className="font-semibold">
                {product.name}
              </p>

              <p className="text-sm text-muted-foreground">
                {product.category}
              </p>

              <p className="text-sm">
                Stock: {product.stock}
              </p>

            </div>

            <button
              onClick={() => deleteProduct(product._id)}
              className="px-3 py-1 rounded bg-destructive text-white text-sm"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-card shadow-card border-2 border-gray-300 rounded-xl overflow-x-auto">

        <table className="w-full">

          <thead className="bg-muted">

            <tr>

              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Delete</th>

            </tr>

          </thead>

          <tbody>

            {products.map((product: any) => (

              <tr key={product._id} className="border-t border-border hover:bg-muted/40">

                <td className="p-3">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 rounded object-cover"
                  />

                </td>

                <td className="p-3">{product.name}</td>

                <td className="p-3">{product.category}</td>

                <td className="p-3">{product.stock}</td>

                <td className="p-3">

                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="px-3 py-1 rounded bg-destructive text-white"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </AdminLayout>

  );

};

export default Products;