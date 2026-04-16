import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from "lucide-react";
import React, { useState } from "react";

export default function ContactUs() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to a backend
    console.log("Form submitted:", formState);
    alert("Terima kasih! Pesan Anda telah terkirim. Tim kami akan segera menghubungi Anda.");
    setFormState({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: <Phone className="text-primary" size={24} />,
      title: "Telepon / WhatsApp",
      details: ["+62 812-3456-7890", "+62 812-9876-5432"],
      action: "Hubungi Sekarang"
    },
    {
      icon: <Mail className="text-primary" size={24} />,
      title: "Email Resmi",
      details: ["info@khb-bandung.com", "support@khb-bandung.com"],
      action: "Kirim Email"
    },
    {
      icon: <MapPin className="text-primary" size={24} />,
      title: "Lokasi Kantor",
      details: ["Jl. Braga No. 123, Sumur Bandung", "Kota Bandung, Jawa Barat 40111"],
      action: "Lihat di Maps"
    }
  ];

  return (
    <div className="pt-20">
      {/* Header Section */}
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-primary font-bold tracking-widest uppercase text-xs mb-4">Hubungi Kami</p>
            <h1 className="text-5xl font-extrabold text-dark mb-6">Mari Berdiskusi.</h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Punya pertanyaan tentang sertifikasi halal atau ingin bergabung dengan komunitas? Kami siap membantu pertumbuhan bisnis Anda.
            </p>
          </motion.div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      </section>

      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-100"
            >
              <h2 className="text-3xl font-bold text-dark mb-8">Kirim Pesan</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Nama Lengkap</label>
                    <input
                      type="text"
                      required
                      placeholder="Masukkan nama Anda"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Alamat Email</label>
                    <input
                      type="email"
                      required
                      placeholder="email@contoh.com"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Subjek</label>
                  <input
                    type="text"
                    required
                    placeholder="Apa yang ingin Anda tanyakan?"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Pesan</label>
                  <textarea
                    required
                    rows={6}
                    placeholder="Tuliskan pesan Anda di sini..."
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-primary text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all"
                >
                  <Send size={20} />
                  Kirim Pesan Sekarang
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Sidebar */}
            <div className="space-y-8">
              {contactInfo.map((info, idx) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 group hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all duration-500"
                >
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                    {info.icon}
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-4">{info.title}</h3>
                  <div className="space-y-1 mb-6">
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-slate-500 font-medium">{detail}</p>
                    ))}
                  </div>
                  <button className="text-primary font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                    {info.action}
                    <Send size={16} />
                  </button>
                </motion.div>
              ))}

              {/* Business Hours Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-dark text-white p-8 rounded-[2rem] relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <Clock size={24} className="text-primary" />
                    <h3 className="text-xl font-bold">Jam Operasional</h3>
                  </div>
                  <div className="space-y-3 text-slate-400 text-sm">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span>Senin - Jumat</span>
                      <span className="text-white font-bold">08:00 - 17:00</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span>Sabtu</span>
                      <span className="text-white font-bold">09:00 - 14:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Minggu</span>
                      <span className="text-primary font-bold">Tutup</span>
                    </div>
                  </div>
                  <button className="w-full mt-8 bg-primary/20 hover:bg-primary/30 text-primary py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                    <MessageCircle size={18} />
                    Chat WhatsApp
                  </button>
                </div>
                {/* Decorative background circle */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.839833230495!2d107.6094!3d-6.9175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e630d00f339b%3A0x401576d14fed120!2sBandung%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
