import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Instagram, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import logoImage from "@/assets/logo.jpeg";
import type { MouseEvent } from "react";

export default function Footer() {

  const currentYear = new Date().getFullYear();
  const location = useLocation();

  const handleFooterNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    if (location.pathname === path) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const footerLinks = {
    Company: [
      { name:"Home", path :"/" },
      { name: "About", path: "/about" },
      { name: "Services", path: "/services" },
      { name: "Portfolio", path: "/portfolio" },
      { name: "Contact", path: "/contact" },
      { name: "Careers", path: "/careers" },
    ],
    Services: [
      { name: "Web Development", path: "/services" },
      { name: "App Development", path: "/services" },
      { name: "UI/UX Design", path: "/services" },
      { name: "Cloud Intergration", path: "/services" },
      { name: "Digital Marketing", path: "/services" },
      { name: "AI & ML Development", path: "/services" },
      { name: "Software Support", path: "/services" },
    ],
    Connect: [
      { name: "Instagram", icon: Instagram, href: "#" },
      { name: "LinkedIn", icon: Linkedin, href: "#" },
      { name: "Email Us", icon: Mail, href: "mailto:hello@mindsoulix.tech" },
    ],
  };

  return (
    <footer className="relative w-full">

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="relative w-full border-t border-black/10
                   px-10 md:px-20 py-20 overflow-visible"
        style={{
          background: "#f8d9d9"
        }}
      >

        {/* Subtle background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 25% 30%, rgba(255,0,0,0.08), transparent 60%)",
            filter: "blur(60px)",
          }}
        />

        {/* Thin red top border */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,0,0,0.8), rgba(255,60,60,0.6), rgba(255,0,0,0.8), transparent)",
          }}
        />

        {/* INNER CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 mb-16">

            {/* Brand */}
            <div className="space-y-6">

              <img
                src={logoImage}
                alt="MindSoulix"
                className="h-16 w-auto object-contain"
              />

              <p className="text-sm text-black/60 leading-relaxed">
                Building intelligent digital solutions that blend technology
                with creativity — crafting the future with mind and soul.
              </p>

              <div className="flex gap-4">
                {footerLinks.Connect.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="w-11 h-11 rounded-xl flex items-center justify-center
                               bg-white border border-black/10"
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 0 20px rgba(255,0,0,0.5)",
                    }}
                  >
                    <social.icon className="w-4 h-4 text-black/70" />
                  </motion.a>
                ))}
              </div>

            </div>

            {/* Company */}
            <div>

              <h4 className="text-sm mb-6 tracking-wider uppercase text-red-600 font-semibold">
                Company
              </h4>

              <ul className="space-y-4">
                {footerLinks.Company.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      to={link.path}
                      onClick={(event) => handleFooterNavClick(event, link.path)}
                      className="text-sm text-black/60 transition-all duration-300 hover:translate-x-1 hover:text-[#E10600] hover:font-bold"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>

            </div>

            {/* Services */}
            <div>

              <h4 className="text-sm mb-6 tracking-wider uppercase text-red-600 font-semibold">
                Services
              </h4>

              <ul className="space-y-4">
                {footerLinks.Services.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      to={link.path}
                      onClick={(event) => handleFooterNavClick(event, link.path)}
                      className="text-sm text-black/60 transition-all duration-300 hover:translate-x-1 hover:text-[#E10600] hover:font-bold"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>

            </div>

            {/* Newsletter */}
            <div>

              <h4 className="text-sm mb-6 tracking-wider uppercase text-red-600 font-semibold">
                Stay Updated
              </h4>

              <p className="text-sm mb-5 text-black/60">
                Subscribe for latest updates and tech insights.
              </p>

              <div className="flex gap-2">

                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-lg text-sm
                  bg-white border border-black/10 text-black
                  focus:border-red-600 outline-none"
                />

                <motion.button
                  className="w-11 h-11 rounded-lg flex items-center justify-center bg-red-600"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 20px rgba(255,0,0,0.6)",
                  }}
                >
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </motion.button>

              </div>

            </div>

          </div>

          {/* Divider */}
          <div className="h-px mb-10 bg-gradient-to-r from-transparent via-black/10 to-transparent" />

          {/* Bottom */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-black/40">

            <p>
              © 2025 MindSoulix Tech. All rights reserved. Crafted
              with <span className="text-red-600">♥</span> and innovation.
            </p>

            <div className="flex gap-6">
              <a href="#" className="text-black/70 transition-all duration-300 hover:text-[#E10600] hover:font-bold">
                Privacy Policy
              </a>
              <a href="#" className="text-black/70 transition-all duration-300 hover:text-[#E10600] hover:font-bold">
                Terms of Service
              </a>
            </div>

          </div>

        </div>

      </motion.div>

    </footer>
  );
}
