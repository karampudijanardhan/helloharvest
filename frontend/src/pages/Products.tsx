import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FilterPanel } from "@/components/product/FilterPanel";
import { useFilter } from "@/hooks/useFilter";
import { mockProducts } from "@/data/mockProducts";
import axios from "axios";
import { useParams } from "react-router-dom"; // ✅ ADDED

const API = "http://localhost:5000/api";

const Products = () => {

  const { category } = useParams(); // ✅ ADDED

  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState<any[]>(mockProducts);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH BACKEND → FALLBACK SAFE
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API}/products`);

        if (Array.isArray(res.data) && res.data.length > 0) {
          setProducts(res.data);
        }

      } catch {
        console.log("Backend failed → using mock data");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ CATEGORY FILTER (VERY IMPORTANT)
  const categoryProducts = category
    ? products.filter((p) => p.category === category)
    : products;

  const {
    filters,
    filteredProducts,
    updateFilter,
    resetFilters,
    filteredCount,
    totalProducts
  } = useFilter(categoryProducts); // ✅ FIXED

  // ✅ STOCK UPDATE
  const reduceStock = (productId: string, quantity: number = 1) => {
    setProducts((prev) =>
      prev.map((p: any) =>
        (p._id === productId || p.id === productId) && p.stock > 0
          ? { ...p, stock: Math.max(p.stock - quantity, 0) }
          : p
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <section className="gradient-warm py-12">
        <div className="container">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >

            {/* ✅ ONLY TEXT UPDATED */}
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 capitalize">
              {category ? `${category} Products` : "All Products"}
            </h1>

            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our complete collection of homemade powders and traditional products.
            </p>

          </motion.div>

        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container">

          {loading ? (
            <p className="text-center text-muted-foreground">
              Loading products...
            </p>
          ) : (
            <>
              {/* Mobile Filters */}
              <div className="lg:hidden mb-6">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filters ({filteredCount} products)
                </Button>
              </div>

              <div className="flex gap-8">

                {/* Desktop Filters */}
                <aside className="hidden lg:block w-72 shrink-0">
                  <FilterPanel
                    filters={filters}
                    updateFilter={updateFilter}
                    resetFilters={resetFilters}
                    filteredCount={filteredCount}
                    totalProducts={totalProducts}
                  />
                </aside>

                {/* Products */}
                <div className="flex-1">
                  <ProductGrid
                    products={filteredProducts}
                    reduceStock={reduceStock}
                  />
                </div>

              </div>
            </>
          )}

        </div>
      </section>

    </div>
  );
};

export default Products;