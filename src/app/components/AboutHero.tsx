import { useEffect, useState, useRef } from "react"
import bgVideo from "../../assets/about-bgvideo.mp4"

const tagline =
  "Designing AI-driven platforms that connect technology with human intelligence."

export default function AboutHero() {

  const [displayedText, setDisplayedText] = useState("")
  const [index, setIndex] = useState(0)

  const heroRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  /* ---------------- TYPEWRITER ---------------- */

  useEffect(() => {

    if (index < tagline.length) {

      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + tagline[index])
        setIndex(index + 1)
      }, 35)

      return () => clearTimeout(timeout)

    }

  }, [index])


  /* ---------------- VIDEO PLAY ---------------- */

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])


  /* ---------------- PARALLAX ---------------- */

  useEffect(() => {

    const handleMouseMove = (e: MouseEvent) => {

      if (!heroRef.current) return

      const x = (window.innerWidth / 2 - e.clientX) / 60
      const y = (window.innerHeight / 2 - e.clientY) / 60

      heroRef.current.style.transform = `translate(${x}px, ${y}px)`

    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => window.removeEventListener("mousemove", handleMouseMove)

  }, [])


  /* ---------------- NEURAL SYSTEM ---------------- */

  useEffect(() => {

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const mouse = { x: 0, y: 0 }

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    })

    const nodes: any[] = []

    const NODE_COUNT = 70

    for (let i = 0; i < NODE_COUNT; i++) {

      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        energy: Math.random()
      })

    }

    function draw() {

      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      nodes.forEach((node) => {

        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        const dx = mouse.x - node.x
        const dy = mouse.y - node.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 150) {
          node.x -= dx * 0.015
          node.y -= dy * 0.015
        }

        const glow = Math.max(0, 1 - dist / 200)

        ctx.beginPath()
        ctx.arc(node.x, node.y, 2 + glow * 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,0,0,${0.6 + glow})`
        ctx.fill()

        nodes.forEach((other) => {

          const dx = node.x - other.x
          const dy = node.y - other.y
          const d = Math.sqrt(dx * dx + dy * dy)

          if (d < 120) {

            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(other.x, other.y)

            ctx.strokeStyle = `rgba(255,0,0,${0.15 - d / 800})`
            ctx.stroke()

            /* energy pulse */

            const t = (Date.now() % 2000) / 2000
            const px = node.x + (other.x - node.x) * t
            const py = node.y + (other.y - node.y) * t

            ctx.beginPath()
            ctx.arc(px, py, 2, 0, Math.PI * 2)
            ctx.fillStyle = "rgba(255,80,80,0.9)"
            ctx.fill()

          }

        })

      })

      requestAnimationFrame(draw)

    }

    draw()

  }, [])


  /* ---------------- RENDER ---------------- */

  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#060606]">

        {/* VIDEO */}

        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-25 blur-[3px]"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>


        {/* NEURAL CANVAS */}

        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10"
        />


        {/* OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80 z-20"></div>


        {/* CONTENT */}

        <div
          ref={heroRef}
          className="relative z-30 text-center max-w-3xl px-6 transition-transform duration-300 ease-out"
        >

          <h1 className="text-white font-semibold leading-tight">

            <span className="block text-[clamp(40px,6vw,72px)] line1">
              MindSoulix Tech
            </span>

            <span className="block text-[clamp(32px,4vw,54px)] line2">
              Where <span className="highlight">Mind</span> Meets The Machine{" "}
              <span className="highlight">Soul</span>
            </span>

          </h1>


          <p className="mt-6 text-[#9CA3AF] text-lg min-h-[28px]">
            {displayedText}
          </p>


          <button className="hero-btn mt-10 px-8 py-4 rounded-lg bg-[#E10600] text-white font-medium">
            Explore Our Vision
          </button>

        </div>

      </section>


      {/* STYLES */}

      <style>{`

        .line1{
          opacity:0;
          transform:translateY(40px);
          filter:blur(10px);
          animation:fadeSlide 1s forwards;
        }

        .line2{
          opacity:0;
          transform:translateY(40px);
          filter:blur(10px);
          animation:fadeSlide 1s .4s forwards;
        }

        .highlight{
          color:#E10600;
          text-shadow:0 0 20px rgba(255,0,0,0.6);
        }

        .hero-btn{
          opacity:0;
          transform:scale(.9);
          animation:btnReveal .6s .8s forwards;
          transition:all .3s ease;
        }

        .hero-btn:hover{
          transform:scale(1.05);
          box-shadow:0 0 25px rgba(255,0,0,0.5);
        }

        @keyframes fadeSlide{
          from{
            opacity:0;
            transform:translateY(40px);
            filter:blur(10px);
          }
          to{
            opacity:1;
            transform:translateY(0);
            filter:blur(0);
          }
        }

        @keyframes btnReveal{
          from{
            opacity:0;
            transform:scale(.9);
          }
          to{
            opacity:1;
            transform:scale(1);
          }
        }

      `}</style>
    </>
  )
}