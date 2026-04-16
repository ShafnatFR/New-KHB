import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Download, Monitor, Printer, Phone, Instagram, FileText, Video, MessageCircle, Layout, Image as ImageIcon, CreditCard, ChevronDown, Search, Plus, Upload } from "lucide-react";

const allTemplates = [
  { 
    id: 1, 
    title: "Template Poster Nuansa Ungu Buah-buahan", 
    mainCategory: "Media Cetak",
    subCategory: "Poster", 
    date: "2024-12-17",
    image: "https://picsum.photos/seed/repo1/800/1000",
    desc: "Poster ini didesain dengan tampilan modern dan elegan menggunakan nuansa ungu dan hijau."
  },
  { 
    id: 2, 
    title: "Template Poster Nuansa Hijau Ungu", 
    mainCategory: "Media Cetak",
    subCategory: "Poster", 
    date: "2024-12-17",
    image: "https://picsum.photos/seed/repo2/800/600",
    desc: "Desain poster informatif untuk kampanye produk halal."
  },
  { 
    id: 3, 
    title: "Template Poster Landscape Nuansa Hijau Ungu", 
    mainCategory: "Media Cetak",
    subCategory: "Poster", 
    date: "2024-12-17",
    image: "https://picsum.photos/seed/repo3/800/600",
    desc: "Format landscape untuk kebutuhan display digital atau cetak lebar."
  },
  { 
    id: 4, 
    title: "Template X-Banner Nuansa Biru Hijau", 
    mainCategory: "Media Cetak",
    subCategory: "X-Banner", 
    date: "2024-12-17",
    image: "https://picsum.photos/seed/repo4/800/1200",
    desc: "Banner berdiri untuk promosi di lokasi strategis."
  },
  { 
    id: 5, 
    title: "Template Kartu Nama Nuansa Alam Modern", 
    mainCategory: "Media Cetak",
    subCategory: "Kartu Nama", 
    date: "2024-12-17",
    image: "https://picsum.photos/seed/repo5/800/500",
    desc: "Kartu nama dengan sentuhan alam yang profesional."
  },
  { 
    id: 6, 
    title: "Template Feeds Instagram Nuansa Biru Langit", 
    mainCategory: "Media Elektronik",
    subCategory: "IG", 
    date: "2024-12-12",
    image: "https://picsum.photos/seed/repo6/800/800",
    desc: "Postingan feed Instagram yang cerah dan menarik."
  },
  { 
    id: 7, 
    title: "Template Flyer Nuansa Hijau Profesional", 
    mainCategory: "Media Cetak",
    subCategory: "Flyer", 
    date: "2024-12-17",
    image: "https://picsum.photos/seed/repo7/800/1100",
    desc: "Flyer informatif untuk distribusi massal."
  },
  { 
    id: 8, 
    title: "Template Instagram Story Coklat, Krem, Dan Kopi", 
    mainCategory: "Media Elektronik",
    subCategory: "IG", 
    date: "2024-12-17",
    image: "https://picsum.photos/seed/repo8/800/1400",
    desc: "Story Instagram dengan nuansa hangat dan estetik."
  },
  { 
    id: 9, 
    title: "Template Presentasi Bisnis Halal", 
    mainCategory: "Media Elektronik",
    subCategory: "PPT", 
    date: "2024-12-10",
    image: "https://picsum.photos/seed/repo9/800/600",
    desc: "Slide presentasi untuk kebutuhan pitching."
  },
  { 
    id: 10, 
    title: "Template Video Edukasi TikTok", 
    mainCategory: "Media Elektronik",
    subCategory: "TikTok", 
    date: "2024-12-05",
    image: "https://picsum.photos/seed/repo10/800/1400",
    desc: "Format video vertikal untuk konten edukatif."
  }
];

export default function RepositoryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  const activeMain = searchParams.get("main") || "Media Elektronik";
  const activeSub = searchParams.get("sub") || "Semua";

  const mainCategories = ["Media Elektronik", "Media Cetak"];
  
  const subCategories: Record<string, string[]> = {
    "Media Elektronik": ["Semua", "IG", "PPT", "TikTok", "WA"],
    "Media Cetak": ["Semua", "X-Banner", "Flyer", "Poster", "Kartu Nama"]
  };

  const filteredTemplates = allTemplates.filter(item => {
    const matchesMain = item.mainCategory === activeMain;
    const matchesSub = activeSub === "Semua" || item.subCategory === activeSub;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMain && matchesSub && matchesSearch;
  });

  const handleMainChange = (cat: string) => {
    setSearchParams({ main: cat, sub: "Semua" });
  };

  const handleSubChange = (sub: string) => {
    setSearchParams({ main: activeMain, sub });
  };

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-dark text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary rounded-full blur-[120px]" />
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <p className="text-primary font-bold tracking-widest uppercase text-xs mb-4">Design Resources</p>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Repository Desain.</h1>
            <p className="text-lg text-slate-400 mb-10">
              Kumpulan aset desain gratis untuk membantu branding dan pemasaran produk halal Anda. Siap pakai dan mudah disesuaikan.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all flex items-center gap-2">
                <Plus size={20} />
                Req Template
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all flex items-center gap-2">
                <Upload size={20} />
                Ajukan Template
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Navigation Area */}
      <section className="bg-white border-b border-slate-100 sticky top-20 z-40 shadow-sm">
        <div className="container-custom">
          <div className="flex flex-col gap-4 py-6">
            {/* Main Categories */}
            <div className="flex items-center gap-8 border-b border-slate-50 pb-4">
              {mainCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleMainChange(cat)}
                  className={`relative pb-4 text-sm font-bold transition-all ${activeMain === cat ? "text-primary" : "text-slate-400 hover:text-dark"}`}
                >
                  {cat}
                  {activeMain === cat && (
                    <motion.div 
                      layoutId="activeMain"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Sub Categories (Sub-nav) */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex flex-wrap gap-2">
                {subCategories[activeMain].map(sub => (
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
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-12">
        <div className="container-custom">
          {/* Active Filter Indicator */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <span>Repository</span>
              <span>/</span>
              <span className="text-dark font-bold">{activeMain}</span>
              {activeSub !== "Semua" && (
                <>
                  <span>/</span>
                  <span className="text-primary font-bold">{activeSub}</span>
                </>
              )}
            </div>
            <p className="text-sm text-slate-500 font-medium">
              Menampilkan {filteredTemplates.length} template
            </p>
          </div>

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
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-100" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="mb-4">
                      <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest block mb-1">
                        {item.date}
                      </span>
                      <h3 className="text-lg md:text-xl font-bold text-white leading-tight group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    
                    <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100">
                      <p className="text-white/70 text-sm mb-6 line-clamp-2">
                        {item.desc}
                      </p>
                      <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">
                        <Download size={16} />
                        Download Template
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredTemplates.length === 0 && (
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

      {/* Pagination Placeholder */}
      <section className="pb-24">
        <div className="container-custom flex justify-center">
          <div className="flex gap-2">
            {[1, 2, 3].map(num => (
              <button 
                key={num}
                className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${num === 1 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
              >
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

