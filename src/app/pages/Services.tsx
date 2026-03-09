import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
} from "react";
import { motion, type Variants } from "framer-motion";
import { useLocation } from "react-router-dom";
import {
  Brain,
  Cloud,
  Code,
  Palette,
  Settings,
  Smartphone,
  TrendingUp,
} from "lucide-react";
import ServiceSections from "../components/ServiceSections";
import { type ServiceId, servicesData } from "@/data/servicesData";
import serviceHeroBg from "@/assets/serviceherobg.png";

type CardPosition = "left" | "center" | "right" | "hidden";

const iconByService: Record<
  ServiceId,
  ComponentType<{ size?: number; className?: string }>
> = {
  web: Code,
  app: Smartphone,
  cloud: Cloud,
  uiux: Palette,
  marketing: TrendingUp,
  ai: Brain,
  support: Settings,
};

const carouselVariants: Variants = {
  center: {
    x: 0,
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    zIndex: 30,
  },
  left: {
    x: -560,
    scale: 0.78,
    opacity: 0.28,
    filter: "blur(3px)",
    zIndex: 20,
  },
  right: {
    x: 560,
    scale: 0.78,
    opacity: 0.28,
    filter: "blur(3px)",
    zIndex: 20,
  },
  hidden: {
    x: 0,
    scale: 0.72,
    opacity: 0,
    filter: "blur(0px)",
    zIndex: 10,
  },
};

export default function Services() {
  const [active, setActive] = useState(0);
  const location = useLocation();

  const heroTargetRef = useRef<HTMLElement | null>(null);
  const sectionRefs = useRef<Record<ServiceId, HTMLElement | null>>({
    web: null,
    app: null,
    cloud: null,
    uiux: null,
    marketing: null,
    ai: null,
    support: null,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % servicesData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!location.hash) return;

    const scrollToHashSection = () => {
      const target = document.querySelector(location.hash) as HTMLElement | null;
      if (!target) return false;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    };

    if (scrollToHashSection()) return;

    const retry = window.setTimeout(scrollToHashSection, 120);
    return () => window.clearTimeout(retry);
  }, [location.pathname, location.hash]);

  const servicePositions = useMemo(
    () =>
      servicesData.map((_, index): CardPosition => {
        if (index === active) return "center";
        if (index === (active - 1 + servicesData.length) % servicesData.length) return "left";
        if (index === (active + 1) % servicesData.length) return "right";
        return "hidden";
      }),
    [active]
  );

  const scrollToServices = () => {
    heroTargetRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCardClick = (id: ServiceId, index: number) => {
    setActive(index);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="overflow-x-hidden bg-[#fff7f7] text-black">
      <section
        className="relative flex h-screen items-center justify-center overflow-hidden px-6 text-center"
      >
        <div
          className="absolute inset-0 scale-[1.03] opacity-15 blur-[2px]"
          style={{
            backgroundImage: `url(${serviceHeroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 max-w-5xl">
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            Digital Solutions That Power
            <span className="block text-[#E10600]">Modern Businesses</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-black/60 md:text-lg">
            We engineer scalable digital systems with premium design and
            reliable performance.
          </p>

          <button
            type="button"
            onClick={scrollToServices}
            className="mt-10 rounded-xl bg-[#E10600] px-8 py-4 text-base font-semibold text-white transition hover:brightness-95"
          >
            Explore With Us
          </button>
        </div>
      </section>

      <section
        ref={heroTargetRef}
        className="relative bg-[#fff7f7] px-6 pb-24 pt-6 md:px-10 md:pb-32"
      >
        <h2 className="mb-16 text-center text-4xl font-bold md:text-5xl">
          Our Services
        </h2>

        <div className="relative mx-auto flex h-[440px] max-w-[1200px] items-center justify-center">
          {servicesData.map((service, index) => {
            const Icon = iconByService[service.id];
            const position = servicePositions[index];

            return (
              <motion.article
                key={service.id}
                initial={false}
                animate={position}
                variants={carouselVariants}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => handleCardClick(service.id, index)}
                className={`absolute flex w-[720px] max-w-[92vw] items-center justify-between rounded-3xl border border-black/10 bg-white p-14 shadow-[0_20px_60px_rgba(0,0,0,0.08)] ${
                  position === "hidden" ? "pointer-events-none" : "cursor-pointer"
                }`}
              >
                <div>
                  <h3 className="text-3xl font-bold text-[#E10600] md:text-4xl">
                    {service.title}
                  </h3>
                  <p className="mt-4 max-w-md text-black/60">{service.shortDescription}</p>
                </div>

                <div className="ml-8 flex h-[140px] w-[140px] shrink-0 items-center justify-center rounded-2xl bg-[#E10600]/10 text-[#E10600]">
                  <Icon size={76} />
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <ServiceSections sectionRefs={sectionRefs} />
    </div>
  );
}
