import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Services from "./components/Services";
import ContactUs from "./components/ContactUs";
import GalleryPage from "./components/GalleryPage";
import EventsPage from "./components/EventsPage";
import EventDetail from "./components/EventDetail";
import Footer from "./components/Footer";

import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/layanan" element={<Services />} />
            <Route path="/kontak" element={<ContactUs />} />
            <Route path="/galeri" element={<GalleryPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetail />} />
          </Routes>

        </main>
        <Footer />
      </div>
    </Router>
  );
}




