import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: any[];
  title?: string;
  description?: string;
  reduceStock?: (productId: string, quantity?: number) => void;
}

export const ProductGrid = ({ products, title, description, reduceStock }: ProductGridProps) => {

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No products found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {(title || description) && (
        <div className="text-center space-y-2">

          {title && (
            <h2 className="font-display text-3xl font-bold text-foreground">
              {title}
            </h2>
          )}

          {description && (
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          )}

          {/* 🔥 small green accent line (premium touch) */}
          <div className="w-20 h-1 bg-green-500 mx-auto rounded-full mt-3" />
        </div>
      )}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >

        {products.map((product: any) => (
          <div
            key={product._id || product.id}
            className="transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(22,163,74,0.2)] rounded-xl"
          >
            <ProductCard
              product={product}
              reduceStock={reduceStock}
            />
          </div>
        ))}

      </motion.div>

    </div>
  );
};