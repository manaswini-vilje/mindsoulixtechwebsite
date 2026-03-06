import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ReactorCTA() {

  const sectionRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, { amount: 0.4 });

  const navigate = useNavigate();

  const fullText = "Build What Tomorrow Runs On";

  const [displayText, setDisplayText] = useState("");

  useEffect(() => {

    if (!isInView) return;

    let i = 0;

    const interval = setInterval(() => {

      setDisplayText(fullText.slice(0, i + 1));

      i++;

      if (i === fullText.length) clearInterval(interval);

    }, 40);

    return () => clearInterval(interval);

  }, [isInView]);

  return (

    <section
      ref={sectionRef}
      className="relative py-44 bg-[#fff7f7] overflow-hidden text-center"
    >

      {/* BACKGROUND GLOW */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,6,0,0.18),transparent_70%)] opacity-30 pointer-events-none" />

      {/* CONTENT */}

      <div className="relative z-10 max-w-5xl mx-auto px-6">

        {/* HEADING */}

        <h2 className="text-5xl md:text-6xl font-semibold text-black leading-tight whitespace-nowrap">

          {displayText}

          <span className="typing-cursor" />

        </h2>

        {/* DESCRIPTION */}

        <p className="text-black/60 text-lg mt-8 max-w-2xl mx-auto">

          MindSoulix Tech designs secure, scalable digital infrastructure
          engineered for performance, resilience, and long-term growth.

        </p>

        {/* BUTTON */}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/contact")}
          className="mt-16 px-10 py-4 rounded-full
          bg-[#E10600]
          text-white font-semibold tracking-wide
          shadow-[0_0_12px_rgba(225,6,0,0.5)]
          hover:shadow-[0_0_22px_rgba(225,6,0,0.7)]
          transition-all duration-300"
        >

          Launch Your Project

        </motion.button>

      </div>

      {/* CURSOR STYLE */}

      <style>

        {`

        .typing-cursor {

          display:inline-block;
          width:2px;
          height:1em;
          background:#E10600;
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