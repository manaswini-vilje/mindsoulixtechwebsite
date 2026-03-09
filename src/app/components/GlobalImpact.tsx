import { useEffect, useRef, useState } from "react";
import globeVideo from "../../assets/globe-bgvideo.mp4";

const stats = [
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 85, suffix: "+", label: "Enterprise Clients" },
  { value: 15, suffix: "+", label: "Countries Served" },
  { value: 99.9, suffix: "%", label: "Infrastructure Uptime" },
];

export default function GlobalImpact() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [counts, setCounts] = useState(stats.map(() => 0));
  const [active, setActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  /* ================= SECTION TRIGGER ================= */

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          setActive(true);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  /* ================= COUNTER ANIMATION ================= */

  useEffect(() => {
    if (!active) return;

    stats.forEach((stat, i) => {
      let start = 0;
      const step = Math.ceil(Number(stat.value) / 80);

      const interval = setInterval(() => {
        start += step;

        if (start >= stat.value) {
          start = stat.value;
          clearInterval(interval);
        }

        setCounts((prev) => {
          const updated = [...prev];
          updated[i] = start;
          return updated;
        });
      }, 25);
    });
  }, [active]);

  /* ================= PARALLAX ================= */

  useEffect(() => {
    if (!isVisible) return;

    const handleScroll = () => {
      const video = document.getElementById("globe-video");
      if (!video) return;

      const scroll = window.scrollY;
      video.style.transform = `translateY(${scroll * 0.05}px)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[950px] py-36 bg-[#fff7f7] overflow-hidden"
    >

      {/* VIDEO BACKGROUND */}


<div className="absolute inset-0 flex items-end justify-center overflow-hidden pointer-events-none z-0">

<video
  id="globe-video"
  autoPlay
  muted
  loop
  playsInline
  className="absolute w-[1300px] max-w-none opacity-40 transition-transform duration-500"
>
  <source src={globeVideo} type="video/mp4" />
</video>

{/* SOFT BLEND OVERLAY */}

<div className="absolute inset-0 bg-gradient-to-b 
from-[#fff7f7] via-transparent 
to-[#fff7f7] opacity-90" />

</div>
      {/* HEADING */}

      <div className="relative z-10 text-center mb-28">

        <h2 className="text-5xl md:text-6xl font-semibold text-black">
          Global Infrastructure Impact
        </h2>

        <p className="text-black/60 mt-6 text-lg max-w-2xl mx-auto">
          MindSoulix Tech powers scalable infrastructure, intelligent systems,
          and secure digital platforms delivering measurable impact across
          global markets.
        </p>

      </div>

      {/* STATS */}

      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-4 gap-20 text-center">

        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center">

            {/* DOT */}

            <div className="w-3 h-3 rounded-full bg-[#E10600] mb-4 shadow-[0_0_10px_rgba(225,6,0,0.6)]" />

            {/* NUMBER */}

            <h3 className="text-4xl md:text-5xl font-bold text-[#E10600] tracking-wide">
              {counts[i]}
              {stat.suffix}
            </h3>

            {/* LABEL */}

            <p className="text-black/60 mt-3 max-w-[200px] leading-relaxed text-sm">
              {stat.label}
            </p>

            {/* LINE ANIMATION */}

            <div
              className={`line-animation mt-8 w-[2px] bg-gradient-to-b from-[#E10600] to-transparent ${
                active ? "start" : ""
              }`}
            />

          </div>
        ))}

      </div>

      <style>{`

        .line-animation{
          height:0;
          opacity:0;
          transition:height 1s ease, opacity 1s ease;
        }

        .line-animation.start{
          height:160px;
          opacity:1;
          animation:lineDisappear 3s forwards;
        }

        @keyframes lineDisappear{

          0%{
            height:160px;
            opacity:1;
          }

          60%{
            height:160px;
            opacity:1;
          }

          100%{
            height:0;
            opacity:0;
          }

        }

      `}</style>

    </section>
  );
}
