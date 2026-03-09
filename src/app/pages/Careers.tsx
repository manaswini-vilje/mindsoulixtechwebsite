import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import CareersHero from "../components/CareersHero"

const cards = [
  {
    title: "Make an impact.",
    description:
      "Redefining industries through intelligent technology and creativity means thinking boldly and building meaningful solutions.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978"
  },
  {
    title: "Grow your career.",
    description:
      "Our employees are the foundation of our success. At MindSoulix we invest in mentorship, learning, and continuous innovation.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
  },
  {
    title: "Be your authentic self.",
    description:
      "We believe everyone deserves a workplace where creativity, ideas, and individuality thrive together.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c"
  },
  {
    title: "Collaborate with innovators.",
    description:
      "Work with passionate engineers, designers, and strategists building intelligent systems for modern businesses.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692"
  },
  {
    title: "Build meaningful technology.",
    description:
      "We design scalable digital platforms and intelligent automation systems that transform organizations.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0"
  }
]

export default function Careers() {
  const location = useLocation()
  const navigate = useNavigate()
  const loopCards = cards.concat(cards)

  useEffect(() => {
    if (!location.hash) return

    const targetId = location.hash.replace("#", "")
    window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" })
    }, 120)
  }, [location.hash])

  return (
    <main className="bg-[#F8F8F8]">
      <CareersHero />

      <section id="life-at-mindsoulix" className="bg-[#F8F8F8] pt-[120px] pb-[120px]">
        <style>
          {`
            @keyframes autoScroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }

            .life-carousel:hover .life-track {
              animation-play-state: paused;
            }
          `}
        </style>

        <div className="mx-auto max-w-[1200px] px-6">
          <h2 className="mb-[50px] text-[32px] leading-tight font-bold text-[#2F2F2F] md:text-[42px]">
            Have you found your place in the world?
          </h2>

          <div className="life-carousel relative overflow-hidden">
            <div
              className="life-track flex w-max gap-7"
              style={{ animation: "autoScroll 40s linear infinite" }}
            >
              {loopCards.map((card, idx) => (
                <article
                  key={`${card.title}-${idx}`}
                  className="w-[260px] shrink-0 cursor-pointer transition-transform duration-300 ease-out hover:-translate-y-2 md:w-[300px] lg:w-[360px]"
                >
                  <img
                    src={`${card.image}?auto=format&fit=crop&w=1200&q=80`}
                    alt={card.title}
                    className="h-[160px] w-full rounded-[16px] object-cover shadow-[0_10px_30px_rgba(0,0,0,0.08)] md:h-[180px] lg:h-[210px]"
                  />
                  <h3 className="mt-4 text-[18px] font-semibold text-[#2F2F2F]">{card.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.6] text-[#555]">{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="open-positions" className="bg-[#F8F8F8] pt-[40px] pb-[120px]">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="rounded-[16px] border border-[#E10600]/15 bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.06)] md:p-10">
            <h2 className="text-[28px] leading-tight font-bold text-[#2F2F2F] md:text-[36px]">
              Open Positions
            </h2>
            <p className="mt-4 max-w-[780px] text-[16px] leading-relaxed text-[#555]">
              Explore current freelance and collaboration opportunities at MindSoulix Tech.
              We update this section whenever new roles are available.
            </p>
            <button
              type="button"
              onClick={() => navigate("/careers/open-positions")}
              className="mt-8 rounded-[999px] bg-[#E10600] px-[26px] py-[14px] font-semibold text-white transition hover:bg-[#c40500]"
            >
              View Open Positions
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
