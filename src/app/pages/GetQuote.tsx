import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export default function GetQuote() {

  const steps = [
    "Project Type",
    "Budget Range",
    "Timeline",
    "Contact Details"
  ]

  const sectionRef = useRef<HTMLDivElement>(null)

  const [startAnimation, setStartAnimation] = useState(false)
  const [progress, setProgress] = useState(0)

  /* detect when section appears */

  useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartAnimation(true)
        }
      },
      { threshold: 0.6 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()

  }, [])


  /* animate progress */

  useEffect(() => {

    if (!startAnimation) return

    const interval = setInterval(() => {

      setProgress((prev) => {

        if (prev >= 100) return prev
        return prev + 25

      })

    }, 2000)

    return () => clearInterval(interval)

  }, [startAnimation])


  /* scroll from hero CTA */

  const scrollToTimeline = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }


  return (
    <main className="bg-[#fff7f7] text-black overflow-x-hidden">

      {/* HERO */}

      <section className="relative h-screen flex items-center justify-center overflow-hidden">

        {/* grid */}

        <div className="absolute inset-0 opacity-[0.05]">
          <div className="w-full h-full bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>


        {/* static cards */}

        <img
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
          className="absolute left-24 top-28 w-48 h-32 object-cover rounded-xl shadow-xl"
        />

        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
          className="absolute right-24 top-36 w-56 h-36 object-cover rounded-xl shadow-xl"
        />

        <img
          src="https://images.unsplash.com/photo-1551434678-e076c223a692"
          className="absolute left-32 bottom-32 w-52 h-36 object-cover rounded-xl shadow-xl"
        />

        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475"
          className="absolute right-40 bottom-32 w-48 h-32 object-cover rounded-xl shadow-xl"
        />


        {/* headline */}

        <div className="text-center z-10">

          <h1 className="font-extrabold leading-[0.9] tracking-tight">

            <span className="block text-[110px]">
             BRING YOUR
            </span>

            <span className="block text-[140px] text-[#e10600]">
              VISION 
            </span>

            <span className="block text-[110px]">
              TO REALITY
            </span>

          </h1>

          <button
            onClick={scrollToTimeline}
            className="mt-10 bg-[#e10600] text-white px-10 py-4 rounded-full text-lg font-medium shadow-lg hover:scale-105 transition"
          >
            Build Now
          </button>

        </div>

      </section>


      {/* TIMELINE */}

      <section ref={sectionRef} className="py-28 px-6">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-4xl font-bold text-center mb-20">
            Tell us about your project
          </h2>

          <div className="relative flex justify-between items-center">

            {/* gray line */}

            <div className="absolute top-4 left-0 right-0 h-[2px] bg-gray-200" />

            {/* red animated line */}

            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1 }}
              className="absolute top-4 left-0 h-[2px] bg-[#e10600]"
            />


            {steps.map((step, i) => {

              const stepPosition = (i / (steps.length - 1)) * 100
              const active = progress >= stepPosition

              return (
                <div
                  key={i}
                  className="flex flex-col items-center relative z-10"
                >

                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 font-bold transition
                    ${
                      active
                        ? "bg-[#e10600] text-white border-[#e10600]"
                        : "bg-white border-gray-300 text-gray-400"
                    }`}
                  >
                    {i + 1}
                  </div>

                  <p
                    className={`mt-4 text-sm transition
                    ${
                      active
                        ? "text-black font-medium"
                        : "text-gray-400"
                    }`}
                  >
                    {step}
                  </p>

                </div>
              )

            })}

          </div>

        </div>

      </section>


      {/* FORM */}

      <section className="pb-32 px-6">

        <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-[#e10600]/20">

          <form className="space-y-6">

            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-[#e10600]"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-[#e10600]"
            />

            <select className="w-full border border-gray-300 rounded-lg p-3">
              <option>Project Type</option>
              <option>Website Development</option>
              <option>Mobile App</option>
              <option>UI/UX Design</option>
              <option>AI Solution</option>
            </select>

            <select className="w-full border border-gray-300 rounded-lg p-3">
              <option>Budget Range</option>
              <option>$500 - $1000</option>
              <option>$1000 - $5000</option>
              <option>$5000+</option>
            </select>

            <select className="w-full border border-gray-300 rounded-lg p-3">
              <option>Timeline</option>
              <option>ASAP</option>
              <option>1 Month</option>
              <option>2 - 3 Months</option>
            </select>

            <textarea
              rows={4}
              placeholder="Tell us about your project..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-[#e10600]"
            />

            <button className="w-full bg-[#e10600] text-white py-3 rounded-xl font-medium hover:scale-[1.02] transition">
              Request Quote
            </button>

          </form>

        </div>

      </section>

    </main>
  )
}