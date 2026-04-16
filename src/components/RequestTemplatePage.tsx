import { motion } from "motion/react";
import { Plus, MessageSquare, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useState } from "react";

export default function RequestTemplatePage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-32 pb-20 container-custom min-h-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[3rem] shadow-2xl text-center max-w-md border border-slate-100"
        >
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-bold text-dark mb-4">Permintaan Terkirim!</h2>
          <p className="text-slate-500 mb-10">Kami telah menerima permintaan template Anda. Tim desainer kami akan segera memprosesnya.</p>
          <Link to="/repository" className="inline-block bg-primary text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">
            Kembali ke Repository
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom max-w-4xl">
        <Link to="/repository" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-bold mb-8 transition-colors">
          <ArrowLeft size={20} />
          Kembali
        </Link>
        
        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-slate-100">
          <div className="mb-12">
            <h1 className="text-4xl font-extrabold text-dark mb-4">Request Template.</h1>
            <p className="text-slate-500 text-lg">Butuh desain khusus untuk bisnis Anda? Beritahu kami template apa yang Anda butuhkan.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-dark ml-2">Jenis Template yang Dibutuhkan</label>
              <input 
                required
                type="text" 
                placeholder="Contoh: Banner Promo Diskon Idul Fitri"
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-dark ml-2">Kategori</label>
                <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all appearance-none">
                  <option>Media Elektronik (IG, WA, TikTok)</option>
                  <option>Media Cetak (Flyer, Banner, Poster)</option>
                  <option>Lainnya</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-dark ml-2">Tingkat Urgensi</label>
                <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all appearance-none">
                  <option>Biasa</option>
                  <option>Penting</option>
                  <option>Mendesak</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-dark ml-2">Detail & Referensi</label>
              <textarea 
                required
                rows={5}
                placeholder="Jelaskan detail desain, warna yang diinginkan, atau sertakan link referensi jika ada..."
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none"
              ></textarea>
            </div>

            <button type="submit" className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all flex items-center justify-center gap-3">
              <Plus size={24} />
              Kirim Permintaan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
