import Order from "../models/Order.js";
import sendOrderSMS from "../services/sendOrderSMS.js";

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    console.log("Incoming order:", req.body);

    const order = new Order(req.body);
    const saved = await order.save();

    console.log("Order saved:", saved.orderRef);

    // 📲 SEND WHATSAPP (optional if service exists)
    try {
      await sendOrderSMS(saved);
    } catch (err) {
      console.log("SMS failed:", err.message);
    }

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: saved
    });

  } catch (err) {
    console.log("Order creation error:", err);

    res.status(500).json({
      message: "Order creation failed"
    });
  }
};

// VERIFY PAYMENT (ADMIN)
export const verifyPayment = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Order.findByIdAndUpdate(
      id,
      {
        paymentStatus: "Verified",
        status: "CONFIRMED"
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      success: true,
      message: "Payment verified",
      order: updated
    });

  } catch (err) {
    res.status(500).json({
      message: "Payment verification failed"
    });
  }
};

// GET ALL ORDERS
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch orders"
    });
  }
};

// TRACK ORDER
export const trackOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    res.json({
      status: order.status
    });

  } catch (err) {
    res.status(500).json({
      message: "Tracking failed"
    });
  }
};

// GET USER ORDERS
export const getMyOrders = async (req, res) => {
  try {
    const { username } = req.params;

    const orders = await Order.find({ username }).sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch user orders"
    });
  }
};

// UPDATE ORDER STATUS
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      success: true,
      message: "Order status updated",
      order: updated
    });

  } catch (err) {
    res.status(500).json({
      message: "Status update failed"
    });
  }
};