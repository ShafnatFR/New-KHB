import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Info } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { CMSPost } from "../types/cms";

interface GalleryItem {
  id: number;
  src: string;
  title: string;
  desc: string;
  category: string;
}

// Static fallback
const STATIC_ITEMS: GalleryItem[] = [
  { id: 1, src: "https://picsum.photos/seed/community1/800/800", title: "Community Workshop", desc: "Sesi berbagi ilmu antar pengusaha.", category: "Workshop" },
  { id: 2, src: "https://picsum.photos/seed/community2/600/400", title: "Networking Night",   desc: "Membangun relasi strategis.",      category: "Networking" },
  { id: 3, src: "https://picsum.photos/seed/community3/600/400", title: "Expert Talk",        desc: "Diskusi panel dengan pakar industri.", category: "Workshop" },
  { id: 4, src: "https://picsum.photos/seed/community4/800/400", title: "Halal Expo",         desc: "Pameran produk unggulan UMKM.",    category: "Expo" },
  { id: 5, src: "https://picsum.photos/seed/community5/600/400", title: "Business Matching",  desc: "Pertemuan bisnis terarah.",        category: "Networking" },
  { id: 6, src: "https://picsum.photos/seed/community6/600/400", title: "Product Showcase",   desc: "Gelar produk lokal.",              category: "Expo" },
];

interface GalleryProps {
  /** Posts dari CMS; jika kosong atau tidak ada, pakai fallback statis */
  cmsItems?: CMSPost[];
}

export default function Gallery({ cmsItems = [] }: GalleryProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("Semua");

  // Map CMS posts ke GalleryItem, atau pakai statis
  const source: GalleryItem[] = cmsItems.length > 0
    ? cmsItems.map(p => ({
        id:       p.id,
        src:      p.featured_image || `https://picsum.photos/seed/gallery${p.id}/800/600`,
        title:    p.title,
        desc:     p.excerpt || "",
        category: p.category || "Galeri",
      }))
    : STATIC_ITEMS;

  // Kategori unik
  const categories = ["Semua", ...Array.from(new Set(source.map(i => i.category).filter(Boolean)))];

  const filteredItems = activeFilter === "Semua"
    ? source
    : source.filter(img => img.category === activeFilter);

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Community Moments</p>
            <h2 className="text-4xl font-extrabold text-dark mb-6">Galeri Komunitas Halal Bandung</h2>

            {/* Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    activeFilter === cat
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <Link
            to="/galeri"
            className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all group shrink-0"
          >
            Lihat Semua
            <ArrowUpRight size={20} className="group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setHoveredId(img.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`rounded-3xl overflow-hidden shadow-lg group relative h-[300px] transition-all duration-500 ${
                  hoveredId === img.id ? "ring-4 ring-primary/30 scale-[1.02]" : "ring-0"
                }`}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="bg-primary/20 backdrop-blur-md self-start px-2 py-1 rounded text-[10px] font-bold text-white mb-2 uppercase tracking-wider">
                    {img.category}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">{img.title}</h3>
                  {img.desc && <p className="text-white/70 text-xs">{img.desc}</p>}
                </div>

                <AnimatePresence>
                  {hoveredId === img.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white"
                    >
                      <Info size={16} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
