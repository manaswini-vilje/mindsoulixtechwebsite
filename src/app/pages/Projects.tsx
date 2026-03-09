import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface ProjectTile {
  title: string;
  description: string;
}

interface ProjectData {
  id: string;
  image: string;
  tiles: ProjectTile[];
}

interface TileRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

const projectSlides: ProjectData[] = [
  {
    id: "zenoti",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    tiles: [
      { title: "Project Name", description: "Zenoti Salon Management Platform" },
      {
        title: "Case Study",
        description:
          "Cloud-based platform for managing bookings, staff, payments, and customer relationships."
      },
      {
        title: "Problem Statement",
        description:
          "Salon chains struggled with appointments, inventory, scheduling, and payments across locations."
      },
      {
        title: "How We Solved",
        description:
          "Built a centralized SaaS dashboard with booking, POS, inventory tracking, and analytics."
      },
      {
        title: "Tech Stack Used",
        description: "React, Node.js, PostgreSQL, AWS, Stripe API, Redis"
      },
      {
        title: "Outcomes",
        description: "Manual booking errors reduced by 85% and operations became significantly faster."
      },
      {
        title: "Impact",
        description:
          "5,000+ salons adopted the system, improving customer experience and reducing overhead."
      },
      {
        title: "Client Feedback",
        description:
          "“The platform transformed our daily operations and helped us scale faster than ever.”"
      }
    ]
  },
  {
    id: "avana",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
    tiles: [
      { title: "Project Name", description: "Avana Smart Logistics Platform" },
      {
        title: "Case Study",
        description:
          "A logistics platform automating shipment bookings with real-time freight visibility."
      },
      {
        title: "Problem Statement",
        description:
          "Manual logistics workflows caused delays and limited shipment tracking accuracy."
      },
      {
        title: "How We Solved",
        description:
          "Implemented route optimization, auto-booking, and live tracking in a single dashboard."
      },
      {
        title: "Tech Stack Used",
        description: "React, Python, Django, PostgreSQL, Google Maps API, Docker"
      },
      {
        title: "Outcomes",
        description: "Shipment booking time dropped from 2 days to just 2 minutes."
      },
      {
        title: "Impact",
        description: "55,000+ shipments processed and 2,000+ businesses onboarded in year one."
      },
      {
        title: "Client Feedback",
        description:
          "“Automation reduced our logistics workload drastically and improved shipment accuracy.”"
      }
    ]
  },
  {
    id: "ai-support",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    tiles: [
      { title: "Project Name", description: "AI Customer Support Assistant" },
      {
        title: "Case Study",
        description:
          "An AI support assistant for websites and apps that automates repetitive conversations."
      },
      {
        title: "Problem Statement",
        description:
          "Support teams were overloaded with repetitive tickets and delayed responses."
      },
      {
        title: "How We Solved",
        description:
          "Developed conversational AI for FAQs, ticket routing, and CRM-connected workflows."
      },
      {
        title: "Tech Stack Used",
        description: "Python, TensorFlow, OpenAI APIs, Node.js, React"
      },
      {
        title: "Outcomes",
        description: "Automated 70% of incoming support queries without human intervention."
      },
      {
        title: "Impact",
        description:
          "Support response time reduced by 90% with a major uplift in satisfaction scores."
      },
      {
        title: "Client Feedback",
        description:
          "“The AI assistant dramatically improved our support efficiency and customer experience.”"
      }
    ]
  },
  {
    id: "healthcare",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
    tiles: [
      { title: "Project Name", description: "Healthcare Appointment & Records System" },
      {
        title: "Case Study",
        description:
          "Digital healthcare platform for appointments, reports access, and online doctor consultation."
      },
      {
        title: "Problem Statement",
        description:
          "Hospitals faced appointment overcrowding and inefficient patient record handling."
      },
      {
        title: "How We Solved",
        description:
          "Built an integrated patient portal for booking, scheduling, and digital records."
      },
      {
        title: "Tech Stack Used",
        description: "Next.js, Node.js, MongoDB, AWS, WebRTC"
      },
      {
        title: "Outcomes",
        description: "Average appointment waiting times reduced by 60%."
      },
      {
        title: "Impact",
        description: "Hospitals now manage 10,000+ patient appointments per month."
      },
      {
        title: "Client Feedback",
        description:
          "“The system made hospital management significantly smoother and improved patient experience.”"
      }
    ]
  },
  {
    id: "commerce-analytics",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    tiles: [
      { title: "Project Name", description: "E-commerce Analytics Intelligence Platform" },
      {
        title: "Case Study",
        description:
          "Analytics engine helping retailers monitor trends and optimize marketing decisions."
      },
      {
        title: "Problem Statement",
        description:
          "Retail teams lacked reliable visibility into behavior, performance, and sales trends."
      },
      {
        title: "How We Solved",
        description:
          "Created a real-time dashboard integrating sales, campaign, and customer data streams."
      },
      {
        title: "Tech Stack Used",
        description: "React, Python, Apache Kafka, PostgreSQL, AWS"
      },
      {
        title: "Outcomes",
        description: "Marketing campaign ROI improved by 45% through data-backed decisions."
      },
      {
        title: "Impact",
        description: "Retail teams unlocked actionable insights that boosted revenue growth."
      },
      {
        title: "Client Feedback",
        description:
          "“The analytics platform helped us understand our customers better and grow sales significantly.”"
      }
    ]
  }
];

