import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import axios from "axios";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Category from "./pages/Category";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";
import SearchPage from "./pages/Search";
import FindStore from "./pages/FindStore";
import Support from "./pages/Support";
import TrackOrder from "./pages/TrackOrder";
import Offers from "./pages/Offers";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import TrackSearch from "./pages/TrackSearch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import MyOrders from "./pages/MyOrders";

// ✅ FIXED IMPORTS
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import Terms from "./pages/Terms";

import ScrollToTop from "./components/ScrollToTop";
import AdminPayments from "./pages/AdminPayments";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import Orders from "./admin/Orders";
import ProductsAdmin from "./admin/Products";
import AddProduct from "./admin/AddProduct";

const queryClient = new QueryClient();

// backend API
const API = "http://localhost:5000/api";

const AppLayout = () => {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");
  const isHomePage = location.pathname === "/";

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // visitor counter
  useEffect(() => {
    axios.get(`${API}/visitor/visit`).catch(() => {});
  }, []);

  const showFooter = !isAdminPage && (!isMobile || (isMobile && isHomePage));

  return (
    <div className="flex flex-col min-h-screen">

      {/* Navbar */}
      {!isAdminPage && <Navbar />}

      <main className="flex-1 pb-[200px] lg:pb-0">

        <ScrollToTop />

        <Routes>

          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/find-store" element={<FindStore />} />
          <Route path="/support" element={<Support />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/payment" element={<Payment />} />

          {/* Policy pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/terms" element={<Terms />} />

          <Route path="/admin-payments" element={<AdminPayments />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Orders */}
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/my-orders" element={<MyOrders />} />

          {/* Tracking */}
          <Route path="/track-order" element={<TrackSearch />} />
          <Route path="/track/:orderId" element={<TrackOrder />} />

          {/* Admin */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-orders" element={<Orders />} />
          <Route path="/admin-products" element={<ProductsAdmin />} />
          <Route path="/admin-add-product" element={<AddProduct />} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </main>

      {/* Footer */}
      {showFooter && <Footer />}

      {/* WhatsApp */}
      {!isAdminPage && <WhatsAppButton />}

    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;