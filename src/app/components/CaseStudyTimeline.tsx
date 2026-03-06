import { useEffect, useRef } from "react";
import { motion, useMotionValue,  useSpring } from "framer-motion";
import { Brain, Shield, Rocket, Zap } from "lucide-react";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse glow effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const glowX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const glowY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  return (
    <div
      ref={containerRef}
      className="relative bg-[#0f0f14] text-white overflow-hidden"
    >
      {/* Global Mouse Glow */}
      <motion.div
        className="pointer-events-none fixed w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(225,6,0,0.8), transparent 70%)",
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* ───────── HERO SECTION ───────── */}
      <section className="min-h-screen flex items-center justify-center px-6 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2 }}
          className="max-w-5xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-12 shadow-[0_0_80px_rgba(0,0,0,0.6)]"
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent"
          >
            About MindSoulix Tech
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-gray-400 text-lg"
          >
            Where technology meets precision, creativity, and long-term digital
            performance.
          </motion.p>
        </motion.div>
      </section>

      {/* ───────── WHY CHOOSE SECTION ───────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-16 text-center"
          >
            Why Choose MindSoulix Tech
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Brain,
                title: "Strategic Intelligence",
                desc: "We combine analytical precision with scalable architecture.",
              },
              {
                icon: Rocket,
                title: "Future-Ready Engineering",
                desc: "Built with modern tech stacks that scale.",
              },
              {
                icon: Shield,
                title: "Secure & Reliable",
                desc: "Enterprise-grade security and stability.",
              },
              {
                icon: Zap,
                title: "Performance Focused",
                desc: "Fast, optimized, conversion-driven builds.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:shadow-[0_0_40px_rgba(225,6,0,0.4)] transition"
              >
                <item.icon className="text-red-500 mb-4" size={28} />
                <h3 className="text-xl font-semibold mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── ROBOTIC FREE HOSTING REVEAL ───────── */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative">
          {/* Robotic pull animation */}
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-red-500 text-6xl"
          >
            🤖
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-bold mb-6"
          >
            1 Year Free Hosting Included
          </motion.h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Every completed project comes with one full year of secure cloud
            hosting, SSL configuration, performance optimization, and technical
            maintenance — absolutely free.
          </p>
        </div>
      </section>

      {/* ───────── STATS SECTION ───────── */}
      <section className="py-24 px-6 bg-black/40 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {["150+ Projects", "98% Satisfaction", "50+ Team", "15+ Countries"].map(
            (stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="text-2xl font-bold text-red-500"
              >
                {stat}
              </motion.div>
            )
          )}
        </div>
      </section>

      {/* ───────── PROCESS SECTION ───────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-20"
          >
            Our Process
          </motion.h2>

          <div className="space-y-16">
            {["Discovery", "Strategy", "Design", "Development", "Launch"].map(
              (step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-2xl hover:shadow-[0_0_40px_rgba(225,6,0,0.3)] transition"
                >
                  <h3 className="text-2xl font-semibold text-red-500 mb-4">
                    {step}
                  </h3>
                  <p className="text-gray-400">
                    We execute this stage with precision and full transparency,
                    ensuring client alignment and long-term scalability.
                  </p>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}