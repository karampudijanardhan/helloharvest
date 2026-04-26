import { useLocation, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Package, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const OrderSuccess = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const {
    orderId,
    total,
    items,
    createdAt
  } = location.state || {
    orderId: "POW00000000",
    total: 0,
    items: [],
    createdAt: new Date().toISOString()
  };

  /* Safety if user opens page directly */
  if (!location.state) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center p-4">
        <div className="bg-card shadow-card rounded-xl p-8 text-center max-w-md w-full">
          <h2 className="text-xl font-semibold mb-2">Invalid Order</h2>
          <p className="text-muted-foreground mb-4">
            Order details not found. Please place an order first.
          </p>

          <Button onClick={() => navigate("/products")}>
            Go to Products
          </Button>
        </div>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gradient-warm flex items-center justify-center p-4">

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center space-y-6"
      >

        {/* SUCCESS ICON */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-24 h-24 mx-auto gradient-saffron rounded-full flex items-center justify-center"
        >
          <CheckCircle className="w-12 h-12 text-white" />
        </motion.div>

        {/* TITLE */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">
            Order Placed!
          </h1>

          <p className="text-muted-foreground">
            Thank you for your order. We're preparing your delicious items!
          </p>
        </div>

        {/* ORDER DETAILS */}
        <div className="bg-white rounded-xl p-6 shadow space-y-4">

          <div className="flex items-center justify-center gap-2 text-primary font-semibold">
            <Package className="w-5 h-5"/>
            Order ID: {orderId}
          </div>

          {/* DATE */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4"/>
            {new Date(createdAt).toLocaleString()}
          </div>

          {/* ITEMS */}
          <div className="space-y-3 max-h-40 overflow-auto">

            {items?.map((item:any)=>(

              <div
                key={item.productId || item.product?._id || item.product?.id}
                className="flex justify-between text-sm border-b pb-2"
              >

                <span>
                  {(item.product?.name || item.name)} × {(item.quantity || item.qty)}
                </span>

                <span className="font-semibold">
                  ₹{item.price * (item.quantity || item.qty)}
                </span>

              </div>

            ))}

          </div>

          {/* TOTAL */}
          <div className="border-t pt-3 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <p className="text-sm text-muted-foreground">
            You will receive order confirmation shortly.
          </p>

        </div>

        {/* BUTTONS */}
        <div className="flex flex-col gap-4 mt-6">

          <Link to={`/track/${orderId}`}>
            <Button className="w-full gap-2">
              Track Your Order
              <ArrowRight className="w-4 h-4"/>
            </Button>
          </Link>

          <Link to="/my-orders">
            <Button variant="outline" className="w-full">
              View My Orders
            </Button>
          </Link>

          <Link to="/products">
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </Link>

        </div>

        {/* SUPPORT */}
        <p className="text-xs text-muted-foreground">
          Need help?{" "}
          <Link to="/support" className="text-primary hover:underline">
            Contact Support
          </Link>
        </p>

      </motion.div>

    </div>

  );

};

export default OrderSuccess;