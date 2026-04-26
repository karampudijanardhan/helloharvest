import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { openWhatsAppChat, createOrderMessage } from "@/utils/whatsapp";

const DELIVERY_CHARGE = 50;
const FREE_DELIVERY_MIN = 599;

export const CartSummary = () => {
  const { state } = useCart();
  const { items, subtotal } = state;
  const navigate = useNavigate();

  const deliveryCharge = subtotal >= FREE_DELIVERY_MIN ? 0 : DELIVERY_CHARGE;
  const total = subtotal + deliveryCharge;

  const handleWhatsAppOrder = () => {
    const orderItems = items.map((item) => ({
      name: item.product.name,
      weight: item.selectedWeight,
      quantity: item.quantity,
      price: item.price,
    }));
    const message = createOrderMessage(orderItems, total);
    openWhatsAppChat(message);
  };

  // ✅ LOGIN REMOVED
  const handleProceedCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft space-y-4 sticky top-32">

      <h3 className="font-display font-semibold text-lg">
        Order Summary
      </h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Subtotal ({items.length} items)
          </span>
          <span className="font-medium">₹{subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Delivery</span>
          <span className="font-medium">
            {deliveryCharge === 0 ? (
              <span className="text-green-600 font-semibold">FREE</span>
            ) : (
              `₹${deliveryCharge}`
            )}
          </span>
        </div>

        {deliveryCharge > 0 && (
          <p className="text-xs text-primary">
            Add ₹{FREE_DELIVERY_MIN - subtotal} more for free delivery!
          </p>
        )}
      </div>

      <div className="border-t border-border pt-4">
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      <div className="space-y-3 pt-2">

        {/* Checkout */}
        <Button
          type="button"
          className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white hover:scale-105 transition-all"
          onClick={handleProceedCheckout}
        >
          Proceed to Checkout
        </Button>

        {/* WhatsApp */}
        <Button
          variant="outline"
          className="w-full"
          onClick={handleWhatsAppOrder}
        >
          Order via WhatsApp
        </Button>

      </div>

      <div className="pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          🔒 Secure checkout • 🚚 Fast delivery • 🌿 Natural products
        </p>
      </div>

    </div>
  );
};