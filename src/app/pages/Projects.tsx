import ProjectCarousel from "../components/projects/ProjectsCarousel";
import { useEffect, useState } from "react";

const projects = [
  {
    title: "AI Analytics Platform",
    description: "Enterprise AI dashboard with predictive modeling.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
  },
  {
    title: "Fintech Application",
    description: "Secure digital banking system.",
    image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
  },
  {
    title: "Client Feedback",
    description: "See what our clients say about us.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    isClient: true,
  },
];

export default function Projects() {

  const scrollToClient = () => {
    const el = document.getElementById("client-feedback");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#fff7f7] text-black overflow-hidden">

      {/* HERO WRAPPER HEIGHT */}
      <section className="relative h-[160vh]">

        {/* STICKY HERO */}
        <div className="sticky top-0 h-screen flex items-center justify-center text-center px-6 overflow-hidden">

          {/* MOVING GRID */}
          <div className="absolute inset-0 grid-bg" />

          {/* RED GLOW */}
          <div className="absolute w-[900px] h-[900px] bg-[#E10600]/20 blur-[220px] rounded-full top-1/3 left-1/2 -translate-x-1/2" />

          <div className="relative max-w-4xl">

            <h1 className="text-6xl font-bold leading-tight">
              Transforming Ideas Into
              <br />
              <span className="text-[#E10600]">
                Impactful Products
              </span>
            </h1>

            <p className="text-black/60 mt-6 text-lg">
              We build scalable digital systems that redefine industries.
            </p>

          </div>
        </div>

      </section>

      {/* PROJECT GRID SECTION */}
      <section className="relative z-20 bg-[#fff7f7] px-10 pt-32 pb-32">

        <ProjectCarousel
          projects={projects}
          onClientClick={scrollToClient}
        />

      </section>

      {/* CLIENT FEEDBACK */}
      <ClientFeedback />

      {/* GRID STYLE */}
      <style>
        {`
        .grid-bg{
          background-image:
            linear-gradient(rgba(0,0,0,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.07) 1px, transparent 1px);
          background-size: 70px 70px;
          animation: gridMove 25s linear infinite;
        }

        @keyframes gridMove{
          from{
            background-position:0 0,0 0;
          }
          to{
            background-position:70px 70px,70px 70px;
          }
        }
        `}
      </style>

    </div>
  );
}

function ClientFeedback() {

  const testimonials = [
    {
      text: "Working with this team transformed our infrastructure completely. Performance doubled within weeks.",
      name: "John Carter",
      company: "TechNova Inc.",
    },
    {
      text: "Their engineering precision and scalable architecture exceeded every expectation.",
      name: "Sarah Lee",
      company: "FinCore Systems",
    },
    {
      text: "Professional, strategic, and deeply technical. A rare combination in today’s market.",
      name: "Michael Reed",
      company: "CloudSphere",
    },
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);

  }, []);

  const getPosition = (index: number) => {

    if (index === active) return "center";
    if (index === (active + 1) % testimonials.length) return "right";
    return "left";

  };

  return (

    <section
      id="client-feedback"
      className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#fff7f7] via-white to-[#fff7f7] text-black overflow-hidden"
    >

      <div className="absolute w-[1000px] h-[1000px] bg-[#E10600]/15 blur-[250px] rounded-full animate-pulse" />

      <div className="text-center mb-24 relative z-10">

        <h2 className="text-6xl font-bold tracking-tight">
          Client Feedback
        </h2>

        <div className="w-40 h-[4px] bg-[#E10600] mx-auto mt-6" />

      </div>

      <div className="relative w-full max-w-6xl h-[500px] flex items-center justify-center">

        {testimonials.map((item, index) => {

          const position = getPosition(index);

          return (

            <div
              key={index}
              className={`absolute transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] 
              rounded-3xl p-14 w-[520px] backdrop-blur-2xl border border-[#E10600]/40 
              shadow-[0_0_60px_rgba(225,6,0,0.25)]

              ${
                position === "center"
                  ? "translate-x-0 scale-100 opacity-100 z-30"
                  : position === "left"
                  ? "-translate-x-[600px] scale-75 opacity-30 blur-md z-10"
                  : "translate-x-[600px] scale-75 opacity-30 blur-md z-10"
              }`}

              style={{
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.8), rgba(255,255,255,0.5))",
              }}
            >

              <p className="text-black/80 text-xl leading-relaxed">
                “{item.text}”
              </p>

              <div className="text-yellow-500 mt-8 text-2xl">
                ★★★★★
              </div>

              <h4 className="mt-8 text-[#E10600] font-semibold text-xl">
                {item.name}
              </h4>

              <p className="text-black/60 text-sm">
                {item.company}
              </p>

            </div>

          );

        })}

      </div>

    </section>

  );
}