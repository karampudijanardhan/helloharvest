import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PackageSearch } from "lucide-react";

interface OrderItem {
  name: string;
  qty: number;
  weight: string;
  price: number;
}

interface Order {
  _id: string;
  orderRef: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  items: OrderItem[];
}

const MyOrders = () => {

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
  `https://helloharvest.onrender.com/api/order/my/${username}`
);

        // ✅ backend fix
        if (Array.isArray(res.data)) {
          setOrders(res.data);
        } else {
          setOrders([]);
        }

      } catch (err) {
        console.error("Fetch orders failed:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    if (username && token) {
      fetchOrders();
    } else {
      setLoading(false);
    }

  }, [username, token]);

  // 🔐 Not logged in
  if (!token || !username) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center">

        <div className="bg-card shadow-card border-2 border-gray-300 rounded-xl p-8 text-center max-w-md w-full">

          <PackageSearch className="w-10 h-10 mx-auto text-primary mb-3" />

          <h2 className="text-xl font-display font-semibold text-spice-brown mb-2">
            Please Login
          </h2>

          <p className="text-muted-foreground mb-4">
            మీ Orders చూడాలంటే ముందుగా login చేయాలి 🙏
          </p>

          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 rounded-lg gradient-saffron text-primary-foreground"
          >
            Go to Login
          </button>

        </div>
      </div>
    );
  }

  // ⏳ Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center">
        <p className="text-muted-foreground">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-warm">

      <div className="container py-10">

        <h1 className="text-3xl font-display font-bold text-spice-brown mb-6">
          My Orders
        </h1>

        {orders.length === 0 && (
          <div className="bg-card shadow-card border-2 border-gray-300 rounded-xl p-6 text-center">
            <p className="text-muted-foreground">
              మీరు ఇంకా ఏ order place చేయలేదు 😌
            </p>
          </div>
        )}

        <div className="space-y-4">

          {orders.map((order) => (

            <div
              key={order._id}
              className="bg-card rounded-xl shadow-card border-2 border-gray-300 p-6 hover:border-orange-400 transition"
            >

              <div className="flex justify-between items-center mb-2">

                <p className="font-medium">
                  Order ID:
                  <span className="text-primary ml-1">
                    {order.orderRef}
                  </span>
                </p>

                <span className="text-sm font-semibold text-primary">
                  {order.status}
                </span>

              </div>

              <p className="text-sm text-muted-foreground mb-3">
                {new Date(order.createdAt).toLocaleString()}
              </p>

              <ul className="text-sm space-y-1">

                {(order.items || []).map((item, i) => (
                  <li key={i}>
                    {item.name} ({item.weight}) × {item.qty}
                  </li>
                ))}

              </ul>

              <div className="border-t border-border mt-3 pt-3 flex justify-between items-center font-semibold">

                <div>
                  <span>Total: </span>
                  <span>₹{order.totalAmount}</span>
                </div>

                {/* ✅ VIEW DETAILS BUTTON RESTORED */}
                <button
                  onClick={() => navigate(`/track/${order._id}`)}
                  className="px-4 py-1.5 text-sm rounded-lg gradient-saffron text-primary-foreground"
                >
                  View Details
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default MyOrders;