import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/context/CartContext";
import { useCart } from "@/context/CartContext";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity, selectedWeight, price } = item;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex gap-4 p-4 bg-card rounded-xl shadow-card"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-24 h-24 rounded-lg object-cover"
      />

      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-foreground line-clamp-1">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{selectedWeight}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeFromCart(product.id, selectedWeight)}
            className="text-muted-foreground hover:text-destructive shrink-0"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(product.id, selectedWeight, quantity - 1)}
            >
              <Minus className="w-3 h-3" />
            </Button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(product.id, selectedWeight, quantity + 1)}
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>

          <div className="text-right">
            <p className="font-bold text-foreground">₹{price * quantity}</p>
            <p className="text-xs text-muted-foreground">₹{price} each</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
