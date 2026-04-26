import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";

const API = "http://localhost:5000/api";

const Orders = () => {

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchOrders = async () => {
      try {
        // ✅ FIXED API
        const res = await axios.get(`${API}/order`);

        console.log("Orders API:", res.data);

        if (Array.isArray(res.data)) {
          setOrders(res.data);
        } else {
          setOrders([]);
        }

      } catch (err) {
        console.error("Order loading error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

  }, []);

  const updateStatus = async (id: string, status: string) => {

    try {
      // ✅ FIXED API
      await axios.put(`${API}/order/status/${id}`, { status });

      // ✅ Update UI instantly
      setOrders(prev =>
        prev.map(o =>
          o._id === id ? { ...o, status } : o
        )
      );

    } catch (err) {
      console.log("Status update error", err);
    }

  };

  return (

    <AdminLayout>

      <h1 className="text-2xl font-display text-spice-brown mb-6">
        Orders
      </h1>

      {loading && (
        <p className="text-center text-muted-foreground">
          Loading orders...
        </p>
      )}

      {!loading && orders.length === 0 && (
        <p className="text-muted-foreground">
          No orders found
        </p>
      )}

      <div className="space-y-6">

        {orders.map(order => {

          const item = order.items?.[0];

          return (

            <div
              key={order._id}
              className="bg-card shadow-card border-2 border-gray-300 hover:border-orange-400 transition rounded-xl p-4 sm:p-6"
            >

              {/* USER INFO */}
              <div className="flex flex-col sm:flex-row sm:justify-between mb-4 gap-2">

                <div>
                  <p className="font-semibold text-lg">{order.name}</p>
                  <p className="text-sm text-muted-foreground">{order.mobile}</p>
                  <p className="text-sm text-muted-foreground">{order.address}</p>
                </div>

                <span className="px-3 py-1 rounded bg-muted text-sm w-fit">
                  {order.status}
                </span>

              </div>

              {/* PRODUCT */}
              {item && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">

                  <img
                    src={item.image || "https://via.placeholder.com/60"}
                    alt={item.name}
                    className="w-16 h-16 rounded object-cover"
                  />

                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.weight} × {item.qty}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ₹{item.price}
                    </p>
                  </div>

                </div>
              )}

              <p className="font-semibold mb-3">
                Total: ₹{order.totalAmount}
              </p>

              {/* STATUS BUTTONS */}
              <div className="flex gap-2 flex-wrap">

                <button
                  onClick={() => updateStatus(order._id, "PACKING")}
                  className="px-3 py-1 rounded gradient-gold text-white text-sm"
                >
                  Packing
                </button>

                <button
                  onClick={() => updateStatus(order._id, "SHIPPED")}
                  className="px-3 py-1 rounded gradient-saffron text-white text-sm"
                >
                  Shipped
                </button>

                <button
                  onClick={() => updateStatus(order._id, "OUT_FOR_DELIVERY")}
                  className="px-3 py-1 rounded bg-secondary text-white text-sm"
                >
                  Out for Delivery
                </button>

                <button
                  onClick={() => updateStatus(order._id, "DELIVERED")}
                  className="px-3 py-1 rounded bg-accent text-white text-sm"
                >
                  Delivered
                </button>

              </div>

            </div>

          );

        })}

      </div>

    </AdminLayout>

  );

};

export default Orders;