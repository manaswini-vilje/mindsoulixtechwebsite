import {
  useEffect,
  useState,
  type ComponentType,
  type MutableRefObject,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Brain,
  Cloud,
  Code,
  Palette,
  Settings,
  Smartphone,
  TrendingUp,
} from "lucide-react";
import {
  type ExpandablePanel,
  type ServiceData,
  type ServiceId,
  servicesData,
} from "@/data/servicesData";

interface ServiceSectionsProps {
  sectionRefs: MutableRefObject<Record<ServiceId, HTMLElement | null>>;
}

const iconsByService: Record<
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

const sectionIdByService: Record<ServiceId, string> = {
  web: "web-development",
  app: "app-development",
  cloud: "cloud-integration",
  uiux: "uiux-design",
  marketing: "digital-marketing",
  ai: "ai-ml-development",
  support: "software-support",
};

export default function ServiceSections({ sectionRefs }: ServiceSectionsProps) {
  const [expanded, setExpanded] = useState<{
    serviceId: ServiceId;
    panel: ExpandablePanel;
  } | null>(null);

  const activeService = expanded
    ? servicesData.find((service) => service.id === expanded.serviceId) ?? null
    : null;

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpanded(null);
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = expanded ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [expanded]);

  const openPanel = (serviceId: ServiceId, panel: ExpandablePanel) => {
    setExpanded({ serviceId, panel });
  };

  const closePanel = () => {
    setExpanded(null);
  };

  return (
    <div className="relative z-20 bg-[#fff7f7]">
      {servicesData.map((service) => {
        const Icon = iconsByService[service.id];
        const isActiveService = expanded?.serviceId === service.id;

        return (
          <section
            key={service.id}
            id={sectionIdByService[service.id]}
            ref={(el) => {
              sectionRefs.current[service.id] = el;
            }}
            className="scroll-mt-24 border-t border-black/10 px-6 py-24 md:px-10"
          >
            <div className="mx-auto max-w-7xl">
              <div className="mb-14 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
                <h2 className="text-4xl font-bold leading-tight md:text-5xl">
                  {service.title}
                </h2>
                <p className="max-w-2xl text-base leading-relaxed text-black/65 md:text-lg">
                  {service.shortDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.2fr_1fr] lg:grid-rows-[auto_auto]">
                <motion.button
                  type="button"
                  onClick={() => openPanel(service.id, "visual")}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                  whileHover={{ y: -6, boxShadow: "0 16px 34px rgba(0,0,0,0.14)" }}
                  className={`group relative overflow-hidden rounded-[18px] border text-left shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 lg:row-span-2 ${
                    isActiveService && expanded?.panel === "visual"
                      ? "border-[#E10600]/50"
                      : "border-black/10"
                  }`}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-[420px] w-full object-cover transition duration-500 group-hover:opacity-0"
                  />

                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white opacity-0 transition duration-500 group-hover:opacity-100">
                    <Icon size={42} className="text-[#E10600]" />
                    <span className="text-center text-lg font-semibold text-[#E10600]">
                      {service.title}
                    </span>
                  </div>
                </motion.button>

                <div className="grid grid-cols-1 gap-7 lg:grid-cols-2 lg:grid-rows-[auto_auto]">
                  <InfoBox
                    title="Overview"
                    preview="Understand what this service delivers and how it benefits your business."
                    onClick={() => openPanel(service.id, "overview")}
                    active={isActiveService && expanded?.panel === "overview"}
                    animationOrder={1}
                  />
                  <InfoBox
                    title="Key Features"
                    preview="Explore the main capabilities and highlights of this service."
                    onClick={() => openPanel(service.id, "features")}
                    active={isActiveService && expanded?.panel === "features"}
                    animationOrder={2}
                  />
                  <InfoBox
                    title="Tech Stack"
                    preview="Technologies and frameworks used to build this solution."
                    onClick={() => openPanel(service.id, "tech")}
                    active={isActiveService && expanded?.panel === "tech"}
                    animationOrder={3}
                  />
                  <InfoBox
                    title="Why Choose This Service"
                    preview="Reasons why businesses trust this service."
                    onClick={() => openPanel(service.id, "why")}
                    active={isActiveService && expanded?.panel === "why"}
                    animationOrder={4}
                  />
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <AnimatePresence>
        {activeService && expanded && (
          <motion.div
            key={`${expanded.serviceId}-${expanded.panel}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4 py-8 backdrop-blur-md"
            onClick={closePanel}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
              className="grid max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl md:grid-cols-[300px_1fr]"
            >
              <div className="h-72 md:h-full">
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="overflow-y-auto p-6 md:p-10">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-black/45">
                      {activeService.title}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-[#E10600]">
                      {getPanelTitle(expanded.panel)}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={closePanel}
                    className="rounded-lg border border-black/15 px-4 py-2 text-sm font-medium text-black transition hover:border-[#E10600] hover:text-[#E10600]"
                  >
                    Close
                  </button>
                </div>

                {renderExpandedContent(activeService, expanded.panel)}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface InfoBoxProps {
  title: string;
  preview: string;
  onClick: () => void;
  active: boolean;
  animationOrder?: number;
  className?: string;
}

function InfoBox({
  title,
  preview,
  onClick,
  active,
  animationOrder = 0,
  className = "",
}: InfoBoxProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.08 + animationOrder * 0.08,
      }}
      whileHover={{ y: -6, boxShadow: "0 16px 34px rgba(0,0,0,0.14)" }}
      className={`group rounded-[16px] border bg-white p-6 text-left shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 ${
        active ? "border-[#E10600]/45 bg-[#fff4f4]" : "border-black/10"
      } ${className}`}
    >
      <h3 className="text-[20px] font-semibold text-black transition-all duration-300 group-hover:text-[#E10600] group-hover:font-bold">
        {title}
      </h3>
      <p className="mt-2 text-[15px] leading-[1.6] text-[#555] transition-all duration-300 group-hover:font-bold group-hover:text-[#E10600]">
        {preview}
      </p>
    </motion.button>
  );
}

function getPanelTitle(panel: ExpandablePanel) {
  if (panel === "overview") return "Overview";
  if (panel === "features") return "Key Features";
  if (panel === "tech") return "Tech Stack";
  if (panel === "why") return "Why Choose This";
  if (panel === "process") return "How We Solve";
  return "Service Snapshot";
}

function renderExpandedContent(service: ServiceData, panel: ExpandablePanel) {
  if (panel === "overview") {
    return (
      <>
        <p className="max-w-3xl text-base leading-relaxed text-black/75">
          {service.overview}
        </p>
      </>
    );
  }

  if (panel === "features") {
    return (
      <>
        <div className="space-y-4">
          {service.features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-black/10 bg-[#fff7f7] p-4"
            >
              <h4 className="text-lg font-semibold text-black">{feature.title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-black/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </>
    );
  }

  if (panel === "tech") {
    return (
      <>
        <div className="flex flex-wrap gap-3">
          {service.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-black/15 px-3 py-2 text-sm font-medium text-black"
            >
              {tech}
            </span>
          ))}
        </div>
      </>
    );
  }

  if (panel === "why") {
    return (
      <>
        <ul className="list-disc space-y-2 pl-5 text-black/75">
          {service.whyChoose.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </>
    );
  }

  if (panel === "process") {
    return (
      <>
        <ol className="list-decimal space-y-2 pl-5 text-black/75">
          {service.processSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </>
    );
  }

  return (
    <>
      <p className="max-w-3xl text-base leading-relaxed text-black/75">
        {service.shortDescription} We align strategy, design, and engineering to
        deliver measurable outcomes with premium execution quality.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {service.features.slice(0, 4).map((feature) => (
          <div key={feature.title} className="rounded-lg border border-black/10 p-3">
            <p className="text-sm font-semibold text-black">{feature.title}</p>
          </div>
        ))}
      </div>
    </>
  );
}
