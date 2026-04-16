import { motion } from "motion/react";
import { User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Layanan", href: "/layanan" },
    { name: "Events", href: "/events" },
    { name: "Repository", href: "#" },
    { name: "Gallery", href: "/galeri" },
    { name: "Contact Us", href: "/kontak" },
  ];



  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="container-custom py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
            KHB
          </div>
          <span className="font-display font-bold text-xl hidden sm:block">KHB Bandung</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`text-sm font-medium transition-colors ${
                location.pathname === link.href 
                  ? "text-primary font-bold" 
                  : "text-slate-600 hover:text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>


        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-dark text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition-colors"
          >
            Join Community
          </motion.button>
          <button className="p-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
            <User size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}
