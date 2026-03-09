import { useNavigate } from "react-router-dom"

interface FloatingImageProps {
  src: string
  alt: string
  className: string
}

function FloatingImage({ src, alt, className }: FloatingImageProps) {
  return (
    <div
      className={`absolute overflow-hidden rounded-[16px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] ${className}`}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  )
}

export default function CareersHero() {
  const navigate = useNavigate()

  return (
    <section
      id="careers-overview"
      className="relative min-h-[850px] overflow-hidden bg-[#F8F8F8] pt-[120px] pb-[120px]"
    >
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="relative min-h-[610px]">
          <div className="pointer-events-none absolute inset-0 z-10 hidden md:block">
            <FloatingImage
              src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80"
              alt="Left team collaboration"
              className="top-[90px] left-[10px] h-[400px] w-[208px] lg:top-[70px]  lg:h-[500px] lg:w-[300px]"
            />
            <FloatingImage
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
              alt="Right team planning"
              className="top-[90px] right-[10px] h-[400px] w-[208px] lg:top-[70px] lg:right-[10px] lg:h-[500px] lg:w-[300px]"
            />
          </div>

          <div className="relative z-20 mx-auto flex min-h-[610px] max-w-[760px] flex-col items-center justify-center text-center">
            <h1 className="text-[40px] leading-[1.1] font-semibold text-[#111111] md:text-[56px] lg:text-[74px]">
              Join the Minds Building the Future
            </h1>

            <p className="mt-6 max-w-[760px] text-base leading-relaxed text-[#2F2F2F]/85 md:text-[18px]">
              At MindSoulix Tech, we combine artificial intelligence, scalable engineering, and human creativity to design intelligent digital systems. Be part of a team shaping the next generation of technology.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                className="rounded-[999px] bg-[#E10600] px-[28px] py-[14px] text-[16px] font-semibold text-white transition hover:brightness-95"
                onClick={() => navigate("/careers/open-positions")}
              >
                View Open Positions
              </button>

              <button
                type="button"
                className="rounded-[999px] border border-[#E10600] bg-white px-[28px] py-[14px] text-[16px] font-semibold text-[#E10600] transition hover:bg-[#E10600]/5"
                onClick={() => {
                  document
                    .getElementById("life-at-mindsoulix")
                    ?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Life at MindSoulix
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
