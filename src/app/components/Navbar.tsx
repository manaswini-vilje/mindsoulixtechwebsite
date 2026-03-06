import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import logoImage from "../../assets/logo.jpeg";

interface DropdownItem {
  label: string;
  path: string;
  desc?: string;
}

interface NavItem {
  name: string;
  path: string;
  dropdown?: DropdownItem[];
}

const menuItems: NavItem[] = [
  {
    name: "Home",
    path: "/",
    dropdown: [
      { label: "Overview", path: "/#overview" },
      { label: "Capabilities", path: "/#services" },
      { label: "Why MindSoulix Tech", path: "/#why" },
      { label: "Partnership Model", path: "/#partnership" },
      { label: "Global Impact", path: "/#impact" },
      { label: "Launch With Us", path: "/#launch" },
    ],
  },
  {
    name: "About",
    path: "/about",
    dropdown: [
      { label: "Hero", path: "/about#hero" },
      { label: "What Drives Us", path: "/about#drives" },
      { label: "Our Story", path: "/about#story" },
      { label: "What Makes Us Different", path: "/about#different" },
      { label: "Schedule a Call", path: "/about#cta" },
    ],
  },
  {
    name: "Services",
    path: "/services",
    dropdown: [
      { label: "AI Development", path: "/services" },
      { label: "Web Development", path: "/services" },
      { label: "Automation Systems", path: "/services" },
      { label: "Cloud Architecture", path: "/services" },
    ],
  },
  {
    name: "Portfolio",
    path: "/Projects",
    dropdown: [
      { label: "All Projects", path: "/portfolio" },
      { label: "AI Platforms", path: "/portfolio" },
      { label: "Enterprise Systems", path: "/portfolio" },
      { label: "Startups", path: "/portfolio" },
    ],
  },
  {
    name: "Careers",
    path: "/careers",
    dropdown: [
      { label: "Open Positions", path: "/careers" },
      { label: "Life at MindSoulix", path: "/careers" },
      { label: "Internships", path: "/careers" },
    ],
  },
  {
    name: "Contact",
    path: "/contact",
    dropdown: [
      { label: "Intro", path: "/contact#hero" },
      { label: "Start a Project", path: "/contact#form" },
    ],
  },
];

export default function Navbar() {

  const [hovered, setHovered] = useState<string | null>(null);
  const location = useLocation();
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = (path: string) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  const handleEnter = (name: string) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setHovered(name);
  };

  const handleLeave = () => {
    hoverTimer.current = setTimeout(() => setHovered(null), 120);
  };

  return (

    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-2 left-1/2 -translate-x-1/2 z-[9999]"
    >

      {/* OUTER NAVBAR */}

      <div
        className="relative px-10 py-3 w-[1250px] rounded-4xl
        border border-white/20 flex items-center justify-between
        shadow-[0_0_25px_rgba(225,6,0,0.25),0_20px_60px_rgba(0,0,0,0.45)]"
        style={{
          background: "rgba(55,47,47,0.88)",
          backdropFilter: "blur(16px)",
        }}
      >

        {/* RED SMOKE GLOW */}

        <div
          className="absolute inset-0 pointer-events-none rounded-4xl"
          style={{
            background:
              "radial-gradient(circle at 40% 20%, rgba(225,6,0,0.25), transparent 60%)",
            filter: "blur(35px)",
            opacity: 0.6,
          }}
        />

        {/* LOGO */}

        <Link to="/" className="flex-shrink-0 relative z-10">
          <img
            src={logoImage}
            alt="MindSoulix"
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* INNER MENU NAVBAR */}

        <div
          className="flex items-center gap-8 px-8 py-2 rounded-2xl
          border border-white/15 relative z-10"
          style={{
            background: "rgba(128,115,115,0.35)",
            backdropFilter: "blur(10px)",
          }}
        >

          {menuItems.map((item: NavItem) => (

            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => handleEnter(item.name)}
              onMouseLeave={handleLeave}
            >

              <Link
                to={item.path}
                className="text-sm font-medium flex items-center gap-1"
              >

                <span
                  className={`transition-all duration-300 ${
                    isActive(item.path)
                      ? "text-[#E10600]"
                      : "text-gray-300 hover:text-[#E10600]"
                  }`}
                >
                  {item.name}
                </span>

                {item.dropdown && (
                  <ChevronDown size={14} className="text-gray-400" />
                )}

              </Link>

              <AnimatePresence>

                {hovered === item.name && item.dropdown && (

                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4"
                    onMouseEnter={() => handleEnter(item.name)}
                    onMouseLeave={handleLeave}
                  >

                    <div className="min-w-[220px] rounded-lg p-4 space-y-3 backdrop-blur-xl bg-[#372f2f]/95 border border-[#E10600]/40">

                      {item.dropdown.map((drop: DropdownItem) => (

                        <Link
                          key={drop.label}
                          to={drop.path}
                          className="block text-sm text-gray-300 hover:text-[#E10600] transition-colors duration-300"
                        >
                          {drop.label}
                        </Link>

                      ))}

                    </div>

                  </motion.div>

                )}

              </AnimatePresence>

            </div>

          ))}

        </div>

        {/* CTA BUTTON (OUTSIDE INNER NAVBAR) */}

        <Link to="/contact" className="relative z-10">

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 rounded-lg text-sm font-semibold whitespace-nowrap
            bg-[#E10600] text-white
            shadow-[0_0_18px_rgba(225,6,0,0.6)]
            hover:shadow-[0_0_28px_rgba(225,6,0,0.8)]
            transition-all duration-300"
          >

<Link to="/get-quote">
  <button className="bg-[#e10600] text-white px-4 py-2 rounded-2xl">
    Get a Quote
  </button>
</Link>

          </motion.button>

        </Link>

      </div>

    </motion.nav>

  );

}