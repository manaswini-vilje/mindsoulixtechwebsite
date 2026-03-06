import { useEffect, useRef } from "react"

export default function WhatMakesDifferent() {

  const arrowRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {

    const cx = 380
    const cy = 170
    const rx = 350
    const ry = 150
    const rotation = -12 * (Math.PI / 180)
    const cosR = Math.cos(rotation)
    const sinR = Math.sin(rotation)

    const tMin = Math.PI
    const tMax = 2 * Math.PI
    let t = tMin
    const speed = 0.008

    let rafId: number
    const animate = () => {

      t += speed
      if (t >= tMax) t = tMin

      const cos = Math.cos(t)
      const sin = Math.sin(t)

      const vx = cx + rx * cos * cosR - ry * sin * sinR
      const vy = cy + rx * cos * sinR + ry * sin * cosR

      const dx = -rx * sin * cosR - ry * cos * sinR
      const dy = -rx * sin * sinR + ry * cos * cosR
      const angle = Math.atan2(dy, dx) * (180 / Math.PI)

      if (!arrowRef.current || !containerRef.current) {
        rafId = requestAnimationFrame(animate)
        return
      }

      const cw = containerRef.current.offsetWidth
      const svgCenterX = cw / 2
      const svgTop = 60
      const svgCenterY = svgTop + 170

      const ox = vx - 380
      const oy = vy - 170
      const rotX = ox * cosR - oy * sinR
      const rotY = ox * sinR + oy * cosR
      const posX = svgCenterX + rotX
      const posY = svgCenterY + rotY

      arrowRef.current.style.transform =
        `translate(${posX}px, ${posY}px) translate(-50%,-50%) rotate(${angle}deg)`

      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)

  }, [])

  return (

<section className="relative w-full bg-[#fff7f7] py-32 overflow-hidden">

<div className="max-w-[660px] mx-auto px-6 relative">

{/* HEADING */}

<h2 className="text-center text-5xl font-semibold text-black mb-20">
What Makes <span className="text-[#E10600]">MindSoulix Tech</span> Different
</h2>

<div className="relative w-full h-[420px]" ref={containerRef}>


{/* ORBIT BACK */}

<svg
className="absolute left-1/2 top-[60px] -translate-x-1/2 -rotate-[12deg] z-0"
width="760"
height="340"
viewBox="0 0 760 340"
>

<defs>

<linearGradient id="orbitGlow">
<stop offset="0%" stopColor="white" stopOpacity="0.08"/>
<stop offset="50%" stopColor="white" stopOpacity="0.8"/>
<stop offset="100%" stopColor="white" stopOpacity="0.08"/>
</linearGradient>

</defs>

<ellipse
cx="380"
cy="170"
rx="350"
ry="150"
fill="none"
stroke="url(#orbitGlow)"
strokeWidth="2"
/>

</svg>


{/* MOVING ARROW */}

<div
ref={arrowRef}
className="absolute z-40"
style={{ left: 0, top: 0 }}
>

<svg width="18" height="18" viewBox="0 0 24 24" fill="#ff2a2a">
<path d="M2 12 L18 4 L14 12 L18 20 Z"/>
</svg>

</div>


{/* CARDS */}

<div className="relative grid grid-cols-2 gap-x-4 gap-y-6 justify-center z-20">


<div className="bg-white border border-black/10 rounded-xl p-6
w-[250px] h-[210px]
shadow-[0_0_40px_rgba(255,0,0,0.12)]">

<h3 className="text-black text-lg font-semibold mb-3">
AI-First Architecture
</h3>

<p className="text-gray-600 text-sm leading-relaxed">
Artificial intelligence is embedded at the foundation of every platform we design,
enabling systems that continuously learn and evolve.
</p>

</div>


<div className="bg-white border border-black/10 rounded-xl p-6
w-[250px] h-[210px]
shadow-[0_0_40px_rgba(255,0,0,0.12)]">

<h3 className="text-black text-lg font-semibold mb-3">
Human-Centered Design
</h3>

<p className="text-gray-600 text-sm leading-relaxed">
Technology should empower people. Our systems are built around human creativity,
decision-making, and real-world workflows.
</p>

</div>


<div className="bg-white border border-black/10 rounded-xl p-6
w-[250px] h-[210px]
shadow-[0_0_40px_rgba(255,0,0,0.12)]">

<h3 className="text-black text-lg font-semibold mb-3">
Scalable Intelligence
</h3>

<p className="text-gray-600 text-sm leading-relaxed">
MindSoulix architectures grow with organizations,
expanding capabilities without compromising performance.
</p>

</div>


<div className="bg-[#fff7f7] border border-black/10 rounded-xl p-6
w-[250px] h-[210px]
shadow-[0_0_40px_rgba(255,0,0,0.12)]">

<h3 className="text-black text-lg font-semibold mb-3">
Future-Ready Platforms
</h3>

<p className="text-gray-600 text-sm leading-relaxed">
We build systems designed for the next generation of intelligence,
prepared for rapid technological evolution.
</p>

</div>

</div>


{/* ORBIT FRONT */}

<svg
className="absolute left-1/2 top-[60px] -translate-x-1/2 -rotate-[12deg] z-30 pointer-events-none"
width="760"
height="340"
viewBox="0 0 760 340"
>

<path
d="M30 170 a350 150 0 0 1 700 0"
fill="none"
stroke="url(#orbitGlow)"
strokeWidth="2.2"
opacity="0.85"
/>

</svg>

</div>

</div>

</section>

)

}