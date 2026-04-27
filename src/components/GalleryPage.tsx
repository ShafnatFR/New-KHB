import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useCallback } from "react";
import { Maximize2 } from "lucide-react";
import { fetchPosts } from "../services/cms";
import type { CMSPost } from "../types/cms";
import { GridSkeleton, ImageCardSkeleton, ErrorState } from "./ui/LoadingSkeleton";

interface GalleryItem {
  id: number;
  src: string;
  title: string;
  category: string;
  desc: string;
}

function mapPostToGallery(post: CMSPost): GalleryItem {
  return {
    id:       post.id,
    src:      post.featured_image || `https://picsum.photos/seed/gallery${post.id}/800/600`,
    title:    post.title,
    category: post.category || "Galeri",
    desc:     post.excerpt || "",
  };
}

export default function GalleryPage() {
  const [allImages, setAllImages] = useState<GalleryItem[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState<string | null>(null);
  const [filter,    setFilter]    = useState("All");

  const loadGallery = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const posts = await fetchPosts();
      // Filter post yang kategorinya mengandung "galer", "foto", "dokumentasi", "photo"
      const galleryPosts = posts.filter(p =>
        p.category?.toLowerCase().includes("galer") ||
        p.category?.toLowerCase().includes("foto") ||
        p.category?.toLowerCase().includes("dokumentasi") ||
        p.category?.toLowerCase().includes("photo")
      );
      // Jika tidak ada yang spesifik, gunakan semua post sebagai galeri
      const source = galleryPosts.length > 0 ? galleryPosts : posts;
      setAllImages(source.map(mapPostToGallery));
    } catch (err) {
      console.warn("[GalleryPage] Gagal fetch gallery:", err);
      setError("Gagal memuat galeri.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadGallery(); }, [loadGallery]);

  // Kategori unik dari data
  const categories = ["All", ...Array.from(new Set(allImages.map(img => img.category).filter(Boolean)))];

  const filteredImages = filter === "All"
    ? allImages
    : allImages.filter(img => img.category === filter);

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

          {/* Filter tabs */}
          {!loading && !error && (
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
          )}

          {/* Content */}
          {loading ? (
            <GridSkeleton count={6} CardComponent={ImageCardSkeleton} />
          ) : error ? (
            <ErrorState message={error} onRetry={loadGallery} />
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                      <span className="text-primary text-xs font-bold uppercase tracking-wider mb-2">{img.category}</span>
                      <h3 className="text-white text-xl font-bold mb-2">{img.title}</h3>
                      {img.desc && <p className="text-white/70 text-sm leading-relaxed mb-4">{img.desc}</p>}
                      <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors">
                        <Maximize2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!loading && !error && filteredImages.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-400 text-lg">Belum ada foto di kategori ini.</p>
              <button onClick={() => setFilter("All")} className="text-primary font-bold mt-4">Tampilkan Semua</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
