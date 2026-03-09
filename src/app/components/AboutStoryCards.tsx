import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface StoryItem {
  title: string
  paragraphs: string[]
  image: string
  reverse?: boolean
}

const storyItems: StoryItem[] = [
  {
    title: "The Beginning",
    paragraphs: [
      "It started with a simple idea — technology should not replace human creativity, it should amplify it.",
      "MindSoulix was founded with the belief that intelligent systems should empower people and businesses to move faster, think smarter, and innovate boldly."
    ],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
  },
  {
    title: "The Innovation Journey",
    paragraphs: [
      "From early prototypes to scalable platforms, our team focused on solving real-world problems through intelligent digital systems.",
      "We combined AI, engineering, and design thinking to create solutions that help businesses evolve with technology."
    ],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    reverse: true
  },
  {
    title: "Building the Future",
    paragraphs: [
      "Today, MindSoulix builds intelligent platforms that adapt, learn, and grow with organizations.",
      "Our mission is to design technology that unlocks new possibilities and empowers the next generation of innovation."
    ],
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
  }
]

export default function AboutStoryCards() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"]
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])
  const lineOpacity = useTransform(scrollYProgress, [0, 0.08, 1], [0, 1, 1])

  return (
    <section ref={sectionRef} className="w-full bg-[#fff7f7] py-28">
      <div className="mx-auto max-w-[1100px] px-6">
        <h2 className="text-center text-[40px] font-bold text-[#111]">Our Story</h2>
        <p className="mt-[10px] mb-[70px] text-center text-[16px] text-[#666]">
          How MindSoulix began its journey of building intelligent systems.
        </p>

        <div className="relative">
          <div className="pointer-events-none absolute top-4 bottom-10 left-1/2 hidden -translate-x-1/2 lg:block">
            <div className="h-full w-[2px] bg-black/10" />
            <motion.div
              style={{ scaleY: lineScale, opacity: lineOpacity }}
              className="absolute top-0 left-0 h-full w-[2px] origin-top bg-gradient-to-b from-[#E10600] via-[#cc0500] to-[#8f0300]"
            />
          </div>

          {storyItems.map((item, index) => (
            <StoryRow key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StoryRow({ item, index }: { item: StoryItem; index: number }) {
  const rowRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"]
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [18, -18])

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.25 }}
      className="relative mb-[90px] grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20"
    >
      <motion.span
        initial={{ scale: 0.75, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="absolute top-1/2 left-1/2 z-10 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E10600]/50 bg-white lg:block"
      />

      <div
        className={`mx-auto ${
          item.reverse ? "lg:order-2 lg:justify-self-end" : "lg:order-1 lg:justify-self-start"
        }`}
      >
        <motion.img
          src={item.image}
          alt={item.title}
          style={{ y: imageY }}
          className="h-[260px] w-[260px] rounded-[18px] object-cover shadow-[0_12px_30px_rgba(0,0,0,0.08)] sm:h-[320px] sm:w-[320px]"
        />
      </div>

      <article
        className={`rounded-[16px] bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] ${
          item.reverse ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <h3 className="text-[20px] font-semibold text-[#222]">{item.title}</h3>
        <div className="mt-3 space-y-3 text-[15px] leading-[1.6] text-[#555]">
          {item.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </motion.div>
  )
}
