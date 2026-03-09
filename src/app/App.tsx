import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Public from "./pages/Public";
import Contact from "./pages/Contact";
import GetQuote from "./pages/GetQuote";
import Careers from "./pages/Careers";
import OpenPositions from "./pages/OpenPositions";

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace("#", "");
      let attempts = 0;

      const scrollToHash = () => {
        const target = document.getElementById(targetId);
        if (!target) return false;
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return true;
      };

      if (scrollToHash()) return;

      const retryTimer = window.setInterval(() => {
        attempts += 1;
        if (scrollToHash() || attempts > 10) {
          window.clearInterval(retryTimer);
        }
      }, 80);

      return () => window.clearInterval(retryTimer);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname, location.hash]);

  return null;
}

function AppContent() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollManager />
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/portfolio" element={<Projects />} />
          <Route path="/public" element={<Public />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/get-quote" element={<GetQuote />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/open-positions" element={<OpenPositions />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#060606]">
      <Router>
        <AppContent />
      </Router>
    </div>
  );
}
