import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TrackSearch = () => {
  const [orderId, setOrderId] = useState("");
  const navigate = useNavigate();

  const handleTrack = () => {
    if (!orderId.trim()) {
      alert("Please enter your Order ID");
      return;
    }

    navigate(`/track/${orderId.trim()}`);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="bg-card rounded-xl p-8 shadow-card w-full max-w-md text-center">
        <h1 className="font-display text-2xl font-bold mb-4">
          Track Your Order
        </h1>

        <p className="text-muted-foreground mb-6">
          Enter your Order ID to see the status
        </p>

        <input
          type="text"
          placeholder="Enter Order ID (e.g. AMK71218480)"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="w-full border border-border rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <button
          onClick={handleTrack}
          className="w-full gradient-saffron py-2 rounded-lg text-primary-foreground font-semibold hover:opacity-90"
        >
          Track Order
        </button>
      </div>
    </div>
  );
};

export default TrackSearch;
