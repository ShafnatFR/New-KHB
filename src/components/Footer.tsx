import { Phone, Clock, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const links = [
    { name: "Tentang Kami", href: "#" },
    { name: "Klinik UMKM", href: "/layanan" },
    { name: "Hubungi Kami", href: "/kontak" },
    { name: "Syarat & Ketentuan", href: "#" },
    { name: "Kebijakan Privasi", href: "#" },
  ];


  return (
    <footer className="bg-dark text-white pt-20 pb-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & About */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
                KHB
              </div>
              <span className="font-display font-bold text-2xl tracking-tight">KHB BANDUNG</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Komunitas Halal Bandung (KHB) berkomitmen untuk mengakselerasi pertumbuhan UMKM melalui ekosistem ekonomi halal yang terintegrasi dan profesional.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Tautan Cepat</h3>
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-slate-400 hover:text-primary transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          {/* Contact & Hours */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg mb-6">Hubungi Kami</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-primary mt-1" />
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold mb-1">WhatsApp Admin 1</p>
                  <a href="https://wa.me/6281234567890" className="text-sm text-slate-300 hover:text-white">+62 812-3456-7890</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-primary mt-1" />
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold mb-1">WhatsApp Admin 2</p>
                  <a href="https://wa.me/6289876543210" className="text-sm text-slate-300 hover:text-white">+62 898-7654-3210</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-primary mt-1" />
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold mb-1">Jam Layanan</p>
                  <p className="text-sm text-slate-300">Senin - Jumat: 08:00 - 17:00 WIB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location / Maps */}
          <div>
            <h3 className="font-bold text-lg mb-6">Lokasi Kami</h3>
            <div className="rounded-2xl overflow-hidden h-40 bg-slate-800 relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56347862248!2d107.5731164!3d-6.9034443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6398252477f%3A0x146a9440548d56a2!2sBandung%2C%20Bandung%20City%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1713212345678!5m2!1sen!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              ></iframe>
              <div className="absolute bottom-2 left-2 right-2 bg-dark/80 backdrop-blur-md p-2 rounded-lg flex items-center gap-2 pointer-events-none">
                <MapPin size={14} className="text-primary" />
                <span className="text-[10px] font-bold">Bandung, Jawa Barat</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-medium text-slate-500">
            © 2024 Komunitas Halal Bandung (KHB). All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[10px] font-bold text-slate-500 hover:text-white transition-colors">SITEMAP</a>
            <a href="#" className="text-[10px] font-bold text-slate-500 hover:text-white transition-colors">COOKIES</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