const tileLayout: TileRect[] = [
  { left: 0, top: 0, width: 38, height: 34 },
  { left: 38, top: 0, width: 22, height: 20 },
  { left: 60, top: 0, width: 40, height: 28 },
  { left: 38, top: 20, width: 22, height: 32 },
  { left: 0, top: 34, width: 30, height: 36 },
  { left: 30, top: 34, width: 30, height: 36 },
  { left: 60, top: 28, width: 40, height: 42 },
  { left: 0, top: 70, width: 60, height: 30 }
];

const flipDelays = [0, 0, 0.14, 0.22, 0.12, 0.32, 0.42, 0.28];

export default function Projects() {
  const projectsSectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const projectsInView = useInView(projectsSectionRef, { amount: 0.25 });

  useEffect(() => {
    if (!projectsInView || paused) return;

    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projectSlides.length);
    }, 6800);

    return () => window.clearInterval(interval);
  }, [projectsInView, paused]);

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

      {/* OUR PROJECTS */}
      <section
        ref={projectsSectionRef}
        id="our-projects"
        className="relative z-20 bg-[#fff7f7] px-6 pt-28 pb-32"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-4xl font-semibold text-black">Our Projects</h2>

          <div className="mt-14 overflow-hidden rounded-2xl">
            <motion.div
              className="flex"
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {projectSlides.map((project, index) => (
                <div key={project.id} className="w-full shrink-0">
                  <ProjectGridSlide
                    project={project}
                    isActive={projectsInView && activeIndex === index}
                    onClientClick={scrollToClient}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          <div className="mt-8 flex justify-center gap-2.5">
            {projectSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to ${slide.id} project`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "w-8 bg-[#e10600] shadow-[0_0_12px_rgba(225,6,0,0.4)]"
                    : "w-2.5 bg-black/20 hover:bg-black/35"
                }`}
              />
            ))}
          </div>
        </div>
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

function ProjectGridSlide({
  project,
  isActive,
  onClientClick
}: {
  project: ProjectData;
  isActive: boolean;
  onClientClick: () => void;
}) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setFlipped(false);
      return;
    }

    setFlipped(false);
    const wait = 1200 + Math.floor(Math.random() * 600);
    const timer = window.setTimeout(() => setFlipped(true), wait);

    return () => window.clearTimeout(timer);
  }, [isActive, project.id]);

  return (
    <div className="mx-auto max-w-[1120px] px-1">
      <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_14px_34px_rgba(0,0,0,0.08)] md:aspect-[16/9]">
        {tileLayout.map((tile, index) => {
          const tileData = project.tiles[index];
          const isClientTile = tileData.title === "Client Feedback";

          return (
            <div
              key={`${project.id}-${tileData.title}`}
              className="absolute p-1.5 md:p-2"
              style={{
                left: `${tile.left}%`,
                top: `${tile.top}%`,
                width: `${tile.width}%`,
                height: `${tile.height}%`
              }}
            >
              <motion.button
                type="button"
                disabled={!isClientTile}
                onClick={isClientTile ? onClientClick : undefined}
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{
                  duration: 0.75,
                  ease: [0.22, 1, 0.36, 1],
                  delay: flipped ? flipDelays[index] : 0
                }}
                className={`group relative h-full w-full rounded-xl text-left [transform-style:preserve-3d] transition-all duration-300 ${
                  isClientTile ? "cursor-pointer" : "cursor-default"
                } hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.14)]`}
              >
                <div className="absolute inset-0 overflow-hidden rounded-xl border border-white/75 [backface-visibility:hidden]">
                  <img
                    src={`${project.image}?auto=format&fit=crop&w=1600&q=80`}
                    alt={project.tiles[0].description}
                    className="absolute max-w-none select-none"
                    style={{
                      width: `${(100 / tile.width) * 100}%`,
                      height: `${(100 / tile.height) * 100}%`,
                      left: `-${(tile.left / tile.width) * 100}%`,
                      top: `-${(tile.top / tile.height) * 100}%`
                    }}
                  />
                </div>

                <div className="absolute inset-0 rounded-xl border border-black/10 bg-white p-3 [backface-visibility:hidden] [transform:rotateY(180deg)] md:p-4">
                  <h3 className="text-xs font-semibold text-[#1f1f1f] md:text-sm">{tileData.title}</h3>
                  <p className="mt-1.5 text-[10px] leading-relaxed text-gray-600 md:text-xs">
                    {tileData.description}
                  </p>
                  {isClientTile ? (
                    <span className="mt-2 inline-block rounded-md bg-[#e10600]/10 px-2 py-1 text-[10px] font-medium text-[#e10600]">
                      Click to view section
                    </span>
                  ) : null}
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-xl shadow-[0_0_0_rgba(225,6,0,0)] transition-all duration-300 group-hover:shadow-[0_0_24px_rgba(225,6,0,0.25)]" />
              </motion.button>
            </div>
          );
        })}
      </div>
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
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.35 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);

  }, [isVisible, testimonials.length]);

  const getPosition = (index: number) => {

    if (index === active) return "center";
    if (index === (active + 1) % testimonials.length) return "right";
    return "left";

  };

  return (

    <section
      ref={sectionRef}
      id="client-feedback"
      className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#fff7f7] via-white to-[#fff7f7] text-black overflow-hidden"
    >

      <div className={`absolute w-[1000px] h-[1000px] bg-[#E10600]/15 blur-[250px] rounded-full ${isVisible ? "animate-pulse" : ""}`} />

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
