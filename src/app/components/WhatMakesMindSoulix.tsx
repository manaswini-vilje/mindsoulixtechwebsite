import { useEffect, useRef, useState } from "react"

const CARD_WIDTH = 420
const CARD_GAP = 32
const STEP_SIZE = CARD_WIDTH + CARD_GAP
const SLIDE_MS = 900
const AUTO_MS = 3000

const cards = [
  {
    title: "AI-First Architecture",
    text: "Artificial intelligence is embedded at the foundation of every platform we design, enabling systems that continuously learn and evolve with real business data.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Human-Centered Design",
    text: "Technology should empower people. Our platforms combine intelligent automation with intuitive design to improve clarity, usability, and team productivity.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Scalable Intelligence Systems",
    text: "MindSoulix architectures are modular and future-friendly, helping organizations scale capabilities while maintaining performance, security, and reliability.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Future-Ready Platforms",
    text: "We build systems prepared for the next generation of digital innovation, designed to adapt quickly to changing technologies and business demands.",
    image:
      "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=80"
  }
]

const loopCards = [...cards, cards[0]]

export default function WhatMakesMindSoulix() {
  const [index, setIndex] = useState(0)
  const [resetting, setResetting] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const target = sectionRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.35 }
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const timer = window.setInterval(() => {
      setIndex((prev) => prev + 1)
    }, AUTO_MS)

    return () => window.clearInterval(timer)
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return
    if (index !== cards.length) return

    const resetTimer = window.setTimeout(() => {
      setResetting(true)
      setIndex(0)
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setResetting(false))
      })
    }, SLIDE_MS)

    return () => window.clearTimeout(resetTimer)
  }, [index, isVisible])

  return (
    <section ref={sectionRef} className="w-full overflow-hidden bg-[#fff7f7] py-32">
      <div className="mx-auto max-w-[1480px] px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold text-black md:text-5xl">
            What Makes MindSoulix Tech Different
          </h2>
          <p className="mt-6 text-gray-600">
            Our principles guide how we design intelligent systems and build technology that evolves with people.
          </p>
        </div>

        <div className="mt-16 overflow-hidden">
          <div className="pl-24">
            <div
              className="flex gap-8 will-change-transform"
              style={{
                transform: `translateX(-${index * STEP_SIZE}px)`,
                transition: resetting
                  ? "none"
                  : "transform 900ms cubic-bezier(0.22, 1, 0.36, 1)"
              }}
            >
              {loopCards.map((card, idx) => (
                <article
                  key={`${card.title}-${idx}`}
                  className="group relative h-[520px] w-[420px] shrink-0 overflow-hidden rounded-[20px] bg-white"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />

                  <div className="absolute bottom-8 left-8 h-[220px] w-[260px] rounded-[18px] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-300 group-hover:shadow-[0_16px_42px_rgba(0,0,0,0.18)]">
                    <div className="mb-3 h-[3px] w-12 rounded-full bg-[#E10600]" />
                    <h3 className="text-xl font-semibold leading-tight text-black">{card.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-black/70">{card.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
