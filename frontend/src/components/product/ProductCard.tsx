import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Eye, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/data/mockProducts";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  reduceStock?: (productId: string, quantity?: number) => void;
}

export const ProductCard = ({ product, reduceStock }: ProductCardProps) => {

  const [selectedWeight, setSelectedWeight] = useState(product.weightOptions[0]);

  const { addToCart } = useCart();
  const { toast } = useToast();

  const currentPrice = product.prices[selectedWeight];

  // ✅ FIXED 10% DISCOUNT
  const discount = 10;
  const originalPrice = Math.round(currentPrice / (1 - discount / 100));

  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      toast({
        title: "Out of Stock",
        description: "This product is currently unavailable.",
        variant: "destructive",
      });
      return;
    }

    addToCart(product, selectedWeight, 1);
    reduceStock?.(product._id || product.id, 1);

    toast({
      title: "Added to cart!",
      description: `${product.name} (${selectedWeight}) added to your cart.`,
    });
  };

  const spiceLevelColors = {
    mild: "bg-green-100 text-green-600",
    medium: "bg-green-200 text-green-700",
    hot: "bg-green-300 text-green-800",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-[0_10px_25px_rgba(22,163,74,0.2)] transition-all duration-300"
    >

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.badges.slice(0, 2).map((badge) => (
            <Badge
              key={badge}
              className="bg-green-600 text-white text-xs shadow-md"
            >
              {badge}
            </Badge>
          ))}
        </div>

        {/* Spice Level */}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${spiceLevelColors[product.spiceLevel]}`}>
          <Flame className="w-3 h-3" />
          {product.spiceLevel.charAt(0).toUpperCase() + product.spiceLevel.slice(1)}
        </div>

        {/* Quick View */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Link to={`/product/${product._id || product.id}`}>
            <Button variant="secondary" size="sm" className="gap-2 bg-green-600 text-white hover:bg-green-500">
              <Eye className="w-4 h-4" />
              Quick View
            </Button>
          </Link>
        </div>

        {/* Out Of Stock */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm px-4 py-2">
              Out of Stock
            </Badge>
          </div>
        )}

      </div>

      {/* Content */}
      <div className="p-4 space-y-3">

        {/* Category & Rating */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-green-600 uppercase tracking-wide">
            {product.category}
          </span>

          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-green-500 text-green-500" />
            <span className="text-sm font-medium">
              {product.rating}
            </span>
          </div>
        </div>

        {/* Title */}
        <div>
          <h3 className="font-display font-semibold text-lg text-foreground line-clamp-1">
            {product.name}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>

        {/* Weight Selector */}
        <div className="flex gap-2">
          {product.weightOptions.map((weight) => (
            <button
              key={weight}
              onClick={() => setSelectedWeight(weight)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                selectedWeight === weight
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-background text-foreground border-border hover:border-green-500"
              }`}
            >
              {weight}
            </button>
          ))}
        </div>

        {/* Shelf Life */}
        <p className="text-xs text-muted-foreground">
          Shelf life: {product.shelfLife}
        </p>

        {/* Stock */}
        <p className="text-xs text-muted-foreground">
          Stock: {product.stock}
        </p>

        {/* ✅ PRICE SECTION */}
        <div className="flex items-center justify-between pt-2 border-t border-border">

          <div className="flex flex-col">

            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-foreground">
                ₹{currentPrice}
              </span>

              <span className="text-sm text-gray-400 line-through">
                ₹{originalPrice}
              </span>

              <span className="text-sm font-semibold text-green-600">
                {discount}% OFF
              </span>
            </div>

            <span className="text-xs text-muted-foreground mt-1">
              / {selectedWeight}
            </span>

          </div>

          {/* Add Button */}
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="gap-2 bg-green-700 hover:bg-green-500 text-white"
          >
            <ShoppingCart className="w-4 h-4" />
            {isOutOfStock ? "Out of Stock" : "Add"}
          </Button>

        </div>

      </div>

    </motion.div>
  );
};