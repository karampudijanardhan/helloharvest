import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const EmptyCart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16 space-y-6"
    >
      <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
        <ShoppingCart className="w-12 h-12 text-muted-foreground" />
      </div>
      
      <div className="space-y-2">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Your cart is empty
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Looks like you haven't added any products yet. Explore our delicious 
          pickles, powders, and sweets!
        </p>
      </div>

      <Link to="/products">
        <Button size="lg" className="gradient-saffron hover:opacity-90">
          Start Shopping
        </Button>
      </Link>
    </motion.div>
  );
};
