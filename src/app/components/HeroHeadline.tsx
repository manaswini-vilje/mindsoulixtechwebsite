import { motion } from "framer-motion";

export default function HeroHeadline() {
  return (
    <div className="flex flex-col items-start">

      {/* TECH */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-[80px] md:text-[100px] font-extrabold leading-[0.9]"
      >
        <span className="tech-gradient">
          Tech
        </span>
      </motion.h1>

      {/* BEYOND */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-[80px] md:text-[100px] font-extrabold text-white leading-[0.9]"
      >
        Beyond
      </motion.h1>

      {/* LOGIC */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="text-[80px] md:text-[100px] font-extrabold text-white leading-[0.9]"
      >
        Logic
      </motion.h1>

      <style>{`

      .tech-gradient{
        background: linear-gradient(135deg,#105fa5,#3ea0ff);
        -webkit-background-clip:text;
        color:transparent;
      }

      `}</style>

    </div>
  );
}