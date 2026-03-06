import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Public from "./pages/Public";
import Contact from "./pages/Contact";
import GetQuote from "./pages/GetQuote";

function AppContent() {
  return (
    <div className="flex flex-col min-h-screen">

      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-1">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/public" element={<Public />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/get-quote" element={<GetQuote />} />
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