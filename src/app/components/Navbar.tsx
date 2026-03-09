import { useEffect, useState, useRef, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  House,
  Cpu,
  ShieldCheck,
  Handshake,
  Globe2,
  Rocket,
  Code2,
  Smartphone,
  CloudCog,
  Palette,
  Megaphone,
  Brain,
  Wrench,
  Grid3X3,
  Landmark,
  Sprout,
  LayoutDashboard,
  Sparkles,
  Briefcase,
  MailOpen,
  ClipboardPen,
  type LucideIcon
} from "lucide-react";
import logoImage from "../../assets/logo.jpeg";

interface DropdownItem {
  label: string;
  path: string;
  desc?: string;
  icon?: LucideIcon;
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
      {
        label: "Overview",
        path: "/#overview",
        desc: "A quick snapshot of who we are and what we build.",
        icon: House
      },
      {
        label: "Capabilities",
        path: "/#services",
        desc: "Explore our core technology and product strengths.",
        icon: Cpu
      },
      {
        label: "Why MindSoulix Tech",
        path: "/#why",
        desc: "See what makes our delivery model and team stand out.",
        icon: ShieldCheck
      },
      {
        label: "Partnership Model",
        path: "/#partnership",
        desc: "How we collaborate from concept to production.",
        icon: Handshake
      },
      {
        label: "Global Impact",
        path: "/#impact",
        desc: "Real outcomes created across industries and regions.",
        icon: Globe2
      },
      {
        label: "Launch With Us",
        path: "/#launch",
        desc: "Start your next initiative with the right team.",
        icon: Rocket
      }
    ],
  },
  {
    name: "About",
    path: "/about",
    dropdown: [
      {
        label: "Overview",
        path: "/about#overview",
        desc: "A clear introduction to MindSoulix and our direction.",
        icon: LayoutDashboard
      },
      {
        label: "Capabilities",
        path: "/about#capabilities",
        desc: "Our strengths across technology, design, and delivery.",
        icon: Cpu
      },
      {
        label: "Why MindSoulix",
        path: "/about#why-mindsoulix",
        desc: "What makes our approach different and high impact.",
        icon: ShieldCheck
      },
      {
        label: "Partnership Model",
        path: "/about#partnership-model",
        desc: "How we collaborate from strategy to execution.",
        icon: Handshake
      },
      {
        label: "Global Impact",
        path: "/about#global-impact",
        desc: "The outcomes we create across products and industries.",
        icon: Globe2
      }
    ],
  },
  {
    name: "Services",
    path: "/services",
    dropdown: [
      {
        label: "Web Development",
        path: "/services#web-development",
        desc: "Modern, scalable web platforms for business growth.",
        icon: Code2
      },
      {
        label: "App Development",
        path: "/services#app-development",
        desc: "High-performance mobile apps with seamless UX.",
        icon: Smartphone
      },
      {
        label: "Cloud Integration",
        path: "/services#cloud-integration",
        desc: "Cloud-first architecture for resilient operations.",
        icon: CloudCog
      },
      {
        label: "UI / UX Design",
        path: "/services#uiux-design",
        desc: "Design systems and interfaces users love.",
        icon: Palette
      },
      {
        label: "Digital Marketing",
        path: "/services#digital-marketing",
        desc: "Data-driven campaigns that convert and scale.",
        icon: Megaphone
      },
      {
        label: "AI & ML Development",
        path: "/services#ai-ml-development",
        desc: "Intelligent models and automation for real impact.",
        icon: Brain
      },
      {
        label: "Software Support",
        path: "/services#software-support",
        desc: "Reliable maintenance, upgrades, and optimization.",
        icon: Wrench
      }
    ],
  },
  {
    name: "Portfolio",
    path: "/portfolio",
    dropdown: [
      {
        label: "Our Projects",
        path: "/portfolio#our-projects",
        desc: "Explore our interactive project showcase and case highlights.",
        icon: Grid3X3
      },
      {
        label: "Client Feedback",
        path: "/portfolio#client-feedback",
        desc: "Read testimonials and outcomes from real client engagements.",
        icon: Brain
      }
    ],
  },
  {
    name: "Careers",
    path: "/careers",
    dropdown: [
      {
        label: "Careers Overview",
        path: "/careers#careers-overview",
        desc: "Explore our mission, culture, and team values.",
        icon: LayoutDashboard
      },
      {
        label: "Life at MindSoulix",
        path: "/careers#life-at-mindsoulix",
        desc: "See how we collaborate, create, and grow together.",
        icon: Sparkles
      },
      {
        label: "Open Positions",
        path: "/careers#open-positions",
        desc: "Browse current roles and opportunities to join us.",
        icon: Briefcase
      },
    ],
  },
  {
    name: "Contact",
    path: "/contact",
    dropdown: [
      {
        label: "Intro",
        path: "/contact#hero",
        desc: "Find the right channel to connect with our team.",
        icon: MailOpen
      },
      {
        label: "Start a Project",
        path: "/contact#form",
        desc: "Share your requirements and get started quickly.",
        icon: ClipboardPen
      }
    ],
  },
];

