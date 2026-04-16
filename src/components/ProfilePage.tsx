import React from "react";
import { motion } from "motion/react";
import { User, Mail, MapPin, Calendar, Settings, LogOut, ShieldCheck, Award, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isJoinedCommunity");
    window.dispatchEvent(new Event("communityStatusChanged"));
    navigate("/");
  };

  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="container-custom max-w-5xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 text-center">
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center text-primary border-4 border-white shadow-lg">
                  <User size={64} />
                </div>
                <div className="absolute bottom-1 right-1 w-8 h-8 bg-green-500 border-4 border-white rounded-full"></div>
              </div>
              <h2 className="text-2xl font-bold text-dark mb-1">John Doe</h2>
              <p className="text-slate-500 text-sm mb-6">Member Premium</p>
              
              <div className="flex justify-center gap-4 py-4 border-t border-slate-50">
                <div className="text-center">
                  <p className="text-xl font-bold text-dark">12</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Events</p>
                </div>
                <div className="w-px h-8 bg-slate-100 self-center"></div>
                <div className="text-center">
                  <p className="text-xl font-bold text-dark">5</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Aset</p>
                </div>
                <div className="w-px h-8 bg-slate-100 self-center"></div>
                <div className="text-center">
                  <p className="text-xl font-bold text-dark">2k</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Poin</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-6 shadow-xl border border-slate-100">
              <nav className="space-y-2">
                <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl bg-primary/5 text-primary font-bold transition-all">
                  <User size={20} />
                  Detail Profil
                </button>
                <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-slate-500 hover:bg-slate-50 font-bold transition-all">
                  <Settings size={20} />
                  Pengaturan
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-red-500 hover:bg-red-50 font-bold transition-all"
                >
                  <LogOut size={20} />
                  Keluar Akun
                </button>
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-slate-100">
              <h3 className="text-2xl font-bold text-dark mb-8">Informasi Pribadi</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email</p>
                  <div className="flex items-center gap-3 text-dark font-medium">
                    <Mail size={18} className="text-primary" />
                    john.doe@example.com
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Lokasi</p>
                  <div className="flex items-center gap-3 text-dark font-medium">
                    <MapPin size={18} className="text-primary" />
                    Bandung, Jawa Barat
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Bergabung Sejak</p>
                  <div className="flex items-center gap-3 text-dark font-medium">
                    <Calendar size={18} className="text-primary" />
                    15 April 2024
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Status Akun</p>
                  <div className="flex items-center gap-3 text-green-500 font-bold">
                    <ShieldCheck size={18} />
                    Terverifikasi
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-yellow-100 text-yellow-600 flex items-center justify-center mb-6">
                  <Award size={24} />
                </div>
                <h4 className="text-lg font-bold text-dark mb-2">Pencapaian</h4>
                <p className="text-slate-500 text-sm">Anda telah menyelesaikan 5 workshop sertifikasi halal.</p>
              </div>
              <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-6">
                  <Heart size={24} />
                </div>
                <h4 className="text-lg font-bold text-dark mb-2">Favorit</h4>
                <p className="text-slate-500 text-sm">8 template desain telah Anda simpan di koleksi favorit.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
