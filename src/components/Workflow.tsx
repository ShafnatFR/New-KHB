import { motion } from "motion/react";
import { Store, FileText, Search, Users, ShieldCheck, Download } from "lucide-react";
import { Link } from "react-router-dom";

export default function Workflow() {
  const steps = [
    {
      id: "01",
      title: "Pelaku Usaha",
      desc: "Pendaftaran mandiri oleh UMKM.",
      icon: <Store size={24} />,
      active: false,
    },
    {
      id: "02",
      title: "Pendampingan PPH",
      desc: "Proses pendampingan produk halal.",
      icon: <FileText size={24} />,
      active: false,
    },
    {
      id: "03",
      title: "Verifikasi BPJPH",
      desc: "Pemeriksaan dokumen oleh otoritas.",
      icon: <Search size={24} />,
      active: false,
    },
    {
      id: "04",
      title: "Komite Fatwa",
      desc: "Sidang fatwa untuk ketetapan halal.",
      icon: <Users size={24} />,
      active: false,
    },
    {
      id: "05",
      title: "Terbit Sertifikat",
      desc: "BPJPH menerbitkan sertifikat resmi.",
      icon: <ShieldCheck size={24} />,
      active: false,
    },
    {
      id: "06",
      title: "Unduh Sertifikat",
      desc: "Siap untuk digunakan pada produk Anda.",
      icon: <Download size={24} />,
      active: true,
      href: "/layanan"
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Workflow</p>
          <h2 className="text-4xl font-extrabold text-dark">Tata Cara Sertifikasi Halal</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {steps.map((step, index) => {
            const CardContent = (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-6 rounded-2xl border transition-all duration-300 group h-full ${
                  step.active 
                    ? "bg-primary border-primary text-white shadow-xl shadow-primary/20" 
                    : "bg-white border-slate-100 hover:border-primary/30 hover:shadow-lg"
                }`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-3 rounded-xl ${step.active ? "bg-white/20" : "bg-slate-50 text-primary group-hover:bg-primary/10"}`}>
                    {step.icon}
                  </div>
                  <span className={`text-3xl font-black opacity-10 ${step.active ? "text-white" : "text-dark"}`}>
                    {step.id}
                  </span>
                </div>
                
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className={`text-sm leading-relaxed ${step.active ? "text-white/80" : "text-slate-500"}`}>
                  {step.desc}
                </p>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <div className="w-6 h-px bg-slate-200" />
                  </div>
                )}
              </motion.div>
            );

            return step.href ? (
              <Link key={step.id} to={step.href}>
                {CardContent}
              </Link>
            ) : (
              <div key={step.id}>
                {CardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

