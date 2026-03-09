import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import bgVideo from "@/assets/bg-video.mp4";
import WhyChoose from "../components/WhyChoose";
import ComplimentarySection from "../components/ComplimentarySection";
import GlobalImpact from "../components/GlobalImpact";
import ReactorCTA from "../components/ReactorCTA";
import AdvancedServicesOrbit from "../components/AdvancedServicesOrbit";

export default function Home() {

  const location = useLocation();

  useEffect(() => {

    if (location.hash) {

      const id = location.hash.replace("#", "");

      const element = document.getElementById(id);

      if (element) {

        setTimeout(() => {

          element.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }, 200);

      }

    }

  }, [location]);

  const { scrollY } = useScroll();

  const yParallax = useTransform(scrollY, [0, 600], [0, 120]);
  const videoScale = useTransform(scrollY, [0, 600], [1.05, 1.15]);

  const words = ["Tech", "Beyond", "Logic"];

  return (
    <>

      <section
        id="overview"
        className="relative w-full h-screen overflow-hidden bg-black flex items-center"
      >

        <motion.video
          src={bgVideo}
          autoPlay
          muted
          loop
          playsInline
          style={{ scale: videoScale }}
          className="absolute inset-0 w-full h-full object-cover opacity-80 scale-105 transition-transform duration-[6000ms]"
        />

        <div className="absolute inset-0 bg-black/35" />

          <motion.div
            style={{ y: yParallax }}
            className="relative z-10 px-24"
          >

            <div className="flex flex-col items-start gap-10">
              {words.map((word) => (
                <h1 key={word} className="heroText text-white">
                  {Array.from(word).map((char, index) => (
                    <motion.span
                      key={`${word}-${char}-${index}`}
                      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{
                        duration: 1,
                        ease: [0.22, 1, 0.36, 1],
                        delay: index * 0.18
                      }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </h1>
              ))}
            </div>

        </motion.div>

      </section>

      <div id="services">
        <AdvancedServicesOrbit />
      </div>

      <div id="why">
        <WhyChoose />
      </div>

      <div id="partnership">
        <ComplimentarySection />
      </div>

      <div id="impact">
        <GlobalImpact />
      </div>

      <div id="launch">
        <ReactorCTA />
      </div>

      <style>
{`

@import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@1,700;1,800;1,900&display=swap');

.heroText{
  font-family: 'Inter', sans-serif;
  font-style: italic;
  font-weight: 800;
  font-size: clamp(120px,14vw,140px);
  letter-spacing: 0.08em;
  line-height: 0.9;
}

.techGradient{
  background: linear-gradient(
    135deg,
    #E10600,
    rgb(204, 14, 52),
    rgb(235, 45, 83)
  );
  -webkit-background-clip: text;
  color: transparent;
}

`}
</style>

    </>
  );
}
