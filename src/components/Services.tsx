import { motion } from "motion/react";
import { ShieldCheck, Scale, Megaphone, Users, Briefcase, Zap, ArrowRight, Loader } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { fetchPosts, fetchPages, filterPostsByCategory, findPageBySlug } from "../services/cms";
import type { CMSPost } from "../types/cms";
import { ErrorState } from "./ui/LoadingSkeleton";

// Ikon berdasarkan kata kunci judul layanan
function resolveIcon(title: string, size = 32) {
  const t = title.toLowerCase();
  if (t.includes("halal") || t.includes("sertif"))  return <ShieldCheck size={size} />;
  if (t.includes("legal") || t.includes("izin"))     return <Scale size={size} />;
  if (t.includes("brand") || t.includes("market") || t.includes("promosi")) return <Megaphone size={size} />;
  if (t.includes("network") || t.includes("komunitas")) return <Users size={size} />;
  if (t.includes("konsultas") || t.includes("bisnis")) return <Briefcase size={size} />;
  return <Zap size={size} />;
}

// Warna bergilir untuk card utama
const MAIN_COLORS = ["bg-primary", "bg-secondary", "bg-indigo-500", "bg-teal-500", "bg-orange-500"];

interface ServiceCard {
  id: number;
  title: string;
  desc: string;
  features: string[];
  color: string;
}

// Mapping CMS post → service card
function mapPostToService(post: CMSPost, idx: number): ServiceCard {
  // Coba extract features dari content JSON
  let features: string[] = [];
  try {
    const content = post.content;
    if (content && typeof content === "object") {
      const blocks = Array.isArray(content) ? content : [content];
      for (const block of blocks) {
        const b = block as Record<string, unknown>;
        if (Array.isArray(b.features))  { features = b.features as string[]; break; }
        if (Array.isArray(b.list))      { features = b.list     as string[]; break; }
        if (Array.isArray(b.items))     { features = (b.items as Array<{label?: string; text?: string; title?: string}>)
            .map(i => i.label ?? i.text ?? i.title ?? "").filter(Boolean); break; }
      }
    }
  } catch { /* fallback */ }

  if (!features.length) {
    features = [post.category ?? "Layanan", "Konsultasi", "Pendampingan"];
  }

  return {
    id:       post.id,
    title:    post.title,
    desc:     post.excerpt || "Layanan profesional untuk mendukung pertumbuhan bisnis halal Anda.",
    features: features.slice(0, 4),
    color:    MAIN_COLORS[idx % MAIN_COLORS.length],
  };
}

// ── Static fallback ──────────────────────────────────────────
const STATIC_MAIN = [
  {
    id: -1, color: "bg-primary",
    title: "Sertifikasi Halal",
    desc: "Pendampingan menyeluruh mulai dari pendaftaran BPJPH, audit internal, hingga terbitnya sertifikat halal resmi.",
    features: ["Pendampingan PPH", "Verifikasi Dokumen", "Sidang Fatwa"],
  },
  {
    id: -2, color: "bg-secondary",
    title: "Legalitas Bisnis",
    desc: "Bantuan pengurusan izin usaha legal seperti NIB, IUMK, PIRT, dan regulasi bisnis lainnya untuk UMKM.",
    features: ["Pengurusan NIB", "Izin PIRT", "Konsultasi Hukum"],
  },
  {
    id: -3, color: "bg-indigo-500",
    title: "Halal Branding",
    desc: "Strategi pemasaran dan branding khusus untuk produk halal guna meningkatkan kepercayaan konsumen.",
    features: ["Digital Strategy", "Logo Design", "Market Analysis"],
  },
];
const STATIC_EXTRA = [
  { id: -4, title: "Konsultasi Bisnis", desc: "Sesi mentoring eksklusif dengan para ahli untuk mengoptimalkan operasional." },
  { id: -5, title: "Networking",        desc: "Akses ke komunitas pengusaha halal di Bandung untuk kolaborasi." },
  { id: -6, title: "Akselerasi Digital",desc: "Transformasi digital untuk UMKM agar siap bersaing di marketplace global." },
];

