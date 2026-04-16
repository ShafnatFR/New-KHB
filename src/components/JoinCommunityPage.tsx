import { motion } from "motion/react";
import { Users, CheckCircle, ArrowRight, ShieldCheck, Zap, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function JoinCommunityPage() {
  const navigate = useNavigate();

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6">
              <Users size={16} />
              <span>Bergabung dengan 2,000+ Member</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-dark mb-8 leading-tight">
              Tumbuh Bersama Komunitas <span className="text-primary">Halal Bandung.</span>
            </h1>
            <p className="text-xl text-slate-500 mb-12 leading-relaxed">
              Dapatkan akses eksklusif ke pelatihan, jaringan bisnis, dan sumber daya desain premium untuk meningkatkan skala bisnis Anda.
            </p>

            <div className="space-y-6 mb-12">
              {[
                { icon: <ShieldCheck className="text-green-500" />, title: "Akses Pelatihan Eksklusif", desc: "Workshop rutin bersama para ahli industri halal." },
                { icon: <Zap className="text-yellow-500" />, title: "Networking Bisnis", desc: "Terhubung dengan ribuan pengusaha lokal di Bandung." },
                { icon: <Heart className="text-red-500" />, title: "Dukungan Penuh", desc: "Bantuan konsultasi untuk sertifikasi dan legalitas halal." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-dark">{item.title}</h3>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => navigate("/auth")}
              className="w-full md:w-auto bg-primary text-white px-12 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-primary/30 hover:bg-primary-dark transition-all flex items-center justify-center gap-3"
            >
              Gabung Sekarang
              <ArrowRight size={24} />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-primary/20 rounded-[4rem] blur-3xl" />
            <img 
              src="https://picsum.photos/seed/community/800/1000" 
              alt="Community" 
              className="relative rounded-[3rem] shadow-2xl border-8 border-white"
              referrerPolicy="no-referrer"
            />
            
            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-xl border border-slate-100 max-w-[240px]">
              <div className="flex -space-x-3 mb-4">
                {[1,2,3,4].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/150?u=${i}`} className="w-10 h-10 rounded-full border-2 border-white" />
                ))}
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold border-2 border-white">
                  +2k
                </div>
              </div>
              <p className="text-sm font-bold text-dark">Member baru bergabung hari ini!</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
