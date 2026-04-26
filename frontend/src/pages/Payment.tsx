import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { QRCodeCanvas } from "qrcode.react"; // NEW

const Payment = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { formData, items, total } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [utr, setUtr] = useState("");
  const [loading, setLoading] = useState(false);

  const username = localStorage.getItem("username");

  const orderId = `POW${Date.now().toString().slice(-8)}`;

  // NEW (Dynamic UPI Link for QR)
  const upiLink =
    `upi://pay?pa=7731983479@ybl&pn=Karampudi%20baskar&am=${total}&cu=INR&tn=VOVFoodsOrder`;

  const copyUPI = () => {
    navigator.clipboard.writeText("7731983479@ybl");
    alert("UPI ID copied");
  };

  const placeOrder = async () => {

    if (!formData || !items) {
      alert("Order data missing");
      return;
    }

    if (paymentMethod === "UPI" && !utr) {
      alert("Please enter UTR number");
      return;
    }

    const orderData = {

      orderRef: orderId,
      username: username,
      name: formData.name,
      phone: formData.phone,

      address: `${formData.address}, ${formData.city} - ${formData.pincode}`,

      paymentMethod: paymentMethod,

      utr: paymentMethod === "UPI" ? utr : null,

      paymentStatus:
        paymentMethod === "UPI"
          ? "Pending Verification"
          : "Pending",

      items: items.map((item:any)=>({
        productId: item.product._id || item.product.id,
        name: item.product.name,
        image: item.product.image,
        qty: item.quantity,
        weight: item.selectedWeight,
        price: item.price
      })),

      totalAmount: total

    };

    try {

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/order",
        orderData
      );

      if (res.data.success) {

        navigate("/order-success", {
          state: {
            orderId,
            total,
            items,
            createdAt: new Date().toISOString()
          }
        });

      }

    } catch (error) {

      console.error("Order error:", error);
      alert("Order failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 py-6">

      <div className="max-w-6xl mx-auto px-4">

        <motion.div initial={{opacity:0}} animate={{opacity:1}}>

          <h1 className="text-2xl lg:text-3xl font-bold mb-6 text-center lg:text-left">
            Select Payment Method
          </h1>

          <div className="grid lg:grid-cols-3 gap-6">

            {/* PAYMENT OPTIONS */}

            <div className="lg:col-span-2 space-y-4">

              {/* COD */}

              <div className="bg-white p-5 rounded-xl shadow">

                <label className="flex items-center gap-3 cursor-pointer">

                  <input
                    type="radio"
                    value="Cash on Delivery"
                    checked={paymentMethod === "Cash on Delivery"}
                    onChange={(e)=>setPaymentMethod(e.target.value)}
                  />

                  <div>

                    <p className="font-semibold">
                      Cash on Delivery
                    </p>

                    <p className="text-sm text-gray-500">
                      Pay when your order arrives
                    </p>

                  </div>

                </label>

              </div>


              {/* UPI PAYMENT */}

              <div className="bg-white p-5 rounded-xl shadow space-y-4">

                <label className="flex items-center gap-3 cursor-pointer">

                  <input
                    type="radio"
                    value="UPI"
                    checked={paymentMethod === "UPI"}
                    onChange={(e)=>setPaymentMethod(e.target.value)}
                  />

                  <div>

                    <p className="font-semibold">
                      UPI Payment
                    </p>

                    <p className="text-sm text-gray-500">
                      PhonePe / Google Pay / Paytm
                    </p>

                  </div>

                </label>


                {paymentMethod === "UPI" && (

                  <div className="space-y-5">

                    {/* AMOUNT */}

                    <div className="text-center bg-green-50 p-3 rounded-lg">

                      <p className="text-sm text-gray-600">
                        Pay Amount
                      </p>

                      <p className="text-2xl font-bold text-green-600">
                        ₹{total}
                      </p>

                    </div>


                    {/* DYNAMIC QR */}

                    <div className="flex justify-center">

                      <QRCodeCanvas
                        value={upiLink}
                        size={200}
                      />

                    </div>

                    <p className="text-center text-sm text-gray-500">
                      Scan QR using PhonePe / Google Pay
                    </p>


                    {/* UPI ID */}

                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded">

                      <span className="text-sm">
                        9121971848@ybl
                      </span>

                      <button
                        onClick={copyUPI}
                        className="text-xs bg-black text-white px-3 py-1 rounded"
                      >
                        Copy
                      </button>

                    </div>


                    {/* UPI BUTTONS */}

                    <div className="grid grid-cols-2 gap-3">

                      <a
                        href={upiLink}
                        className="bg-purple-600 text-white text-center py-2 rounded-lg font-medium"
                      >
                        PhonePe
                      </a>

                      <a
                        href={upiLink}
                        className="bg-green-600 text-white text-center py-2 rounded-lg font-medium"
                      >
                        Google Pay
                      </a>

                    </div>


                    {/* UTR INPUT */}

                    <input
                      type="text"
                      placeholder="Enter UTR Number after payment"
                      value={utr}
                      onChange={(e)=>setUtr(e.target.value)}
                      className="w-full border rounded-lg p-3"
                    />

                  </div>

                )}

              </div>

            </div>


            {/* ORDER SUMMARY */}

            <div>

              <div className="bg-white rounded-xl p-5 shadow space-y-4">

                <h3 className="text-lg font-semibold">
                  Order Summary
                </h3>

                <div className="space-y-3 max-h-64 overflow-auto">

                  {items?.map((item:any)=>(

                    <div key={item.product.id} className="flex gap-3">

                      <img
                        src={item.product.image}
                        className="w-14 h-14 rounded object-cover"
                      />

                      <div>

                        <p className="text-sm font-medium">
                          {item.product.name}
                        </p>

                        <p className="text-xs text-gray-500">
                          {item.selectedWeight} × {item.quantity}
                        </p>

                        <p className="font-semibold">
                          ₹{item.price * item.quantity}
                        </p>

                      </div>

                    </div>

                  ))}

                </div>

                <div className="border-t pt-3">

                  <div className="flex justify-between text-lg font-bold">

                    <span>Total</span>
                    <span>₹{total}</span>

                  </div>

                </div>

                <Button
                  className="w-full mt-3"
                  onClick={placeOrder}
                  disabled={loading}
                >

                  {loading ? "Placing Order..." : "Confirm Order"}

                </Button>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </div>

  );

};

export default Payment;