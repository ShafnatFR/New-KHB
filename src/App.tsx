import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Services from "./components/Services";
import ContactUs from "./components/ContactUs";
import GalleryPage from "./components/GalleryPage";
import EventsPage from "./components/EventsPage";
import EventDetail from "./components/EventDetail";
import ExploreEvents from "./components/ExploreEvents";
import RepositoryPage from "./components/RepositoryPage";
import SubmitTemplatePage from "./components/SubmitTemplatePage";
import RequestTemplatePage from "./components/RequestTemplatePage";
import JoinCommunityPage from "./components/JoinCommunityPage";
import AuthPage from "./components/AuthPage";
import ProfilePage from "./components/ProfilePage";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { CMSProvider } from "./context/CMSContext";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <CMSProvider>
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
                <Route path="/explore-events" element={<ExploreEvents />} />
                <Route path="/repository" element={<RepositoryPage />} />
                <Route path="/repository/submit" element={<SubmitTemplatePage />} />
                <Route path="/repository/request" element={<RequestTemplatePage />} />
                <Route path="/join-community" element={<JoinCommunityPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CMSProvider>
    </AuthProvider>
  );
}




