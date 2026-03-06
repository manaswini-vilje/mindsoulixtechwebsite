import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import AboutHero from "../components/AboutHero"
import WhatDrivesMindSoulix from "../components/WhatDrivesMindSoulix"
import AboutStoryCards from "../components/AboutStoryCards"
import WhatMakesMindSoulix from "../components/WhatMakesMindSoulix"
import AboutCTA from "../components/AboutCTA"

function AboutPage() {
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
  return (
    <>
      <section id="hero">
        <AboutHero />
      </section>

      <section id="drives">
        <WhatDrivesMindSoulix />
      </section>

      <section id="story">
        <AboutStoryCards />
      </section>

      <section id="different">
        <WhatMakesMindSoulix />
      </section>

      <section id="cta">
        <AboutCTA />
      </section>
    </>
  )
}

export default AboutPage