export default function Services() {
  const [mainServices, setMainServices]   = useState<ServiceCard[]>([]);
  const [extraServices, setExtraServices] = useState<ServiceCard[]>([]);
  const [loading, setLoading]             = useState(true);
  const [error,   setError]               = useState<string | null>(null);

  const loadServices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [posts, pages] = await Promise.all([fetchPosts(), fetchPages()]);

      // ── Cari dari Posts (kategori layanan/service/klinik)
      let servicePosts = filterPostsByCategory(posts, "layanan");
      if (!servicePosts.length) servicePosts = filterPostsByCategory(posts, "service");
      if (!servicePosts.length) servicePosts = filterPostsByCategory(posts, "klinik");
      if (!servicePosts.length) servicePosts = filterPostsByCategory(posts, "program");

      if (servicePosts.length > 0) {
        // Pisah 3 pertama ke main, sisanya ke extra
        setMainServices(servicePosts.slice(0, 3).map((p, i) => mapPostToService(p, i)));
        setExtraServices(servicePosts.slice(3).map((p, i) => ({
          id:    p.id,
          title: p.title,
          desc:  p.excerpt || "",
          features: [],
          color: MAIN_COLORS[i % MAIN_COLORS.length],
        })));
        return;
      }

      // ── Coba dari page slug "layanan"
      const layananPage = findPageBySlug(pages, "layanan");
      if (layananPage?.content) {
        try {
          const blocks = Array.isArray(layananPage.content)
            ? layananPage.content
            : [layananPage.content];
          const mapped: ServiceCard[] = (blocks as Array<Record<string, unknown>>)
            .filter(b => b.title)
            .slice(0, 3)
            .map((b, i) => ({
              id:       i,
              title:    String(b.title),
              desc:     String(b.description ?? b.body ?? b.desc ?? ""),
              features: Array.isArray(b.features) ? (b.features as string[]).slice(0, 4) : [],
              color:    MAIN_COLORS[i % MAIN_COLORS.length],
            }));
          if (mapped.length > 0) {
            setMainServices(mapped);
            return;
          }
        } catch { /* ignore */ }
      }

      // ── Fallback statis
      setMainServices(STATIC_MAIN);
      setExtraServices(STATIC_EXTRA as unknown as ServiceCard[]);
    } catch (err) {
      console.warn("[Services] Gagal fetch:", err);
      setError("Gagal memuat layanan dari CMS.");
      setMainServices(STATIC_MAIN);
      setExtraServices(STATIC_EXTRA as unknown as ServiceCard[]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadServices(); }, [loadServices]);

  // Loading state
  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <Loader size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[120px] rounded-full" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <p className="text-primary font-bold tracking-widest uppercase text-xs mb-4">Layanan Kami</p>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Solusi Terpadu untuk <br />
              <span className="text-primary">Pertumbuhan Bisnis</span> Anda.
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              Kami menyediakan berbagai layanan pendampingan profesional untuk memastikan bisnis UMKM Anda naik kelas, legal, dan terverifikasi halal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Error banner (tapi fallback statis tetap muncul) */}
      {error && (
        <div className="bg-yellow-50 border-b border-yellow-100 text-yellow-700 text-sm text-center py-2 px-4">
          {error} — Menampilkan data statis sementara.
        </div>
      )}

      {/* Main Services Grid */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {mainServices.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-10 rounded-[2.5rem] border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500"
              >
                <div className={`w-16 h-16 ${service.color} text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-current/20`}>
                  {resolveIcon(service.title)}
                </div>
                <h3 className="text-2xl font-bold text-dark mb-4">{service.title}</h3>
                <p className="text-slate-500 mb-8 leading-relaxed">{service.desc}</p>
                {service.features.length > 0 && (
                  <ul className="space-y-3 mb-8">
                    {service.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
                <button className="flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                  Pelajari Selengkapnya
                  <ArrowRight size={18} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      {extraServices.length > 0 && (
        <section className="py-24 bg-slate-50">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-extrabold text-dark mb-4">Layanan Pendukung Lainnya</h2>
              <p className="text-slate-500">Selain layanan utama, kami juga menyediakan berbagai dukungan tambahan untuk ekosistem bisnis Anda.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {extraServices.map((service, idx) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-8 rounded-3xl border border-slate-100 flex gap-6 items-start"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                    {resolveIcon(service.title, 24)}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-dark mb-2">{service.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{service.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Butuh Konsultasi Khusus?</h2>
              <p className="text-white/80 mb-10 max-w-2xl mx-auto">
                Tim ahli kami siap membantu Anda menentukan layanan mana yang paling sesuai dengan kebutuhan bisnis Anda saat ini.
              </p>
              <a
                href="https://wa.me/6281234567890?text=Halo%20KHB%2C%20saya%20ingin%20konsultasi%20layanan"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-white text-primary px-10 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all shadow-xl">
                  Hubungi Konsultan Kami
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
