import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ProductGrid } from "@/components/product/ProductGrid";
import { mockProducts } from "@/data/mockProducts";
import { categories } from "@/data/categories";

const Category = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const category = categories.find((c) => c.slug === slug);
  const categoryProducts = mockProducts.filter((p) => p.category === slug);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Category not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-cream"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto px-4">{category.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section className="py-12">
        <div className="container">
          <p className="text-muted-foreground mb-8">
            Showing {categoryProducts.length} products in {category.name}
          </p>
          <ProductGrid products={categoryProducts} />
        </div>
      </section>
    </div>
  );
};

export default Category;
