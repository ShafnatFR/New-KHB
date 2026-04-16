import { motion, AnimatePresence } from "motion/react";
import { useParams, Link } from "react-router-dom";
import { Calendar, MapPin, Users, Clock, ArrowLeft, Share2, CalendarPlus, UserCheck } from "lucide-react";

const eventDetails = {
  "1": {
    title: "Bandung Halal Festival 2025",
    date: "2025-05-25",
    endDate: "2025-05-27",
    time: "09:00 - 21:00 WIB",
    location: "Gedung Sate, Bandung",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.915347209148!2d107.6166!3d-6.9024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e64c5e8866e5%3A0x37b058041bdf137a!2sGedung%20Sate!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid",
    attendees: "5000+ Peserta",
    category: "Festival",
    image: "https://picsum.photos/seed/event1/1200/600",
    description: "Festival halal terbesar di Bandung yang menghadirkan ratusan tenant kuliner, fashion, dan talkshow inspiratif bersama para ahli industri halal.",
    speakers: [
      { name: "H. Ridwan Kamil", role: "Tokoh Masyarakat", bio: "Arsitek dan mantan Gubernur Jawa Barat yang aktif mendukung UMKM.", img: "https://picsum.photos/seed/speaker1/200/200" },
      { name: "Dr. Ir. Lukmanul Hakim", role: "Ahli Halal", bio: "Pakar sertifikasi halal dengan pengalaman internasional.", img: "https://picsum.photos/seed/speaker2/200/200" }
    ],
    schedule: [
      { time: "09:00", activity: "Opening Ceremony" },
      { time: "11:00", activity: "Talkshow: Masa Depan Ekonomi Halal" },
      { time: "13:00", activity: "Istirahat & Networking" },
      { time: "15:00", activity: "Workshop Sertifikasi Mandiri" }
    ]
  },
  "2": {
    title: "Workshop Sertifikasi Halal Gratis",
    date: "2025-06-12",
    time: "08:00 - 15:00 WIB",
    location: "KHB Hub, Bandung",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.839833230495!2d107.6094!3d-6.9175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e630d00f339b%3A0x401576d14fed120!2sBandung%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid",
    attendees: "100 UMKM",
    category: "Workshop",
    image: "https://picsum.photos/seed/event2/1200/600",
    description: "Program pendampingan intensif bagi pelaku usaha kecil untuk mendapatkan sertifikat halal secara gratis melalui skema self-declare.",
    speakers: [
      { name: "Siti Aminah", role: "Pendamping PPH", bio: "Konsultan ahli dalam verifikasi dokumen produk halal.", img: "https://picsum.photos/seed/speaker3/200/200" }
    ],
    schedule: [
      { time: "08:00", activity: "Registrasi & Coffee Break" },
      { time: "09:00", activity: "Pengisian Dokumen SiHalal" },
      { time: "12:00", activity: "Makan Siang" },
      { time: "13:30", activity: "Verifikasi Berkas Lapangan" }
    ]
  },
  "3": {
    title: "Business Matching & Networking",
    date: "2025-07-05",
    time: "18:00 - 21:00 WIB",
    location: "Hotel Savoy Homann",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.840776123456!2d107.6098!3d-6.9178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e630d00f339b%3A0x401576d14fed120!2sSavoy%20Homann!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid",
    attendees: "50 Investor",
    category: "Networking",
    image: "https://picsum.photos/seed/event3/1200/600",
    description: "Eksklusif networking event yang mempertemukan pengusaha halal dengan calon investor dan mitra strategis.",
    speakers: [
      { name: "Ahmad Zaki", role: "Venture Capitalist", bio: "Investor yang fokus pada startup dan UMKM berbasis syariah.", img: "https://picsum.photos/seed/speaker4/200/200" }
    ],
    schedule: [
      { time: "18:00", activity: "Welcome Drink & Networking" },
      { time: "19:00", activity: "Dinner & Keynote Speech" },
      { time: "20:00", activity: "1-on-1 Business Matching" }
    ]
  }
};

export default function EventDetail() {
  const { id } = useParams();
  const event = eventDetails[id as keyof typeof eventDetails];

  if (!event) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-2xl font-bold">Event tidak ditemukan</h1>
        <Link to="/events" className="text-primary mt-4 inline-block">Kembali ke daftar event</Link>
      </div>
    );
  }

  const addToGoogleCalendar = () => {
    const start = event.date.replace(/-/g, '') + 'T090000Z';
    const endDateStr = 'endDate' in event ? (event as any).endDate : event.date;
    const end = endDateStr.replace(/-/g, '') + 'T170000Z';
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${start}/${end}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    window.open(url, '_blank');
  };


  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="container-custom">
            <Link to="/events" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft size={20} />
              Kembali ke Events
            </Link>
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {event.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
              {event.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl font-bold text-dark mb-6">Tentang Event</h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {event.description}
                </p>
              </div>

              {/* Schedule */}
              <div>
                <h2 className="text-2xl font-bold text-dark mb-6">Agenda Acara</h2>
                <div className="space-y-4">
                  {event.schedule.map((item, idx) => (
                    <div key={idx} className="flex gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100 items-center">
                      <div className="text-primary font-bold text-lg shrink-0 w-20">
                        {item.time}
                      </div>
                      <div className="h-8 w-px bg-slate-200" />
                      <div className="font-semibold text-slate-800">
                        {item.activity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Speakers */}
              <div>
                <h2 className="text-2xl font-bold text-dark mb-8">Pembicara</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {event.speakers.map((speaker, idx) => (
                    <div key={idx} className="flex gap-6 p-6 rounded-3xl border border-slate-100 bg-white shadow-sm">
                      <img 
                        src={speaker.img} 
                        alt={speaker.name} 
                        className="w-20 h-20 rounded-2xl object-cover shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="font-bold text-dark mb-1">{speaker.name}</h4>
                        <p className="text-primary text-xs font-bold mb-2 uppercase tracking-wider">{speaker.role}</p>
                        <p className="text-slate-500 text-sm leading-relaxed">{speaker.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div>
                <h2 className="text-2xl font-bold text-dark mb-6">Lokasi</h2>
                <div className="rounded-3xl overflow-hidden border-4 border-slate-50 shadow-lg h-[400px]">
                  <iframe
                    src={event.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-8">
              <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 sticky top-24">
                <h3 className="text-xl font-bold text-dark mb-8">Detail Informasi</h3>
                
                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm shrink-0">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Tanggal</p>
                      <p className="font-bold text-dark">{event.date}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm shrink-0">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Waktu</p>
                      <p className="font-bold text-dark">{event.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Lokasi</p>
                      <p className="font-bold text-dark">{event.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm shrink-0">
                      <Users size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Kapasitas</p>
                      <p className="font-bold text-dark">{event.attendees}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <button className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">
                    <UserCheck size={20} />
                    Daftar Sekarang
                  </button>
                  <button 
                    onClick={addToGoogleCalendar}
                    className="w-full bg-white border border-slate-200 text-dark py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-50 transition-all"
                  >
                    <CalendarPlus size={20} className="text-primary" />
                    Tambah ke Kalender
                  </button>
                  <button className="w-full text-slate-400 font-bold text-sm flex items-center justify-center gap-2 hover:text-primary transition-colors">
                    <Share2 size={16} />
                    Bagikan Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
