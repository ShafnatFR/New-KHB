import { motion } from "motion/react";
import { Scale, Megaphone, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Ecosystem() {
  const benefits = [
    "Pendampingan One-on-One dengan Expert",
    "Audit Kesiapan Sertifikasi Halal secara Gratis",
    "Akses ke Jaringan Investor & Distribusi Halal",
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-2 gap-6">
            <Link to="/layanan">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-full hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-6">
                  <Scale size={24} />
                </div>
                <h3 className="font-bold text-xl mb-2 text-dark">Legal Aspect</h3>
                <p className="text-sm text-slate-500">NIB, IUMK, & Regulasi Bisnis</p>
              </motion.div>
            </Link>
            
            <Link to="/layanan">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-indigo-50 p-8 rounded-3xl shadow-sm border border-indigo-100 h-full hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                  <Megaphone size={24} />
                </div>
                <h3 className="font-bold text-xl mb-2 text-dark">Marketing</h3>
                <p className="text-sm text-slate-500">Halal Branding & Digital Strategy</p>
              </motion.div>
            </Link>
            
            <Link to="/layanan" className="col-span-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-primary p-8 rounded-3xl text-white relative overflow-hidden group"
              >
                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shrink-0">
                    <img src="https://picsum.photos/seed/collab/100/100" alt="Collab" className="w-12 h-12 rounded-lg" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl mb-2">KHB × Ko+Lab Collaboration</h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Managing business ecosystems through strategic partnership.
                    </p>
                  </div>
                </div>
                
                {/* Decorative background circle */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              </motion.div>
            </Link>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Strategic Ecosystem</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-dark leading-tight mb-6">
              UMKM Klinik: Solusi Terpadu Pertumbuhan Bisnis.
            </h2>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Kami tidak hanya memberikan label halal. Melalui kolaborasi strategis dengan Ko+Lab, UMKM Klinik KHB menyediakan akses konsultasi mendalam untuk manajemen operasional, optimasi pemasaran, hingga kepatuhan hukum yang menyeluruh.
            </p>
            
            <ul className="space-y-4">
              {benefits.map((benefit, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 text-slate-700 font-medium"
                >
                  <div className="text-primary shrink-0">
                    <CheckCircle2 size={20} />
                  </div>
                  {benefit}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

