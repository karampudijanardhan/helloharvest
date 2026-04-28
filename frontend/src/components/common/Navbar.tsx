import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  ShoppingBag,
  MapPin,
  Phone,
  Gift,
  Home,
  LogOut,
  User,
  Package
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },

  { name: "Fruit & Veg Powders", path: "/category/fruit-veg" },
  { name: "Leaf Powders", path: "/category/leaf" },
  { name: "Spice Powders", path: "/category/spices" },

  { name: "Millets", path: "/category/millets" },
  { name: "Honey", path: "/category/others" },   // ✅ FIXED
  { name: "Pickles", path: "/category/pickles" },

  { name: "Offers", path: "/offers" }
];

export const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  const navigate = useNavigate();

  // 🔐 ADMIN SECRET
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<number | null>(null);

  const handleAdminClicks = () => {
    clickCountRef.current++;

    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

    clickTimerRef.current = window.setTimeout(() => {
      clickCountRef.current = 0;
    }, 1500);

    if (clickCountRef.current === 3) {
      clickCountRef.current = 0;

      const pass = prompt("Admin access code:");
      if (pass !== "vov123") {
        alert("❌ Wrong code");
        return;
      }

      navigate("/admin-login");
    }
  };

  // ✅ LOGIN STATE FIX
  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkLogin();

    window.addEventListener("focus", checkLogin);
    window.addEventListener("storage", checkLogin);
    window.addEventListener("login-success", checkLogin);

    return () => {
      window.removeEventListener("focus", checkLogin);
      window.removeEventListener("storage", checkLogin);
      window.removeEventListener("login-success", checkLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
  };

  return (
<header className="sticky top-0 z-50 w-full">

{/* TOP BAR */}
<div className="bg-green-700 text-white text-sm py-2">
  <div className="container flex justify-between items-center">

    <div className="flex items-center gap-4">
      <a href="tel:+917893064679" className="flex items-center gap-1 hover:text-green-200 transition">
        <Phone className="w-3 h-3" />
        <span className="hidden sm:inline">+91 7893064679</span>
      </a>

      <Link to="/find-store" className="flex items-center gap-1 hover:text-green-200 transition">
        <MapPin className="w-3 h-3" />
        <span className="hidden sm:inline">Find a Store</span>
      </Link>
    </div>

    <Link to="/offers" className="flex items-center gap-1 hover:text-green-200 transition">
      <Gift className="w-3 h-3" />
      <span>Get 20% Off on First Order!</span>
    </Link>

  </div>
</div>

{/* NAVBAR */}
<nav className="bg-background border-b">
<div className="container py-4">

{/* TOP ROW */}
<div className="flex items-center justify-between gap-4">

{/* LOGO */}
{/* Logo Icon */}
  {/* LOGO */}
<div
  className="flex items-center gap-3 cursor-pointer select-none"
  onClick={handleAdminClicks}
>
  {/* Circle Logo */}
  <div className="w-15 h-14 rounded-full overflow-hidden border-2 border-green-600 shadow-md hover:scale-105 transition-all duration-300">
  <img
    src="/white logo.png"
    alt="HelloHarvest Pure Powders Logo"
    className="w-full h-full object-cover"
  />
</div>

  {/* Brand Text */}
  <div className="hidden sm:flex flex-col leading-tight">
    <h1 className="font-display font-bold text-lg text-foreground">
      HelloHarvest
    </h1>
    <span className="text-xs text-muted-foreground tracking-wide">
      Pure Powders
    </span>
  </div>
</div>

{/* SEARCH */}
<form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
<div className="relative w-full">
<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
<Input
type="search"
placeholder="Search powders..."
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
className="pl-10"
/>
</div>
</form>

{/* RIGHT */}
<div className="flex items-center gap-2">

<Link to="/cart">
<Button variant="ghost" size="icon" className="relative">
<ShoppingCart className="w-6 h-6" />
{itemCount > 0 && (
<span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-xs flex items-center justify-center rounded-full">
{itemCount}
</span>
)}
</Button>
</Link>

<div className="hidden lg:flex gap-2 items-center">

  {!isLoggedIn ? (
    <Link to="/login">
      <Button
        size="sm"
        className="bg-green-700 hover:bg-green-500 text-white transition-all duration-300"
      >
        Login
      </Button>
    </Link>
  ) : (
    <>
      <Link to="/my-orders">
        <Button
          size="sm"
          className="bg-green-600 hover:bg-green-500 text-white transition-all duration-300"
        >
          My Orders
        </Button>
      </Link>

      <Button
  size="sm"
  onClick={handleLogout}
  className="bg-green-600 hover:bg-green-500 text-white transition-all duration-300"
>
  Logout
</Button>
    </>
  )}

</div>

<Button
variant="ghost"
size="icon"
className="lg:hidden"
onClick={() => setIsMenuOpen(!isMenuOpen)}
>
{isMenuOpen ? <X size={28}/> : <Menu size={28}/>}
</Button>

</div>
</div>

{/* DESKTOP MENU */}
<div className="hidden lg:flex gap-6 mt-4 border-t pt-4">
{navLinks.map((link) =>
link.submenu ? (
<div key={link.name} className="relative group">
<span>{link.name}</span>

<div className="absolute hidden group-hover:block bg-white shadow rounded">
{link.submenu.map((sub) => (
<Link key={sub.path} to={sub.path} className="block px-4 py-2">
{sub.name}
</Link>
))}
</div>
</div>
) : (
<Link key={link.path} to={link.path}>
{link.name}
</Link>
)
)}
</div>

</div>
</nav>

{/* MOBILE MENU */}
<AnimatePresence>
{isMenuOpen && (
<motion.div className="lg:hidden border-t bg-white">
<div className="flex flex-col">

{navLinks.map((link) =>
link.submenu ? (
<div key={link.name}>
<button
className="px-4 py-3 text-left w-full"
onClick={() =>
setOpenMobileMenu(openMobileMenu === link.name ? null : link.name)
}
>
{link.name}
</button>

{openMobileMenu === link.name && (
<div className="pl-6">
{link.submenu.map((sub) => (
<Link
key={sub.path}
to={sub.path}
className="block py-2"
onClick={() => setIsMenuOpen(false)}
>
{sub.name}
</Link>
))}
</div>
)}

</div>
) : (
<Link
key={link.path}
to={link.path}
className="px-4 py-3"
onClick={() => setIsMenuOpen(false)}
>
{link.name}
</Link>
)
)}

</div>
</motion.div>
)}
</AnimatePresence>

{/* MOBILE BOTTOM BAR */}
<div className="lg:hidden fixed bottom-0 w-full bg-white border-t flex justify-around py-3">

<Link to="/" className="flex flex-col items-center">
<Home size={22}/>
<span>Home</span>
</Link>

{isLoggedIn ? (
<Link to="/my-orders" className="flex flex-col items-center">
<Package size={22}/>
<span>Orders</span>
</Link>
) : (
<Link to="/products" className="flex flex-col items-center">
<ShoppingBag size={22}/>
<span>Products</span>
</Link>
)}

<Link to="/cart" className="flex flex-col items-center">
<ShoppingCart size={22}/>
<span>Cart</span>
</Link>

{isLoggedIn ? (
<button onClick={handleLogout} className="flex flex-col items-center">
<LogOut size={22}/>
<span>Logout</span>
</button>
) : (
<Link to="/login" className="flex flex-col items-center">
<User size={22}/>
<span>Login</span>
</Link>
)}

</div>

</header>
  );
};