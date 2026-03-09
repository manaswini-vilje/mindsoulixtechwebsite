import { motion, useInView } from "framer-motion"
import { Cloud, Code2, Cpu, Database, DollarSign, Layers, Wrench, Zap, type LucideIcon } from "lucide-react"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"

interface Feature {
  title: string
  description: string
  icon: LucideIcon
}

const leftFeatures: Feature[] = [
  {
    icon: Wrench,
    title: "Innovation Driven",
    description:
      "We build intelligent digital platforms designed to solve complex business challenges and drive technological innovation."
  },
  {
    icon: DollarSign,
    title: "Scalable Solutions",
    description:
      "Our systems are engineered for performance and scalability, ensuring your technology grows alongside your business."
  }
]

const rightFeatures: Feature[] = [
  {
    icon: Zap,
    title: "Fast Delivery",
    description:
      "From concept to deployment, our agile development process ensures rapid delivery without compromising quality."
  },
  {
    icon: Layers,
    title: "End-to-End Engineering",
    description:
      "MindSoulix provides complete digital engineering — from product design to cloud deployment and AI integration."
  }
]

const floatingElements = [
  { icon: Cloud, className: "-top-8 -left-10", duration: 6.8, delay: 0.1 },
  { icon: Code2, className: "top-10 -right-12", duration: 7.6, delay: 0.35 },
  { icon: Database, className: "bottom-12 -left-12", duration: 6.2, delay: 0.55 },
  { icon: Cpu, className: "-bottom-8 -right-10", duration: 7.1, delay: 0.8 }
]

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  viewport: { once: true, amount: 0.25 }
}

export default function WhyChoose() {
  const navigate = useNavigate()
  const sectionRef = useRef<HTMLElement | null>(null)
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.25 })

  return (
    <section ref={sectionRef} className="bg-[#fff7f7] py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2 {...reveal} className="text-center text-4xl font-semibold text-black">
          Why Choose MindSoulix Tech?
        </motion.h2>

        <motion.p
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.08 }}
          className="mx-auto mt-4 max-w-xl text-center text-gray-600"
        >
          MindSoulix combines advanced engineering, intelligent systems, and human-centered
          design to build scalable digital solutions.
        </motion.p>

        <div className="mt-16 grid items-center gap-16 lg:grid-cols-3">
          <motion.div
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.1 }}
            className="order-2 grid gap-10 lg:order-1"
          >
            {leftFeatures.map((feature, index) => (
              <FeatureBlock key={feature.title} feature={feature} align="left" delay={index * 0.06} />
            ))}
          </motion.div>

          <motion.div
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.16 }}
            className="order-1 mx-auto lg:order-2"
          >
            <div className="relative w-[320px]">
              {floatingElements.map((element, index) => (
                <motion.span
                  key={`${element.className}-${index}`}
                  animate={
                    sectionInView
                      ? { opacity: [0.82, 1, 0.82], y: [0, -9, 0] }
                      : { opacity: 0, y: 0 }
                  }
                  transition={{
                    duration: element.duration,
                    delay: element.delay,
                    repeat: sectionInView ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                  className={`pointer-events-none absolute hidden h-10 w-10 items-center justify-center rounded-lg border border-red-300/45 bg-white/90 text-red-600 shadow-[0_0_18px_rgba(225,6,0,0.28)] md:flex ${element.className}`}
                >
                  <element.icon className="h-5 w-5" />
                </motion.span>
              ))}
              <div className="absolute top-6 left-6 -z-10 h-[340px] w-[340px] rounded-lg bg-red-200" />
              <div className="absolute top-3 left-3 -z-10 h-[380px] w-[320px] rounded-xl border border-red-300/55" />
              <img
                src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f"
                alt="MindSoulix engineering team"
                className="h-[380px] w-[320px] rounded-xl object-cover shadow-lg"
              />
            </div>
          </motion.div>

          <motion.div
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.22 }}
            className="order-3 grid gap-10"
          >
            {rightFeatures.map((feature, index) => (
              <FeatureBlock key={feature.title} feature={feature} align="right" delay={index * 0.06} />
            ))}
          </motion.div>
        </div>

        <motion.button
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.28 }}
          type="button"
          onClick={() => navigate("/services")}
          className="mx-auto mt-14 block rounded-lg bg-red-600 px-8 py-3 font-semibold text-white shadow-md transition hover:bg-red-700"
        >
          Explore Our Capabilities
        </motion.button>
      </div>
    </section>
  )
}

function FeatureBlock({
  feature,
  align,
  delay
}: {
  feature: Feature
  align: "left" | "right"
  delay: number
}) {
  const Icon = feature.icon

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.35 }}
      className={`group ${align === "right" ? "text-right lg:items-end" : "text-left"} flex flex-col`}
    >
      <span className="mb-3">
        <Icon className="h-7 w-7 text-red-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:rotate-6 group-hover:scale-110 group-hover:text-red-700 group-hover:drop-shadow-[0_0_12px_rgba(225,6,0,0.6)]" />
      </span>
      <h3 className="text-lg font-semibold text-black">{feature.title}</h3>
      <p className="mt-2 max-w-[260px] text-sm leading-relaxed text-gray-600">{feature.description}</p>
    </motion.article>
  )
}
