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
      <section id="overview">
        <div id="hero">
          <AboutHero />
        </div>
      </section>

      <section id="capabilities">
        <div id="drives">
          <WhatDrivesMindSoulix />
        </div>
      </section>

      <section id="why-mindsoulix">
        <div id="story">
          <AboutStoryCards />
        </div>
      </section>

      <section id="partnership-model">
        <div id="different">
          <WhatMakesMindSoulix />
        </div>
      </section>

      <section id="global-impact">
        <div id="cta">
          <AboutCTA />
        </div>
      </section>
    </>
  )
}

export default AboutPage
