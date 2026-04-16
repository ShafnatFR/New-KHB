import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Search, Filter, Maximize2 } from "lucide-react";

const galleryImages = [
  { id: 1, src: "https://picsum.photos/seed/workshop1/800/600", title: "Workshop Sertifikasi Halal", category: "Workshop", desc: "Pelatihan intensif bagi pelaku UMKM Bandung." },
  { id: 2, src: "https://picsum.photos/seed/expo1/800/600", title: "Halal Expo 2024", category: "Expo", desc: "Pameran produk unggulan komunitas halal." },
  { id: 3, src: "https://picsum.photos/seed/net1/800/600", title: "Networking Night", category: "Networking", desc: "Pertemuan strategis antar pengusaha muslim." },
  { id: 4, src: "https://picsum.photos/seed/workshop2/800/600", title: "Pelatihan Branding", category: "Workshop", desc: "Membangun identitas produk yang kuat." },
  { id: 5, src: "https://picsum.photos/seed/expo2/800/600", title: "Bazaar Ramadhan", category: "Expo", desc: "Pasar rakyat produk halal terkurasi." },
  { id: 6, src: "https://picsum.photos/seed/net2/800/600", title: "Kunjungan Industri", category: "Networking", desc: "Belajar langsung dari pabrik bersertifikat." },
  { id: 7, src: "https://picsum.photos/seed/workshop3/800/600", title: "Digital Marketing", category: "Workshop", desc: "Strategi online untuk pasar halal." },
  { id: 8, src: "https://picsum.photos/seed/expo3/800/600", title: "Festival Kuliner", category: "Expo", desc: "Eksplorasi rasa kuliner halal Bandung." },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState("Semua");
  const categories = ["Semua", "Workshop", "Networking", "Expo"];

  const filteredImages = filter === "Semua" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  return (
    <div className="pt-20">
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-bold tracking-widest uppercase text-xs mb-4">Dokumentasi</p>
            <h1 className="text-5xl font-extrabold text-dark mb-6">Galeri Komunitas</h1>
            <p className="text-lg text-slate-600">
              Melihat kembali momen-momen berharga dalam perjalanan kami mendukung UMKM Halal di Bandung.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-3 rounded-2xl font-bold transition-all ${
                  filter === cat 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((img) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl"
                >
                  <img 
                    src={img.src} 
                    alt={img.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <span className="text-primary text-xs font-bold uppercase tracking-wider mb-2">{img.category}</span>
                    <h3 className="text-white text-xl font-bold mb-2">{img.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-4">{img.desc}</p>
                    <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors">
                      <Maximize2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
