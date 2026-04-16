import { motion, AnimatePresence } from "motion/react";
import { Calendar, MapPin, Users, ArrowRight, Bell, Search, Filter } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const allEvents = [
  {
    id: 1,
    title: "Bandung Halal Festival 2025",
    date: "2025-05-25",
    location: "Gedung Sate, Bandung",
    attendees: "5000+ Peserta",
    status: "Mendatang",
    image: "https://picsum.photos/seed/event1/800/500",
    category: "Kuliner"
  },
  {
    id: 2,
    title: "Workshop Sertifikasi Halal Gratis",
    date: "2025-06-12",
    location: "KHB Hub, Bandung",
    attendees: "100 UMKM",
    status: "Pendaftaran Dibuka",
    image: "https://picsum.photos/seed/event2/800/500",
    category: "Workshop Halal"
  },
  {
    id: 3,
    title: "Business Matching & Networking",
    date: "2025-07-05",
    location: "Hotel Savoy Homann",
    attendees: "50 Investor",
    status: "Mendatang",
    image: "https://picsum.photos/seed/event3/800/500",
    category: "Trading"
  }
];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = ["Semua", "Musik", "Lomba", "Trading", "Kuliner", "Budaya", "Keluarga", "Teknologi", "Olahraga", "Kesehatan", "Workshop Halal"];

  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Semua" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-20">
      <section className="py-20 bg-dark text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary rounded-full blur-[120px]" />
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <p className="text-primary font-bold tracking-widest uppercase text-xs mb-4">Agenda Komunitas</p>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Events & Kegiatan.</h1>
            <p className="text-lg text-slate-400 mb-8">
              Jangan lewatkan kesempatan untuk belajar, berjejaring, dan mengembangkan bisnis Anda melalui berbagai agenda rutin kami.
            </p>
            <Link to="/explore-events">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all flex items-center gap-2"
              >
                Jelajahi Semua Event
                <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>

        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container-custom">
          {/* Search Bar */}
          <div className="mb-8 bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100">
            <div className="relative w-full">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text"
                placeholder="Cari event atau lokasi..."
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white border border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-16 flex flex-wrap gap-3 items-center bg-white p-2 rounded-2xl overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-3 mr-4 text-slate-500 font-bold text-sm shrink-0">
              <Filter size={18} />
              Filter Kategori:
            </div>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event, idx) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500"
                >
                  <Link to={`/events/${event.id}`}>
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-md text-dark px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
                          {event.category}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-primary text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-primary/20">
                          {event.status}
                        </span>
                      </div>
                    </div>

                    <div className="p-8">
                      <h3 className="text-xl font-bold text-dark mb-6 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      
                      <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3 text-slate-500 text-sm">
                          <Calendar size={18} className="text-primary" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-3 text-slate-500 text-sm">
                          <MapPin size={18} className="text-primary" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-3 text-slate-500 text-sm">
                          <Users size={18} className="text-primary" />
                          {event.attendees}
                        </div>
                      </div>

                      <div className="w-full bg-white border border-slate-200 text-dark py-4 rounded-2xl font-bold group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all shadow-sm text-center">
                        Lihat Detail Event
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-400 text-lg">Tidak ada event yang sesuai dengan pencarian Anda.</p>
              <button 
                onClick={() => {setSearchQuery(""); setSelectedCategory("Semua");}}
                className="text-primary font-bold mt-4"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
