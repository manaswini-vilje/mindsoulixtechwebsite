import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function Public() {
  const phoneRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const platforms = [
    {
      icon: Instagram,
      name: "Instagram",
      handle: "@mindsoulix",
      description:
        "Follow our visual journey — behind the scenes, launches & culture.",
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      handle: "MindSoulix Tech",
      description:
        "Connect professionally — updates, thought leadership & opportunities.",
    },
    {
      icon: Mail,
      name: "Email",
      handle: "hello@mindsoulix.tech",
      description:
        "Drop us a message directly — we reply within 24 business hours.",
    },
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });
  
    platforms.forEach((_, i) => {
  
      // ENTRY (fast punch)
      tl.fromTo(
        phoneRef.current,
        {
          scale: 0.8,
          opacity: 0,
          y: 120,
          filter: "blur(15px)",
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power4.out",
          onStart: () => setActive(i),
        }
      );
  
      tl.to(glowRef.current, {
        opacity: 0.9,
        duration: 0.3,
      }, "<");
  
      // SHORT HOLD
      tl.to({}, { duration: 0.8 });
  
      // FAST EXIT
      tl.to(phoneRef.current, {
        scale: 1.25,
        opacity: 0,
        y: -150,
        filter: "blur(20px)",
        duration: 0.6,
        ease: "power4.in",
      });
  
      tl.to(glowRef.current, {
        opacity: 0.3,
        duration: 0.3,
      }, "<");
    });
  
  }, []);
  const ActiveIcon = platforms[active].icon;

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#120000] to-black" />
      <div
        ref={glowRef}
        className="absolute w-[800px] h-[800px] bg-red-600/30 blur-[250px] rounded-full opacity-30"
      />

      {/* HERO */}
      <section className="relative pt-40 pb-32 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-6xl font-bold tracking-tight">
            Connect With <span className="text-red-500">MindSoulix</span>
          </h1>
          <p className="mt-6 text-gray-400 text-lg">
            Join our growing digital ecosystem.
          </p>
        </motion.div>
      </section>

      {/* CINEMATIC PHONE */}
      <section className="relative py-40 flex items-center justify-center">

        <div
          ref={phoneRef}
          className="relative w-[320px] h-[620px] rounded-[40px] border border-red-500/40 bg-[#0a0a0a] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.8)]"
        >
          {/* Smoke effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(255,0,0,0.25),transparent_70%)] animate-pulse opacity-60" />

          {/* Screen */}
          <div className="absolute inset-[18px] rounded-[30px] bg-black border border-red-500/20 flex items-center justify-center p-8 text-center">

            <div>
              <div className="w-16 h-16 mx-auto mb-6 rounded-xl flex items-center justify-center bg-red-500/10 border border-red-500/40">
                <ActiveIcon size={30} className="text-red-500" />
              </div>

              <h3 className="text-xl font-semibold mb-2">
                {platforms[active].name}
              </h3>

              <p className="text-red-500 text-sm mb-4">
                {platforms[active].handle}
              </p>

              <p className="text-gray-400 leading-relaxed text-sm">
                {platforms[active].description}
              </p>
            </div>

          </div>
        </div>

      </section>

      {/* CONTACT */}
      <section className="relative py-32 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Let’s Start a <span className="text-red-500">Conversation</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto">
          {[
            { icon: MapPin, text: "Tech District, San Francisco" },
            { icon: Phone, text: "+1 (555) 123-4567" },
            { icon: Mail, text: "hello@mindsoulix.tech" },
          ].map((item, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-red-500/20"
            >
              <item.icon size={26} className="text-red-500 mx-auto mb-4" />
              <p className="text-gray-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}