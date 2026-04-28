import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Flame, ArrowLeft, Minus, Plus, Check, Truck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockProducts } from "@/data/mockProducts";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { ProductGrid } from "@/components/product/ProductGrid";
import ReviewSection from "@/components/product/ReviewSection";
import axios from "axios";

const API = "https://helloharvest.onrender.com/api";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();

  const [products, setProducts] = useState(mockProducts);

  useEffect(() => {
    axios.get(`${API}/products`)
      .then(res => {
        if (res.data?.length) setProducts(res.data);
      })
      .catch(() => console.log("Using mock"));
  }, []);

  const product = products.find(
    (p: any) => p._id === id || p.id === id
  );
  
  const [selectedWeight, setSelectedWeight] = useState(product?.weightOptions[0] || "250g");
  const [quantity, setQuantity] = useState(1);
  
  const { addToCart } = useCart();
  const { toast } = useToast();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Product not found</p>
      </div>
    );
  }

  const currentPrice = product.prices[selectedWeight];

  const relatedProducts = products
    .filter((p: any) => p.category === product.category && (p._id !== product._id || p.id !== product.id))
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedWeight, quantity);
    toast({
      title: "Added to cart!",
      description: `${product.name} (${selectedWeight}) x${quantity} added to your cart.`,
    });
  };

  const spiceLevelColors = {
    mild: "bg-cardamom/20 text-cardamom",
    medium: "bg-secondary/20 text-secondary-foreground",
    hot: "bg-accent/20 text-accent",
  };

  return (
    <div className="min-h-screen bg-background">
      
      {/* Breadcrumb */}
      <div className="container py-4">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-green-600 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>
      </div>

      {/* Product Details */}
      <section className="container pb-16">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.badges.map((badge) => (
                <Badge key={badge} className="bg-green-600 text-white shadow-lg">
                  {badge}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            
            <div>
              <p className="text-green-600 font-medium uppercase tracking-wide mb-2">
                {product.category}
              </p>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-green-500 text-green-500" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-muted-foreground">(120+ reviews)</span>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${spiceLevelColors[product.spiceLevel]}`}>
                <Flame className="w-4 h-4" />
                {product.spiceLevel.charAt(0).toUpperCase() + product.spiceLevel.slice(1)}
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Ingredients */}
            {product.ingredients && (
              <div>
                <h3 className="font-semibold mb-2">Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient) => (
                    <span key={ingredient} className="px-3 py-1 bg-muted rounded-full text-sm">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Weight Selector */}
            <div>
              <h3 className="font-semibold mb-3">Select Weight</h3>
              <div className="flex gap-3">
                {product.weightOptions.map((weight) => (
                  <button
                    key={weight}
                    onClick={() => setSelectedWeight(weight)}
                    className={`px-6 py-3 rounded-xl border-2 font-medium transition-all ${
                      selectedWeight === weight
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-background text-foreground border-border hover:border-green-500"
                    }`}
                  >
                    {weight}
                    <span className="block text-sm opacity-80">₹{product.prices[weight]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-2">Quantity</h3>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
                  <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Price</p>
                <p className="text-3xl font-bold text-foreground">₹{currentPrice * quantity}</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <Button size="lg" onClick={handleAddToCart} className="flex-1 bg-green-700 hover:bg-green-500 text-white gap-2 transition-all duration-300">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </Button>

              <Link to="/cart" className="flex-1">
                <Button size="lg" variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-500 hover:text-white transition-all duration-300">
                  Buy Now
                </Button>
              </Link>
            </div>

            {/* Info */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-green-500" />
                Free Delivery
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-500" />
                Shelf life: {product.shelfLife}
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                {product.stock} in stock
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      <ReviewSection productId={product._id || product.id} />

      {relatedProducts.length > 0 && (
       <section className="py-16 bg-background">
  <div className="container">
    <ProductGrid
      products={relatedProducts}
      title="You May Also Like"
      description={`More delicious ${product.category} from our collection`}
    />
  </div>
</section>
      )}
    </div>
  );
};

export default ProductDetails;