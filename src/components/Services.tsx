import { motion } from "motion/react";
import { ShieldCheck, Scale, Megaphone, Users, Briefcase, Zap, ArrowRight } from "lucide-react";

export default function Services() {
  const mainServices = [
    {
      title: "Sertifikasi Halal",
      desc: "Pendampingan menyeluruh mulai dari pendaftaran BPJPH, audit internal, hingga terbitnya sertifikat halal resmi.",
      icon: <ShieldCheck size={32} />,
      color: "bg-primary",
      features: ["Pendampingan PPH", "Verifikasi Dokumen", "Sidang Fatwa"]
    },
    {
      title: "Legalitas Bisnis",
      desc: "Bantuan pengurusan izin usaha legal seperti NIB, IUMK, PIRT, dan regulasi bisnis lainnya untuk UMKM.",
      icon: <Scale size={32} />,
      color: "bg-secondary",
      features: ["Pengurusan NIB", "Izin PIRT", "Konsultasi Hukum"]
    },
    {
      title: "Halal Branding",
      desc: "Strategi pemasaran dan branding khusus untuk produk halal guna meningkatkan kepercayaan konsumen.",
      icon: <Megaphone size={32} />,
      color: "bg-indigo-500",
      features: ["Digital Strategy", "Logo Design", "Market Analysis"]
    }
  ];

  const additionalServices = [
    {
      title: "Konsultasi Bisnis",
      desc: "Sesi mentoring eksklusif dengan para ahli untuk mengoptimalkan operasional dan pertumbuhan bisnis Anda.",
      icon: <Briefcase size={24} />
    },
    {
      title: "Networking",
      desc: "Akses ke komunitas pengusaha halal di Bandung untuk kolaborasi dan perluasan jaringan distribusi.",
      icon: <Users size={24} />
    },
    {
      title: "Akselerasi Digital",
      desc: "Transformasi digital untuk UMKM agar siap bersaing di pasar online dan marketplace global.",
      icon: <Zap size={24} />
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[120px] rounded-full" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
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

      {/* Main Services Grid */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {mainServices.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-10 rounded-[2.5rem] border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500"
              >
                <div className={`w-16 h-16 ${service.color} text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-current/20`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-dark mb-4">{service.title}</h3>
                <p className="text-slate-500 mb-8 leading-relaxed">
                  {service.desc}
                </p>
                <ul className="space-y-3 mb-8">
                  {service.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
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
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-dark mb-4">Layanan Pendukung Lainnya</h2>
            <p className="text-slate-500">Selain layanan utama, kami juga menyediakan berbagai dukungan tambahan untuk ekosistem bisnis Anda.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {additionalServices.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 flex gap-6 items-start"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                  {service.icon}
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

      {/* CTA Section for Services */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Butuh Konsultasi Khusus?</h2>
              <p className="text-white/80 mb-10 max-w-2xl mx-auto">Tim ahli kami siap membantu Anda menentukan layanan mana yang paling sesuai dengan kebutuhan bisnis Anda saat ini.</p>
              <button className="bg-white text-primary px-10 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all shadow-xl">
                Hubungi Konsultan Kami
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
