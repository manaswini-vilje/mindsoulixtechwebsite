import { motion, useMotionValue } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

import {
  Cpu,
  Shield,
  Smartphone,
  Globe,
  Palette,
  Cloud,
} from "lucide-react";

import middleLogo from "@/assets/mslogoonlym.jpeg";

type Point = [number, number];
type Line = [number, number];

const services = [
  { icon: Cpu, path: "/services#ai", label: "AI Development" },
  { icon: Shield, path: "/services#security", label: "Cybersecurity" },
  { icon: Smartphone, path: "/services#mobile", label: "Mobile Development" },
  { icon: Globe, path: "/services#web", label: "Web Development" },
  { icon: Palette, path: "/services#design", label: "UI/UX Design" },
  { icon: Cloud, path: "/services#cloud", label: "Cloud Solutions" },
];

function generateHexTriangleMesh(
  cx: number,
  cy: number,
  radius: number
): { points: Point[]; lines: Line[] } {

  const points: Point[] = [
    [cx, cy - radius],
    [cx + radius * 0.72, cy - radius * 0.72],
    [cx + radius * 0.95, cy - radius * 0.32],
    [cx + radius, cy],
    [cx + radius * 0.95, cy + radius * 0.32],
    [cx + radius * 0.72, cy + radius * 0.72],
    [cx, cy + radius],
    [cx - radius * 0.72, cy + radius * 0.72],
    [cx - radius * 0.95, cy + radius * 0.32],
    [cx - radius, cy],
    [cx - radius * 0.95, cy - radius * 0.32],
    [cx - radius * 0.72, cy - radius * 0.72],
  ];

  const lines: Line[] = [];
  const set = new Set<string>();

  const add = (a: number, b: number) => {
    const k = a < b ? `${a}_${b}` : `${b}_${a}`;
    if (!set.has(k)) {
      set.add(k);
      lines.push([a, b]);
    }
  };

  add(0,1); add(1,2); add(2,3); add(3,4); add(4,5);
  add(5,6); add(6,7); add(7,8); add(8,9); add(9,10);
  add(10,11); add(11,0);

  return { points, lines };
}

export default function AdvancedServicesOrbit() {

  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const size = 460;
  const radius = 170;
  const center = size / 2;

  const { points, lines } = generateHexTriangleMesh(center, center, radius);

  const handleMouseMove = (e: React.MouseEvent) => {

    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width - 0.5) * 10;
    const percentY = (y / rect.height - 0.5) * 10;

    rotateX.set(-percentY);
    rotateY.set(percentX);

    setCursor({ x: e.clientX, y: e.clientY });

  };

  return (
    <section className="relative py-44 bg-[#fff7f7] overflow-hidden">

      {hoverLabel && (
        <div
          className="fixed z-[9999] pointer-events-none px-4 py-2 bg-white border border-red-600/40 backdrop-blur-xl text-black text-sm rounded-lg"
          style={{ top: cursor.y + 20, left: cursor.x + 20 }}
        >
          {hoverLabel}
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-28 items-center">

        {/* LEFT ORBIT */}

        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          style={{
            rotateX,
            rotateY,
            transformPerspective: 1200,
          }}
          className="flex justify-center"
        >

          <div className="relative" style={{ width: size, height: size }}>

            <svg width={size} height={size}>

              {lines.map(([a, b], i) => (
                <line
                  key={i}
                  x1={points[a][0]}
                  y1={points[a][1]}
                  x2={points[b][0]}
                  y2={points[b][1]}
                  stroke="rgba(255,80,80,0.6)"
                  strokeWidth="1.2"
                />
              ))}

              {points.map(([x, y], i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="3"
                  fill="#ff5757"
                />
              ))}

            </svg>

            {services.map((service, i) => {

              const angle = (i / services.length) * 2 * Math.PI;

              const x = center + radius * Math.cos(angle) - 28;
              const y = center + radius * Math.sin(angle) - 28;

              const Icon = service.icon;

              return (
                <motion.button
                  key={i}
                  style={{ left: x, top: y }}
                  className="absolute w-14 h-14 rounded-full
                             bg-white
                             border border-red-600/50
                             flex items-center justify-center
                             text-red-500
                             shadow-[0_0_15px_rgba(255,0,0,0.4)]
                             hover:shadow-[0_0_30px_rgba(255,0,0,0.7)]
                             transition-all duration-300"
                  whileHover={{ scale: 1.2 }}
                  onMouseEnter={() => setHoverLabel(service.label)}
                  onMouseLeave={() => setHoverLabel(null)}
                  onClick={() => navigate(service.path)}
                >
                  <Icon size={22} />
                </motion.button>
              );
            })}

            {/* CENTER LOGO */}

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

              <div className="w-40 h-40 rounded-full border border-red-600/40 bg-white flex items-center justify-center">

                <img
                  src={middleLogo}
                  className="w-24 h-24 object-contain"
                  alt="logo"
                />

              </div>

            </div>

          </div>
        </motion.div>

        {/* RIGHT TEXT */}

        <div>

          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl font-semibold mb-10 text-black"
          >

            We Build What Tomorrow Runs On

          </motion.h2>

          <p className="text-black/60 text-lg leading-relaxed">

            A futuristic digital ecosystem powered by scalable architecture,
            AI intelligence, secure infrastructure, and high-performance systems.

          </p>

        </div>

      </div>

    </section>
  );
}