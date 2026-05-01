import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Menu,
  LayoutDashboard,
  ShoppingCart,
  CreditCard,
  Package,
  LogOut,
  X
} from "lucide-react";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const activeLink = (path: string) =>
    location.pathname === path
      ? "bg-green-700 text-white"
      : "text-muted-foreground hover:bg-muted";

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white border p-2 rounded-lg shadow-md"
      >
        <Menu size={22} />
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full bg-card border-r shadow-lg
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}

          w-[80%] sm:w-[60%] md:w-[320px] lg:w-64
          flex flex-col justify-between
          lg:static lg:translate-x-0 lg:min-h-screen
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-xl font-bold text-green-700">
            Admin Panel
          </h2>

          {/* CLOSE BUTTON (MOBILE) */}
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* NAV LINKS */}
        <div className="p-4 space-y-2 flex-1 overflow-y-auto">

          <Link
            to="/admin-dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeLink("/admin-dashboard")}`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            to="/admin-orders"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeLink("/admin-orders")}`}
          >
            <ShoppingCart size={18} />
            Orders
          </Link>

          <Link
            to="/admin-payments"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeLink("/admin-payments")}`}
          >
            <CreditCard size={18} />
            Payments
          </Link>

          <Link
            to="/admin-products"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeLink("/admin-products")}`}
          >
            <Package size={18} />
            Products
          </Link>

        </div>

        {/* LOGOUT */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition flex items-center justify-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

      </aside>

      {/* MOBILE BOTTOM NAV */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-card border-t shadow-lg z-40 flex justify-around py-2">

        <Link to="/admin-dashboard" className="flex flex-col items-center text-xs">
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link to="/admin-orders" className="flex flex-col items-center text-xs">
          <ShoppingCart size={20} />
          Orders
        </Link>

        <Link to="/admin-payments" className="flex flex-col items-center text-xs">
          <CreditCard size={20} />
          Payments
        </Link>

        <Link to="/admin-products" className="flex flex-col items-center text-xs">
          <Package size={20} />
          Products
        </Link>

        <button
          onClick={handleLogout}
          className="flex flex-col items-center text-xs text-red-500"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>
    </>
  );
};

export default AdminSidebar;