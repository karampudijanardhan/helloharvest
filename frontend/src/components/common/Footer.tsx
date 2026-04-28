import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-emerald-700 via-green-800 to-emerald-800 text-white shadow-inner">
      
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">

              {/* Logo */}
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-green-600 hover:border-green-400 shadow-md hover:shadow-[0_0_10px_rgba(34,197,94,0.4)] hover:scale-105 transition-all duration-300">
  <img
    src="/white logo.png"
    alt="HelloHarvest Pure Powders Logo"
    className="w-full h-full object-cover"
  />
</div>

              <div>
                <h3 className="font-display font-bold text-xl">
                  HelloHarvest Pure Powders
                </h3>
                <p className="text-xs text-white/70">
                  Pure • Natural • Healthy
                </p>
              </div>
            </div>

            <p className="text-sm text-white/80 leading-relaxed">
              Natural dehydrated vegetable and fruit powders made with care to
              preserve nutrition, freshness, and taste for a healthier lifestyle.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              <a href="https://www.instagram.com/helloharvestpurepowder?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/@helloharvestpurepowders?si=5HMxOmbLr7z62Y_k" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-all">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: "All Products", path: "/products" },
  { name: "Fruit & Veg Powders", path: "/category/fruit-veg" },
  { name: "Leaf Powders", path: "/category/leaf" },
  { name: "Spice Powders", path: "/category/spices" },
  { name: "Millets", path: "/category/millets" },
  { name: "Honey", path: "/category/honey" },
  { name: "Pickles", path: "/category/pickles" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/80 hover:text-white transition-all"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">
              Customer Service
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Support", path: "/support" },
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/80 hover:text-white transition-all"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">
              Contact Us
            </h4>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-sm text-white/80">
                  Chittoor, Andhra Pradesh, India
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:+917893064679" className="text-sm text-white/80">
                  +91 7893064679
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <a
                  href="mailto:helloharvestpurepowders@gmail.com"
                  className="text-sm text-white/80"
                >
                  helloharvestpurepowders@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="container py-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/70">

          <p>© 2025 HelloHarvest Pure Powders. All rights reserved.</p>

          <div className="flex flex-wrap gap-4">
            <Link to="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/refund-policy" className="hover:text-white">
              Refund Policy
            </Link>
            <Link to="/shipping-policy" className="hover:text-white">
              Shipping Policy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms & Conditions
            </Link>
          </div>

        </div>

        {/* FSSAI */}
        <div className="text-center text-xs text-white/60 pb-7">
          FSSAI License No: 20126251000118
        </div>
      </div>

    </footer>
  );
};