export default function Navbar() {

  const [hovered, setHovered] = useState<string | null>(null);
  const [scrollingDropdown, setScrollingDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownScrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getBasePath = (path: string) => path.split("#")[0] || "/";

  const isActive = (path: string) => {
    const basePath = getBasePath(path);
    return basePath === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(basePath);
  };

  const getNavLinkClass = (path: string) =>
    isActive(path)
      ? "text-[#E10600] font-bold transition-all duration-300 ease-in-out"
      : "text-white font-normal hover:text-[#E10600] hover:font-bold transition-all duration-300 ease-in-out";

  const handleEnter = (name: string) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setHovered(name);
  };

  const handleLeave = () => {
    hoverTimer.current = setTimeout(() => setHovered(null), 120);
  };

  const handleMainNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    setHovered(null);
    if (location.pathname === path) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleDropdownScroll = (name: string) => {
    setScrollingDropdown(name);
    if (dropdownScrollTimer.current) {
      clearTimeout(dropdownScrollTimer.current);
    }
    dropdownScrollTimer.current = setTimeout(() => {
      setScrollingDropdown((current) => (current === name ? null : current));
    }, 700);
  };

  const handleDropdownClick = (
    event: MouseEvent<HTMLAnchorElement>,
    drop: DropdownItem
  ) => {
    const [targetPath, targetId] = drop.path.split("#");
    if (!targetId || !targetPath) {
      setHovered(null);
      return;
    }

    event.preventDefault();

    if (location.pathname === targetPath) {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", `${targetPath}#${targetId}`);
      setHovered(null);
      return;
    }

    navigate(drop.path);
    setHovered(null);
  };

  useEffect(() => {
    return () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
      if (dropdownScrollTimer.current) clearTimeout(dropdownScrollTimer.current);
    };
  }, []);

  return (

    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-2 left-1/2 -translate-x-1/2 z-[9999]"
    >
      <style>
        {`
          .dropdown-container {
            scrollbar-width: thin;
            scrollbar-color: transparent transparent;
          }

          .dropdown-container::-webkit-scrollbar {
            width: 4px;
          }

          .dropdown-container::-webkit-scrollbar-track {
            background: transparent;
          }

          .dropdown-container::-webkit-scrollbar-thumb {
            background: transparent;
            border-radius: 10px;
            transition: background 180ms ease;
          }

          .dropdown-container.is-scrolling {
            scrollbar-color: rgba(255,255,255,0.35) transparent;
          }

          .dropdown-container.is-scrolling::-webkit-scrollbar-thumb {
            background: linear-gradient(
              180deg,
              rgba(255,255,255,0) 0%,
              rgba(255,255,255,0.35) 50%,
              rgba(255,255,255,0) 100%
            );
          }

          .dropdown-container.is-scrolling::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(
              180deg,
              rgba(255,255,255,0) 0%,
              rgba(255,255,255,0.5) 50%,
              rgba(255,255,255,0) 100%
            );
          }
        `}
      </style>

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
                onClick={(event) => handleMainNavClick(event, item.path)}
                className="text-sm flex items-center gap-1"
              >

                <span
                  className={getNavLinkClass(item.path)}
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

                    <div
                      className={`dropdown-container ${
                        scrollingDropdown === item.name ? "is-scrolling" : ""
                      } min-w-[360px] max-h-[420px] space-y-1 overflow-y-auto rounded-lg p-4`}
                      onScroll={() => handleDropdownScroll(item.name)}
                      style={{
                        background: "rgba(30, 30, 30, 0.95)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        backdropFilter: "blur(10px)"
                      }}
                    >

                      {item.dropdown.map((drop: DropdownItem) => (

                        <Link
                          key={drop.label}
                          to={drop.path}
                          onClick={(event) => handleDropdownClick(event, drop)}
                          className="group block cursor-pointer rounded-lg px-3 py-3 transition-all duration-300 hover:bg-white/5"
                        >
                          <div className="flex items-start gap-3">
                            {drop.icon ? (
                              <drop.icon className="mt-0.5 h-4 w-4 text-white/70 transition-colors duration-300 group-hover:text-[#E10600]" />
                            ) : null}
                            <div>
                              <p className="text-sm font-medium text-white transition-all duration-300 group-hover:text-[#E10600] group-hover:font-bold">
                                {drop.label}
                              </p>
                              {drop.desc ? (
                                <p className="mt-1 text-xs leading-relaxed text-white/60 transition-colors duration-300 group-hover:text-white/80">
                                  {drop.desc}
                                </p>
                              ) : null}
                            </div>
                          </div>
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
  <button className="bg-[#e10600] text-white px-4 py-2 rounded-2xl cursor-pointer hover:bg-[#e10600]/90 transition">
    Book Demo
  </button>
</Link> 

          </motion.button>

        </Link>

      </div>

    </motion.nav>

  );

}
