import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Package, ChefHat, Truck, CheckCircle } from "lucide-react";

const statusOrder = ["PLACED", "PACKING", "SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED"];

const stepMeta = [
  { key: "PLACED", icon: Package, title: "Order Placed", desc: "Your order has been confirmed" },
  { key: "PACKING", icon: ChefHat, title: "Preparing", desc: "We're preparing your items" },
  { key: "SHIPPED", icon: Truck, title: "Dispatched", desc: "On the way to you" },
  { key: "DELIVERED", icon: CheckCircle, title: "Delivered", desc: "Enjoy your order!" },
];

const TrackOrder = () => {
  const { orderId } = useParams<{ orderId: string }>(); // 👈 typed param

  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        if (!orderId) {
          setError("Order ID missing in URL");
          setLoading(false);
          return;
        }

        console.log("URL orderId param =", orderId);

        const res = await axios.get(
          `http://localhost:5000/api/order/track/${orderId}`
        );

        console.log("Track API response =", res.data);

        setStatus(res.data.status);
      } catch (err) {
        console.error("Track error:", err);
        setError("Invalid Order ID or server error");
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [orderId]);

  const currentIndex = status
    ? statusOrder.indexOf(status)
    : -1;

  return (
    <div className="min-h-screen bg-background">
      <section className="gradient-warm py-12">
        <div className="container text-center">
          <h1 className="font-display text-4xl font-bold mb-4">
            Track Your Order
          </h1>
          <p className="text-muted-foreground">
            Order ID: {orderId || "—"}
          </p>
        </div>
      </section>

      <section className="container py-12 max-w-2xl">
        <div className="bg-card rounded-xl p-8 shadow-card">

          {loading && (
            <p className="text-center text-muted-foreground">
              Loading order status...
            </p>
          )}

          {error && !loading && (
            <p className="text-center text-red-500">
              {error}
            </p>
          )}

          {!loading && !error && status && (
            <div className="space-y-0">
              {stepMeta.map((step, i) => {
                const done = i <= currentIndex;

                return (
                  <motion.div
                    key={step.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="flex gap-4"
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          done ? "gradient-saffron" : "bg-muted"
                        }`}
                      >
                        <step.icon
                          className={`w-6 h-6 ${
                            done
                              ? "text-primary-foreground"
                              : "text-muted-foreground"
                          }`}
                        />
                      </div>

                      {i < stepMeta.length - 1 && (
                        <div
                          className={`w-0.5 h-16 ${
                            done ? "bg-primary" : "bg-border"
                          }`}
                        />
                      )}
                    </div>

                    <div className="pb-8">
                      <h3
                        className={`font-semibold ${
                          done
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TrackOrder;
