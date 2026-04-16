import { motion, AnimatePresence } from "motion/react";
import { Search, Filter, Calendar, MapPin, ArrowRight, Star, TrendingUp, Clock } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const allEvents = [
  {
    id: 1,
    title: "Bandung Halal Festival 2025",
    date: "2025-05-25",
    location: "Gedung Sate, Bandung",
    category: "Kuliner",
    image: "https://picsum.photos/seed/event1/800/500",
    popular: true,
    type: "Upcoming"
  },
  {
    id: 2,
    title: "Workshop Sertifikasi Halal Gratis",
    date: "2025-06-12",
    location: "KHB Hub, Bandung",
    category: "Workshop Halal",
    image: "https://picsum.photos/seed/event2/800/500",
    popular: true,
    type: "Upcoming"
  },
  {
    id: 3,
    title: "Business Matching & Networking",
    date: "2025-07-05",
    location: "Hotel Savoy Homann",
    category: "Trading",
    image: "https://picsum.photos/seed/event3/800/500",
    popular: false,
    type: "Upcoming"
  },
  {
    id: 4,
    title: "Halal Food Photography Workshop",
    date: "2024-12-10",
    location: "Braga City Walk",
    category: "Teknologi",
    image: "https://picsum.photos/seed/event4/800/500",
    popular: false,
    type: "Past"
  },
  {
    id: 5,
    title: "Ramadhan Halal Bazaar 2024",
    date: "2024-03-15",
    location: "Pusdai Bandung",
    category: "Budaya",
    image: "https://picsum.photos/seed/event5/800/500",
    popular: true,
    type: "Past"
  }
];

export default function ExploreEvents() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { name: "Semua", image: "https://picsum.photos/seed/all/400/400" },
    { name: "Musik", image: "https://picsum.photos/seed/music/400/400" },
    { name: "Lomba", image: "https://picsum.photos/seed/contest/400/400" },
    { name: "Trading", image: "https://picsum.photos/seed/trade/400/400" },
    { name: "Kuliner", image: "https://picsum.photos/seed/food/400/400" },
    { name: "Budaya", image: "https://picsum.photos/seed/culture/400/400" },
    { name: "Keluarga", image: "https://picsum.photos/seed/family/400/400" },
    { name: "Teknologi", image: "https://picsum.photos/seed/tech/400/400" },
    { name: "Olahraga", image: "https://picsum.photos/seed/sport/400/400" },
    { name: "Kesehatan", image: "https://picsum.photos/seed/health/400/400" },
    { name: "Workshop Halal", image: "https://picsum.photos/seed/workshop/400/400" }
  ];

  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "Semua" || event.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-20">
      <section className="py-16 bg-slate-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <p className="text-primary font-bold tracking-widest uppercase text-xs mb-4">Discovery</p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-dark">Jelajahi Event.</h1>
            </div>
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text"
                placeholder="Temukan inspirasi event..."
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white border border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Categories Horizontal Scroll */}
          <div className="mb-16">
            <h2 className="text-xl font-bold text-dark mb-6">Telusuri Berdasarkan Kategori</h2>
            <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar">
              {categories.map((cat) => (
                <motion.button
                  key={cat.name}
                  whileHover={{ y: -5 }}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`flex-shrink-0 group relative w-32 md:w-40 aspect-square rounded-3xl overflow-hidden border-4 transition-all ${activeCategory === cat.name ? "border-primary shadow-xl shadow-primary/20" : "border-transparent"}`}
                >
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent transition-opacity ${activeCategory === cat.name ? "opacity-100" : "opacity-60 group-hover:opacity-100"}`} />
                  <div className="absolute inset-x-0 bottom-4 text-center px-2">
                    <span className="text-white font-bold text-xs md:text-sm">{cat.name}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event, idx) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500"
                >
                  <Link to={`/events/${event.id}`}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-md text-dark px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                          {event.category}
                        </span>
                      </div>
                      {event.popular && (
                        <div className="absolute top-4 right-4">
                          <div className="bg-yellow-400 text-dark p-2 rounded-full shadow-lg">
                            <Star size={14} fill="currentColor" />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-8">
                      <h3 className="text-xl font-bold text-dark mb-4 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-slate-500 text-sm">
                          <Calendar size={16} className="text-primary" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-3 text-slate-500 text-sm">
                          <MapPin size={16} className="text-primary" />
                          {event.location}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${event.type === 'Upcoming' ? 'text-green-500' : 'text-slate-400'}`}>
                          {event.type}
                        </span>
                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-dark group-hover:bg-primary group-hover:text-white transition-all">
                          <ArrowRight size={18} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-32">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">Tidak ada hasil</h3>
              <p className="text-slate-500">Coba gunakan kata kunci lain atau ganti kategori.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
