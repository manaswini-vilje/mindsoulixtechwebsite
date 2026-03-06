import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const reasons = [
  {
    title: "Innovation-Driven",
    desc: "We architect forward-thinking systems that redefine digital capability.",
  },
  {
    title: "Performance-Focused",
    desc: "Engineered for speed, scale, and seamless digital infrastructure.",
  },
  {
    title: "Security-First",
    desc: "Advanced protection layers ensuring resilient ecosystems.",
  },
  {
    title: "Scalable Architecture",
    desc: "Modular intelligence designed to grow with enterprise demands.",
  },
];

export default function WhyChoose() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const diskRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const isInView = useInView(sectionRef, { amount: 0.4, once: true });

  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const fullText = "Why Choose MindSoulix Tech";

  useEffect(() => {
    if (!isInView) return;

    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 35);

    return () => clearInterval(interval);
  }, [isInView]);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reasons.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [isInView]);

  const rotateX = useSpring(useMotionValue(0), { stiffness: 40, damping: 15 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 40, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!diskRef.current) return;

    const rect = diskRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width - 0.5) * 6;
    const percentY = (y / rect.height - 0.5) * 6;

    rotateX.set(-percentY);
    rotateY.set(percentX);
  };

  const constellation = useMemo(() => {
    const nodes = [];
    for (let i = 0; i < 18; i++) {
      nodes.push({
        x: Math.random() * 1200,
        y: Math.random() * 600,
      });
    }
    return nodes;
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-44 overflow-hidden bg-[#fff7f7]"
    >
      {/* RED VIGNETTE */}

      <motion.div
        animate={{ opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.12),transparent_60%)]"
      />

      {/* GRID */}

      <motion.div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)",
          backgroundSize: "120px 120px",
          transform: "perspective(1000px) rotateX(60deg)",
          transformOrigin: "top",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "0px -120px"],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      />

      {/* CONSTELLATION */}

      <motion.svg
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
      >
        {constellation.map((p1, i) =>
          constellation.map((p2, j) => {
            if (i >= j) return null;

            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;

            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 200)
              return (
                <line
                  key={`${i}-${j}`}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke="black"
                  strokeWidth="0.5"
                />
              );

            return null;
          })
        )}

        {constellation.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2" fill="black" />
        ))}
      </motion.svg>

      {/* CONTENT */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">

        {/* LEFT */}

        <div
          ref={diskRef}
          onMouseMove={handleMouseMove}
          className="relative flex flex-col justify-center items-center h-[460px]"
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute w-72 h-72 bg-red-600/20 rounded-full blur-3xl"
          />

          <motion.div
            style={{ rotateX, rotateY, transformPerspective: 1200 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="relative w-[420px] px-12 py-14"
              >
                <h3 className="text-3xl font-semibold text-black mb-4">
                  {reasons[index].title}
                </h3>

                <p className="text-black/60 leading-relaxed">
                  {reasons[index].desc}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-8 gap-3">
              {reasons.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: index === i ? 1.3 : 1,
                    backgroundColor:
                      index === i ? "rgb(239 68 68)" : "rgba(0,0,0,0.25)",
                  }}
                  className="w-3 h-3 rounded-full"
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT */}

        <div className="text-right">
          <motion.h2 className="text-5xl md:text-6xl font-semibold leading-tight text-black">
            {displayText}
            <span className="typing-cursor" />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={
              displayText.length === fullText.length
                ? { opacity: 1, y: 0 }
                : {}
            }
            transition={{ duration: 0.6 }}
            className="mt-6 text-black/60 text-lg"
          >
            Precision. Innovation. Performance.
          </motion.p>

          <motion.button
            onClick={() => navigate("/aboutus")}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 px-8 py-4 text-white font-semibold rounded-lg
            bg-gradient-to-r from-red-700 via-red-600 to-red-700
            shadow-[0_0_25px_rgba(255,0,0,0.5)]
            hover:shadow-[0_0_45px_rgba(255,0,0,0.8)]
            transition-all duration-300"
          >
            Explore With Us
          </motion.button>
        </div>
      </div>

      <style>
        {`
        .typing-cursor {
          display:inline-block;
          width:2px;
          height:1em;
          background:red;
          margin-left:6px;
          animation:blink 1s infinite;
        }

        @keyframes blink {
          0%,50%,100% {opacity:1;}
          25%,75% {opacity:0;}
        }
        `}
      </style>
    </section>
  );
}