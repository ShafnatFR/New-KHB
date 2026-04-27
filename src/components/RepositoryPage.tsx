import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Download, Search, Plus, Upload, ChevronDown } from "lucide-react";
import { fetchPosts } from "../services/cms";
import type { CMSPost } from "../types/cms";
import { GridSkeleton, ErrorState } from "./ui/LoadingSkeleton";

interface Template {
  id: number;
  title: string;
  mainCategory: string;
  subCategory: string;
  date: string;
  image: string;
  desc: string;
  slug: string;
}

function mapPostToTemplate(post: CMSPost): Template {
  // Gunakan category CMS: format "Media Elektronik / IG"
  const parts = (post.category || "Media Elektronik / Umum").split("/").map(s => s.trim());
  return {
    id:           post.id,
    title:        post.title,
    mainCategory: parts[0] || "Media Elektronik",
    subCategory:  parts[1] || "Semua",
    date:         post.created_at ? new Date(post.created_at).toLocaleDateString("id-ID") : "",
    image:        post.featured_image || `https://picsum.photos/seed/repo${post.id}/800/1000`,
    desc:         post.excerpt || "",
    slug:         post.slug,
  };
}

function TemplateSkeleton() {
  return (
    <div className="rounded-3xl overflow-hidden shadow-sm aspect-[4/5] bg-slate-200 animate-pulse" />
  );
}

export default function RepositoryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allTemplates, setAll]         = useState<Template[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState<string | null>(null);
  const [searchQuery,  setSearch]       = useState("");

  const activeMain = searchParams.get("main") || "";
  const activeSub  = searchParams.get("sub")  || "Semua";

  const loadTemplates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const posts = await fetchPosts();
      // Filter post yang kategorinya mengandung "template", "media", "desain"
      const repoPosts = posts.filter(p =>
        p.category?.toLowerCase().includes("template") ||
        p.category?.toLowerCase().includes("media") ||
        p.category?.toLowerCase().includes("desain") ||
        p.category?.toLowerCase().includes("cetak") ||
        p.category?.toLowerCase().includes("elektronik")
      );
      const source = repoPosts.length > 0 ? repoPosts : posts;
      setAll(source.map(mapPostToTemplate));
    } catch (err) {
      console.warn("[RepositoryPage] Gagal fetch templates:", err);
      setError("Gagal memuat repositori.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadTemplates(); }, [loadTemplates]);

  // Kategori dinamis dari data
  const mainCategories = Array.from(new Set(allTemplates.map(t => t.mainCategory)));
  const effectiveMain  = activeMain || mainCategories[0] || "Media Elektronik";

  const subCategories: Record<string, string[]> = {};
  mainCategories.forEach(main => {
    const subs = Array.from(new Set(
      allTemplates.filter(t => t.mainCategory === main).map(t => t.subCategory)
    ));
    subCategories[main] = ["Semua", ...subs.filter(s => s !== "Semua")];
  });

  const filteredTemplates = allTemplates.filter(item => {
    const matchesMain   = item.mainCategory === effectiveMain;
    const matchesSub    = activeSub === "Semua" || item.subCategory === activeSub;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMain && matchesSub && matchesSearch;
  });

  const handleMainChange = (cat: string) => setSearchParams({ main: cat, sub: "Semua" });
  const handleSubChange  = (sub: string) => setSearchParams({ main: effectiveMain, sub });

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 bg-dark text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary rounded-full blur-[120px]" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <p className="text-primary font-bold tracking-widest uppercase text-xs mb-4">Design Resources</p>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Repository Desain.</h1>
            <p className="text-lg text-slate-400 mb-10">
              Kumpulan aset desain gratis untuk membantu branding dan pemasaran produk halal Anda.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/repository/request" className="bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all flex items-center gap-2">
                <Plus size={20} /> Req Template
              </Link>
              <Link to="/repository/submit" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all flex items-center gap-2">
                <Upload size={20} /> Ajukan Template
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      {!loading && !error && mainCategories.length > 0 && (
        <section className="bg-white border-b border-slate-100 sticky top-20 z-40 shadow-sm">
          <div className="container-custom">
            <div className="flex flex-col gap-4 py-6">
              <div className="flex items-center gap-8 border-b border-slate-50 pb-4">
                {mainCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => handleMainChange(cat)}
                    className={`relative pb-4 text-sm font-bold transition-all ${effectiveMain === cat ? "text-primary" : "text-slate-400 hover:text-dark"}`}
                  >
                    {cat}
                    {effectiveMain === cat && (
                      <motion.div layoutId="activeMain" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-wrap gap-2">
                  {(subCategories[effectiveMain] || ["Semua"]).map(sub => (
                    <button
                      key={sub}
                      onClick={() => handleSubChange(sub)}
                      className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeSub === sub ? "bg-dark text-white shadow-lg" : "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-100"}`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>

                <div className="relative w-full md:w-64">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    placeholder="Cari template..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="py-12">
        <div className="container-custom">
          {!loading && !error && (
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <span>Repository</span><span>/</span>
                <span className="text-dark font-bold">{effectiveMain}</span>
                {activeSub !== "Semua" && (<><span>/</span><span className="text-primary font-bold">{activeSub}</span></>)}
              </div>
              <p className="text-sm text-slate-500 font-medium">Menampilkan {filteredTemplates.length} template</p>
            </div>
          )}

          {loading ? (
            <GridSkeleton count={6} CardComponent={TemplateSkeleton} />
          ) : error ? (
            <ErrorState message={error} onRetry={loadTemplates} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredTemplates.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/5]"
                  >
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-100" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <div className="mb-4">
                        {item.date && <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest block mb-1">{item.date}</span>}
                        <h3 className="text-lg md:text-xl font-bold text-white leading-tight group-hover:text-primary transition-colors">{item.title}</h3>
                      </div>
                      <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100">
                        {item.desc && <p className="text-white/70 text-sm mb-6 line-clamp-2">{item.desc}</p>}
                        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">
                          <Download size={16} /> Download Template
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {!loading && !error && filteredTemplates.length === 0 && (
            <div className="text-center py-32">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">Template tidak ditemukan</h3>
              <p className="text-slate-500">Coba gunakan kata kunci lain atau ganti filter kategori.</p>
            </div>
          )}
        </div>
      </section>

      {/* Pagination placeholder */}
      <section className="pb-24">
        <div className="container-custom flex justify-center">
          <div className="flex gap-2">
            {[1, 2, 3].map(num => (
              <button key={num} className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${num === 1 ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-slate-50 text-slate-400 hover:bg-slate-100"}`}>
                {num}
              </button>
            ))}
            <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-100 flex items-center justify-center">
              <ChevronDown size={16} className="-rotate-90" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
