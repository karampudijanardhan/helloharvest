import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, User, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import axios from "axios"; // ✅ NEW

const Checkout = () => {

  const navigate = useNavigate();
  const { state } = useCart();
  const { items, subtotal } = state;

  const [savedAddresses, setSavedAddresses] = useState<any[]>(
    JSON.parse(localStorage.getItem("addresses") || "[]")
  );

  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  // ✅ SAME LOGIC (UNCHANGED)
  const FREE_DISTRICT = "nellore";
  const OUTSIDE_CHARGE = 30;
  const userLocation = `${formData.city}`.toLowerCase();

  const isFreeDistrict = userLocation.includes(FREE_DISTRICT);
  const deliveryCharge = isFreeDistrict ? 0 : OUTSIDE_CHARGE;
  const total = subtotal + deliveryCharge;

  const handleSubmit = async (e: any) => {

    e.preventDefault();

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!token || !username) {
      alert("దయచేసి ముందుగా Login చేయండి 🙏");
      navigate("/login");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    if (!formData.name || !formData.address || !formData.city || !formData.pincode) {
      alert("Please fill all delivery details");
      return;
    }

    let addresses = JSON.parse(localStorage.getItem("addresses") || "[]");

    const exists = addresses.find(
      (a: any) =>
        a.phone === formData.phone &&
        a.address === formData.address &&
        a.pincode === formData.pincode
    );

    if (!exists) {
      addresses.push(formData);
      localStorage.setItem("addresses", JSON.stringify(addresses));
      setSavedAddresses(addresses);
    }

    // ✅ NEW: BACKEND SAVE (ONLY ADDITION)
    try {
      await axios.post("http://localhost:5000/api/order", {
        username,
        name: formData.name,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city} - ${formData.pincode}`,
        paymentMethod: "Pending",

        items: items.map((item: any) => ({
          productId: item.product._id || item.product.id,
          name: item.product.name,
          image: item.product.image,
          qty: item.quantity,
          weight: item.selectedWeight,
          price: item.price
        })),

        totalAmount: total
      });
    } catch (err) {
      console.log("Order save failed");
    }

    // ✅ SAME FLOW (UNCHANGED)
    navigate("/payment", {
      state: {
        formData,
        items,
        subtotal,
        total
      }
    });

  };

  const handleChange = (e: any) => {

    const { name, value } = e.target;

    if (name === "phone") {
      const cleaned = value.replace(/\D/g, "").slice(0, 10);
      setFormData({ ...formData, phone: cleaned });
      return;
    }

    setFormData({
      ...formData,
      [name]: value
    });

  };

  const selectAddress = (index: number) => {
    setSelectedAddressIndex(index);
    setFormData(savedAddresses[index]);
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (

    <div className="min-h-screen bg-background">

      <div className="container py-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >

          <h1 className="font-display text-3xl font-bold text-foreground mb-8">
            Checkout
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2">

              {savedAddresses.length > 0 && (
                <div className="bg-card rounded-xl p-6 shadow-card mb-6">
                  <h3 className="font-semibold mb-4">Saved Addresses</h3>

                  <div className="space-y-3">

                    {savedAddresses.map((addr, index) => (
                      <div
                        key={index}
                        className="border p-3 rounded-lg cursor-pointer hover:bg-muted"
                        onClick={() => selectAddress(index)}
                      >
                        <p className="font-medium">{addr.name}</p>
                        <p className="text-sm">{addr.phone}</p>
                        <p className="text-sm text-muted-foreground">
                          {addr.address}, {addr.city} - {addr.pincode}
                        </p>
                      </div>
                    ))}

                  </div>
                </div>
              )}

              <Button
                type="button"
                variant="outline"
                className="mb-4"
                onClick={() =>
                  setFormData({
                    name: "",
                    phone: "",
                    address: "",
                    city: "",
                    pincode: "",
                  })
                }
              >
                Add New Address
              </Button>

              <form
                onSubmit={handleSubmit}
                className="bg-card rounded-xl p-6 shadow-card space-y-6"
              >

                <h2 className="font-display text-xl font-semibold flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Delivery Address
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">

                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="pl-10"
                        maxLength={10}
                        required
                      />
                    </div>
                  </div>

                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    placeholder="House/Flat No., Street, Landmark"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="Enter city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      placeholder="Enter pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gradient-saffron hover:opacity-90"
                >
                  Continue to Payment • ₹{total}
                </Button>

              </form>

            </div>

            {/* ORDER SUMMARY */}

            <div>

              <div className="bg-card rounded-xl p-6 shadow-card space-y-4 sticky top-32">

                <h3 className="font-display font-semibold text-lg">
                  Order Summary
                </h3>

                <div className="space-y-3 max-h-64 overflow-auto">

                  {items.map((item) => (

                    <div
                      key={`${item.product._id || item.product.id}-${item.selectedWeight}`}
                      className="flex gap-3"
                    >

                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />

                      <div className="flex-1 min-w-0">

                        <p className="font-medium text-sm line-clamp-1">
                          {item.product.name}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {item.selectedWeight} × {item.quantity}
                        </p>

                        <p className="font-semibold">
                          ₹{item.price * item.quantity}
                        </p>

                      </div>

                    </div>

                  ))}

                </div>

                <div className="border-t border-border pt-4 space-y-2 text-sm">

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="text-green-600">FREE</span>
                  </div>

                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>

                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                  <Truck className="w-4 h-4 text-primary" />
                  <span>Expected delivery: 3-5 business days</span>
                </div>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </div>

  );

};

export default Checkout;